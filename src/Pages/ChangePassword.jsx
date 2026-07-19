import React, { useContext, useState } from 'react';
import { KeyRound, Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { ChatContext } from '../context/ContextProvider';
import { encryptPrivateKey } from '../crypto/e2ee';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

const ChangePassword = ({setIsView}) => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formData, setformData] = useState({
        oldPassword: "",
        newPassword: "",
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const { privateKey, pvtKeyResponse, decryptPrivateKeyFnc } = useContext(ChatContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setformData(prev => ({ ...prev, [name]: value }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
        if (!formData.oldPassword || formData.oldPassword.trim() === "") {
            errors.oldPassword = "Current password is required"
        } else if (/\s/.test(formData.oldPassword)) {
            errors.oldPassword = "Password cannot contain spaces";
        }
        if (!formData.newPassword || formData.newPassword.trim() === "") {
            errors.newPassword = "New password is required"
        } else if (/\s/.test(formData.newPassword)) {
            errors.newPassword = "Password cannot contain spaces";
        } else if (formData.newPassword.length < 6) {
            errors.newPassword = "Password must be at least 6 characters"
        }
        else if (!confirmPassword || confirmPassword.trim() === "") {
            errors.confirmPassword = "Confirm password is required"
        } else if (formData.newPassword.trim() !== confirmPassword.trim()) {
            errors.misMatchPassword = "Passwords do not match";
        }
        
        setError(errors)
        if (Object.keys(errors).length > 0) {
            return;
        }

        setLoading(true)
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
            let response = await fetch(`${API_URL}/api/v1/change-password`, {
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
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="h-full w-full flex items-center justify-center  text-gray-100">
            {/* Main Form Box */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm sm:max-w-md border border-gray-800 bg-gray-900/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-5"
            >
                {/* Navigation Row */}
                <div className="flex items-center justify-start">
                    <button 
                        type="button" 
                        onClick={() => setIsView("details")}
                        className="p-1.5 rounded-lg bg-gray-950/40 border border-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                    </button>
                </div>

                {/* Header Icon & Title */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600/10 text-indigo-400 rounded-xl mb-3 border border-indigo-500/25">
                        <KeyRound size={22} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Change Password</h2>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 font-medium">Update password and re-encrypt private keys</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Current Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">Current Password</label>
                        <div className="relative flex items-center">
                            <div className="absolute left-3.5 text-gray-500 pointer-events-none">
                                <Lock size={16} />
                            </div>
                            <input
                                type={showCurrent ? "text" : "password"}
                                placeholder="••••••••"
                                name="oldPassword"
                                onChange={handleChange}
                                value={formData.oldPassword}
                                className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute right-3.5 text-gray-500 hover:text-gray-300 transition-colors focus:outline-none bg-transparent border-none p-0 cursor-pointer"
                            >
                                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {error?.oldPassword && <p className="text-[11px] sm:text-xs text-rose-400 mt-0.5 flex items-center gap-1">⚠️ {error.oldPassword}</p>}
                    </div>

                    <hr className="border-gray-800/60 my-1" />

                    {/* New Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">New Password</label>
                        <div className="relative flex items-center">
                            <div className="absolute left-3.5 text-gray-500 pointer-events-none">
                                <Lock size={16} />
                            </div>
                            <input
                                type={showNew ? "text" : "password"}
                                placeholder="••••••••"
                                name="newPassword"
                                onChange={handleChange}
                                value={formData.newPassword}
                                className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3.5 text-gray-500 hover:text-gray-300 transition-colors focus:outline-none bg-transparent border-none p-0 cursor-pointer"
                            >
                                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {error?.newPassword && <p className="text-[11px] sm:text-xs text-rose-400 mt-0.5 flex items-center gap-1">⚠️ {error.newPassword}</p>}
                    </div>

                    {/* Confirm New Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">Confirm New Password</label>
                        <div className="relative flex items-center">
                            <div className="absolute left-3.5 text-gray-500 pointer-events-none">
                                <Lock size={16} />
                            </div>
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3.5 text-gray-500 hover:text-gray-300 transition-colors focus:outline-none bg-transparent border-none p-0 cursor-pointer"
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {error?.confirmPassword && <p className="text-[11px] sm:text-xs text-rose-400 mt-0.5 flex items-center gap-1">⚠️ {error.confirmPassword}</p>}
                        {error?.misMatchPassword && <p className="text-[11px] sm:text-xs text-rose-400 mt-0.5 flex items-center gap-1">⚠️ {error.misMatchPassword}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                        <button
                            type="submit"
                            className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl
                            shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
                            disabled={loading}
                        >
                            {loading? <ClipLoader size={20} color='#f2f2f2'/> : "Update Password"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ChangePassword;