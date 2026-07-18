// import { Eye, EyeClosed } from 'lucide-react';
// import React, { useState } from 'react'
// import toast from 'react-hot-toast';
// import { useNavigate, useParams, useSearchParams } from 'react-router'
// import { ClipLoader } from 'react-spinners';
// import { generateKeyPair } from '../crypto/KeyManager';
// import { encryptPrivateKey } from '../crypto/e2ee';

// const ResetPassword = () => {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();

//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [loading, setLoading] = useState(false)

//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (searchParams.get("token") == null) {
//             toast.error("Token is Null")
//             return;
//         }
//         if (password.includes(" ")) {
//             toast.error("Password doesn't contain spaces")
//             return;
//         }
//         if (password.trim() !== confirmPassword.trim()) {
//             toast.error("Passwords do not match!");
//             return;
//         } else if (password.length < 6 || confirmPassword.length < 6) {
//             toast.error("Password should contain at least 6 characters!");
//             return;
//         }

//         try {
//             setLoading(true)
//             const { publicKeyB64, privateKeyBuffer } = await generateKeyPair();
//             const { encryptedPrivateKey, salt, iv } = await encryptPrivateKey(privateKeyBuffer, password)

//             let response = await fetch("http://localhost:8080/api/v1/reset-password", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     password: password,
//                     token: searchParams.get("token"),
//                     encryptedPrivateKey,
//                     salt, 
//                     iv,
//                     publicKey : publicKeyB64
//                 })
//             })
//             if (response.status == 200) {
//                 toast.success("Password Reset Successfully");
//                 navigate("/login")
//             } else {
//                 let data = await response.json();
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error("Some thing went wrong");
//         } finally {
//             setLoading(false)
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-slate-900 via-red-900 to-slate-900 animate-gradient p-4">
//             <div className="w-full max-w-xl  rounded-2xl shadow-xl p-8">

//                 {/* Header Section */}
//                 <div className="text-center mb-8">
//                     <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full mb-4">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
//                         </svg>
//                     </div>
//                     <h2 className="text-2xl font-bold text-white tracking-tight">
//                         Create New Password
//                     </h2>
//                     <p className="text-sm font-semibold text-white mt-2 px-6">
//                         Your new password must be different from previous used passwords.
//                     </p>
//                 </div>

//                 {/* Form Section - Apne state aur handleSubmit yahan connect kar lena */}
//                 <form className="space-y-5" onSubmit={handleSubmit}>

//                     {/* Field 1: New Password */}
//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
//                             New Password
//                         </label>
//                         <div className="relative">
//                             <input

//                                 type={showPassword ? "text" : "password"}
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                                 className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 sm:text-sm"
//                                 placeholder="••••••••"
//                             />
//                             {showPassword ? <Eye onClick={() => setShowPassword(!showPassword)} className='mt-1 absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600' size={35} /> : <EyeClosed onClick={() => setShowPassword(!showPassword)} className='mt-1 absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600' size={35} />}
//                         </div>
//                     </div>

//                     {/* Field 2: Confirm Password */}
//                     <div>
//                         <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
//                             Confirm New Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 id="confirmPassword"
//                                 required
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 className="block w-full px-4 py-3 border border-slate-200 rounded-xl  text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 sm:text-sm"
//                                 placeholder="••••••••"
//                             />
//                             {showConfirmPassword ? <Eye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='mt-1 absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600' size={35} /> : <EyeClosed onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='mt-1 absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600' size={35} />}
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 active:scale-[0.98] transition-all duration-150 mt-2 cursor-pointer"
//                         disabled={loading}
//                     >
//                         {loading ? <ClipLoader size={20} color='#f2f2f2' /> : "Reset Password"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default ResetPassword

import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router'
import { ClipLoader } from 'react-spinners';
import { generateKeyPair } from '../crypto/KeyManager';
import { encryptPrivateKey } from '../crypto/e2ee';
import { motion } from 'framer-motion'

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchParams.get("token") == null) {
            toast.error("Token is Null")
            return;
        }
        if (password.includes(" ")) {
            toast.error("Password doesn't contain spaces")
            return;
        }
        if (password.trim() !== confirmPassword.trim()) {
            toast.error("Passwords do not match!");
            return;
        } else if (password.length < 6 || confirmPassword.length < 6) {
            toast.error("Password should contain at least 6 characters!");
            return;
        }

        try {
            setLoading(true)
            const { publicKeyB64, privateKeyBuffer } = await generateKeyPair();
            const { encryptedPrivateKey, salt, iv } = await encryptPrivateKey(privateKeyBuffer, password)

            let response = await fetch(`${API_URL}/api/v1/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: password,
                    token: searchParams.get("token"),
                    encryptedPrivateKey,
                    salt, 
                    iv,
                    publicKey : publicKeyB64
                })
            })
            if (response.status === 200) {
                toast.success("Password Reset Successfully");
                navigate("/login")
            } else {
                let data = await response.json();
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4 sm:p-6 text-gray-100 relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-purple-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

            {/* Main Content Container (No Box Card Wrapper) */}
            <div className="relative w-full max-w-sm sm:max-w-md z-10 mx-auto px-2">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 120 }}
                >
                    {/* Header Section */}
                    <div className="mb-6 sm:mb-8 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-indigo-600/10 text-indigo-400 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Create New Password
                        </h2>
                        <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-xs mx-auto leading-relaxed">
                            Your new password must be different from previous used passwords.
                        </p>
                    </div>

                    {/* Form Section */}
                    <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>

                        {/* Field 1: New Password */}
                        <div>
                            <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2 text-left">
                                New Password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner pr-10"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-gray-500 hover:text-gray-300 transition-colors focus:outline-none bg-transparent border-none p-0 cursor-pointer"
                                >
                                    {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Field 2: Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2 text-left">
                                Confirm New Password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner pr-10"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 text-gray-500 hover:text-gray-300 transition-colors focus:outline-none bg-transparent border-none p-0 cursor-pointer"
                                >
                                    {showConfirmPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl
                                shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
                                disabled={loading}
                            >
                                {loading ? <ClipLoader size={18} color='white' /> : "Reset Password"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default ResetPassword