import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react';
import PasswordResetWarning from './PasswordResetWarning';

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [isWarning, setIsWarning] = useState(true)
    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            let response = await fetch(`${API_URL}/api/v1/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })
            if (response.status === 200) {
                toast.success("Password Reset Link Sent Successfully to Your Email");
                navigate("/login")
            } else {
                let data = await response.json();
                toast.error(data.message || "Failed to send reset link")
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4 sm:p-6 text-gray-100 relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-purple-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

            {!isWarning? <div className="relative w-full max-w-sm sm:max-w-md z-10 mx-auto px-2">
                
                {/* ✨ Back to Home Navigation Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                >
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-200 group font-medium"
                    >
                        <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to home
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 120 }}
                >
                    {/* Header Section */}
                    <div className="mb-6 sm:mb-8 text-center">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Forgot Password?
                        </h1>
                        <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                            Enter your email address to receive a password reset link.
                        </p>
                    </div>

                    {/* Form Section */}
                    <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2 text-left">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
                            />
                        </div>

                        <div className="pt-1 sm:pt-2">
                            <button
                                type="submit"
                                className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl
                                shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
                                disabled={loading}
                            >
                                {loading ? <ClipLoader size={18} color='white' /> : "Send Reset Link"}
                            </button>
                        </div>
                    </form>

                    {/* Footer Links */}
                    <p className="text-center text-xs sm:text-sm text-gray-400 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800/40">
                        Remember your password?{" "}
                        <button 
                            onClick={() => navigate("/login")} 
                            className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline transition-all cursor-pointer bg-transparent border-none text-xs sm:text-sm"
                        >
                            Back to Login
                        </button>
                    </p>
                </motion.div>
            </div> : <PasswordResetWarning setIsWarning={setIsWarning}/>}
        </div>
    );
};

export default ForgotPassword;
