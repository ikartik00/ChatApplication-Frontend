import React, { useContext, useState } from 'react';
import { KeyRound, Eye, EyeOff, Lock } from 'lucide-react';
import toast, { ToastBar } from 'react-hot-toast';
import { ChatContext } from '../context/ContextProvider';
import { encryptPrivateKey } from '../crypto/e2ee';

const ChangePassword = () => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formData, setformData] = useState({
        oldPassword: "",
        newPassword: "",
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const { privateKey, pvtKeyResponse, setPrivateKey, decryptPrivateKeyFnc } = useContext(ChatContext)

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setformData(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
        if (!formData.oldPassword || formData.oldPassword.trim() == "") {
            errors.oldPassword = "Old Password is Required"
        } else if (/\s/.test(formData.oldPassword)) {
            errors.oldPassword = "Password cannot contain spaces";
        }
        if (!formData.newPassword || formData.newPassword.trim() == "") {
            errors.newPassword = "New Password is Required"
        } else if (/\s/.test(formData.newPassword)) {
            errors.newPassword = "Password cannot contain spaces";
        } else if (formData.newPassword.length < 6) {
            errors.newPassword = "Password must be of 6 characters"
        }
        else if (!confirmPassword || confirmPassword.trim() === "") {
            errors.confirmPassword = "Confirm Password is Required"
        } else if (formData.newPassword.trim() !== confirmPassword.trim()) {
            errors.misMatchPassword = "New Password and confirm Password doesn't match";
        }
        setError(errors)
        if (Object.keys(errors).length > 0) {
            return;
        }

        let keyDetails = {
            encryptedPrivateKey: null,
            salt: null,
            iv: null
        }

        if (!privateKey) {
            const DecryptedPrivateKey = await decryptPrivateKeyFnc(pvtKeyResponse, formData.oldPassword);
            if (!DecryptedPrivateKey) {
                console.log("Key decryption failed. Stopping execution.");
                return;
            }
            const privateKeyBuffer = await crypto.subtle.exportKey(
                "pkcs8",
                DecryptedPrivateKey
            );
            let { encryptedPrivateKey, salt, iv } = await encryptPrivateKey(privateKeyBuffer, formData.newPassword);
            keyDetails.encryptedPrivateKey = encryptedPrivateKey;
            keyDetails.salt = salt;
            keyDetails.iv = iv;
        } else {
            console.log(typeof privateKey);
            
            const privateKeyBuffer = await crypto.subtle.exportKey(
                "pkcs8",
                privateKey
            );
            let { encryptedPrivateKey, salt, iv } = await encryptPrivateKey(privateKeyBuffer, formData.newPassword);
            
            keyDetails.encryptedPrivateKey = encryptedPrivateKey;
            keyDetails.salt = salt;
            keyDetails.iv = iv;
        }

        try {
            let response = await fetch("http://localhost:8080/api/v1/change-password", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formData, ...keyDetails, encryptedKey: keyDetails.encryptedPrivateKey })
            })
            if (response.status === 200) {
                toast.success("Password Updated Successfully");
                setformData({
                    oldPassword: "",
                    newPassword: ""
                })
                setConfirmPassword("")
            } else {
                let data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }

    }
    return (
        <div className="h-full bg-[#0b0f19] flex items-center justify-center p-2">
            <div className="bg-[#131a26] py-5 px-8 rounded-2xl shadow-md w-full max-w-md border border-slate-100">

                {/* Header Icon & Title */}
                <div className="text-center mb-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full mb-4">
                        <KeyRound size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Change Password</h2>
                </div>

                <form className="space-y-3" onSubmit={handleSubmit}>
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-1.5">Current Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showCurrent ? "text" : "password"}
                                placeholder="••••••••"
                                name='oldPassword'
                                onChange={handleChange}
                                value={formData.oldPassword}
                                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                            >
                                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {error && error.oldPassword && <p className='text-red-500'>{error.oldPassword}</p>}
                    </div>

                    <hr className="border-slate-100 my-2" />

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">New Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showNew ? "text" : "password"}
                                placeholder="••••••••"
                                name='newPassword'
                                onChange={handleChange}
                                value={formData.newPassword}
                                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                            >
                                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {error && error.newPassword && <p className='text-red-500'>{error.newPassword}</p>}
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="block text-sm font-medium text-white mb-1">Confirm New Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {error && error.confirmPassword && <p className='text-red-500'>{error.confirmPassword}</p>}
                        {error && error.misMatchPassword && <p className='text-red-500'>{error.misMatchPassword}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;