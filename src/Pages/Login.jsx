import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { ChatContext } from '../context/ContextProvider'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react' // Ek clean arrow icon ke liye

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { getProfile, fetchEncryptedPrivateKey, decryptPrivateKeyFnc, setIsLoggedIn } = useContext(ChatContext)
    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = {};
        if (email.trim().length < 2 || !email.includes(".")) {
            error.email = "Please enter a valid email address"
        }
        if (password.trim().length < 6) {
            error.password = "Password must be at least 6 characters long"
        }
        setErrors(error)
        if (Object.keys(error).length > 0) {
            return;
        }
        
        try {
            setLoading(true)
            let response = await fetch(`${API_URL}/api/v1/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            let data = await response.json();
            if (response.status === 200) {
                setIsLoggedIn(true);
                await getProfile();
                const pvtKeyData = await fetchEncryptedPrivateKey();
                if (pvtKeyData) {
                    await decryptPrivateKeyFnc(pvtKeyData, password);
                }
                toast.success("Login Successful");
                navigate("/")
            } else {
                toast.error(data.message || "Invalid credentials")
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-6 text-gray-100 relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Main Container */}
            <div className="relative w-full max-w-md z-10">
                
                {/* ✨ JADU: Back to Home Link (Login box ke bahar ya upar) */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                >
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-lg sm:text-lg text-gray-400 hover:text-indigo-400 transition-colors duration-200 group font-medium"
                    >
                        <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to home
                    </Link>
                </motion.div>

                <motion.div 
                    className="w-full border border-gray-800 bg-gray-900/60 rounded-3xl shadow-2xl p-8 backdrop-blur-xl"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 120 }}
                >
                    {/* Header Section */}
                    <div className="mb-8 text-left">
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
                        <p className="text-gray-400 text-sm mt-2 leading-relaxed">Please enter your workspace details to sign in.</p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required
                                className="w-full px-4 py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 font-medium shadow-inner"
                                placeholder="name@company.com" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                            {errors?.email && <p className='text-xs text-rose-400 mt-2 flex items-center gap-1'>⚠️ {errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-300">Password</label>
                                <Link to="/forgot-password" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                                    Forgot password?
                                </Link>
                            </div>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required
                                className="w-full px-4 py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 font-medium shadow-inner"
                                placeholder="••••••••" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                            {errors?.password && <p className='text-xs text-rose-400 mt-2 flex items-center gap-1'>⚠️ {errors.password}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button 
                                type="submit"
                                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl
                                shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[44px]" 
                                disabled={loading}
                            >
                                {loading ? <ClipLoader size={18} color='white' /> : "Sign In"}
                            </button>
                        </div>
                    </form>

                    {/* Footer Link */}
                    <p className="text-center text-sm text-gray-400 mt-8 pt-6 border-t border-gray-800/60">
                        Don't have an account?{' '}
                        <button 
                            onClick={() => navigate("/register")} 
                            className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline transition-all cursor-pointer bg-transparent border-none"
                        >
                            Sign up
                        </button>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default Login
