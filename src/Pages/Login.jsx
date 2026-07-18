// import React, { useContext, useState } from 'react'
// import toast from 'react-hot-toast'
// import { Link, useNavigate } from 'react-router'
// import { ClipLoader, PulseLoader } from 'react-spinners'
// import { ChatContext } from '../context/ContextProvider'
// import { decryptPrivateKey } from '../crypto/e2ee'

// const Login = () => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [errors, setErrors] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()
//     const { userData, setUserData, getProfile, privateKey, setPrivateKey, fetchEncryptedPrivateKey, decryptPrivateKeyFnc, pvtKeyResponse, setIsLoggedIn } = useContext(ChatContext)

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let error = {};
//         if (email.trim().length < 2 || !email.includes(".")) {
//             error.email = "Please Enter valid email"
//         }
//         if (password.trim().length < 6) {
//             error.password = "Password must be of 6 characters long"
//         }
//         setErrors(error)
//         if (Object.keys(error).length > 0) {
//             return;
//         }
//         try {
//             setLoading(true)
//             let response = await fetch("http://localhost:8080/api/v1/login", {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     email,
//                     password
//                 })
//             })
//             let data = await response.json();
//             if (response.status == 200) {
//                 setIsLoggedIn(true);
//                 await getProfile();
//                 const data = await fetchEncryptedPrivateKey();
//                 if (data) {
//                     await decryptPrivateKeyFnc(data, password);
//                 }
//                 toast.success("Login Successfull");
//                 navigate("/")
//                 console.log(data);
//             } else {
//                 toast.error(data.message)
//             }
//         } catch (error) {
//             toast.error("Some thing went wrong");
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className='bg-linear-to-tr from-slate-900 via-red-900 to-slate-900 animate-gradient min-h-screen flex items-center justify-center p-4'>
//             <div className="relative w-full max-w-md">
//                 {/* Main Form Card */}
//                 <div className=" backdrop-blur-md border border-white rounded-2xl p-8 shadow-2xl relative z-10">
//                     <div className="text-center mb-8">
//                         <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
//                         <p className="text-slate-300 text-sm mt-2">Please enter your details to sign in</p>
//                     </div>

//                     <form className="space-y-6" onSubmit={handleSubmit}>
//                         {/* Email Input Group */}
//                         <div>
//                             {/* FIX: 'for' ko 'htmlFor' kiya */}
//                             <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">Email Address</label>
//                             <div className="relative">
//                                 <input type="email" id="email" name="email" required
//                                     className="w-full px-4 py-3 bg-white/5 border border-slate-500/30 rounded-xl text-white placeholder-slate-400 
//                             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
//                             transition-all duration-300 ease-in-out hover:border-slate-400"
//                                     placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                 {errors && <p className='text-red-500'>{errors.name}</p>}
//                             </div>
//                         </div>

//                         {/* Password Input Group */}
//                         <div>
//                             <div className="flex justify-between items-center mb-2">
//                                 {/* FIX: 'class' aur 'for' dono ko change kiya */}
//                                 <label htmlFor="password" className="text-sm font-medium text-slate-200">Password</label>
//                                 <Link to="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200">Forgot password?</Link>
//                             </div>
//                             <div className="relative">
//                                 <input type="password" id="password" name="password" required
//                                     className="w-full px-4 py-3 bg-white/5 border border-slate-500/30 rounded-xl text-white placeholder-slate-400 
//                             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
//                             transition-all duration-300 ease-in-out hover:border-slate-400"
//                                     placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
//                                 {errors && <p className='text-red-500'>{errors.password}</p>}
//                             </div>
//                         </div>

//                         {/* Submit Button */}
//                         <div>
//                             <button type="submit"
//                                 className="w-full py-3 px-4 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl
//                         shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:from-purple-500 hover:to-blue-500
//                         transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer" disabled={loading}>
//                                 {loading ? <PulseLoader color='white' size={17} /> : "Sign in"}
//                             </button>
//                         </div>
//                     </form>

//                     <p className="text-center text-sm text-slate-400 mt-8">
//                         Don't have an account?{' '}
//                         <a href="#" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200" onClick={() => navigate("/register")}>Sign up</a>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Login
// import React, { useContext, useState } from 'react'
// import toast from 'react-hot-toast'
// import { Link, useNavigate } from 'react-router'
// import { ClipLoader } from 'react-spinners'
// import { ChatContext } from '../context/ContextProvider'
// import { motion } from 'framer-motion'

// const Login = () => {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [errors, setErrors] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()
//     const { getProfile, fetchEncryptedPrivateKey, decryptPrivateKeyFnc, setIsLoggedIn } = useContext(ChatContext)

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         let error = {};
//         if (email.trim().length < 2 || !email.includes(".")) {
//             error.email = "Please enter a valid email address"
//         }
//         if (password.trim().length < 6) {
//             error.password = "Password must be at least 6 characters long"
//         }
//         setErrors(error)
//         if (Object.keys(error).length > 0) {
//             return;
//         }
        
//         try {
//             setLoading(true)
//             let response = await fetch("http://localhost:8080/api/v1/login", {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ email, password })
//             })
//             let data = await response.json();
//             if (response.status === 200) {
//                 setIsLoggedIn(true);
//                 await getProfile();
//                 const pvtKeyData = await fetchEncryptedPrivateKey();
//                 if (pvtKeyData) {
//                     await decryptPrivateKeyFnc(pvtKeyData, password);
//                 }
//                 toast.success("Login Successful");
//                 navigate("/")
//             } else {
//                 toast.error(data.message || "Invalid credentials")
//             }
//         } catch (error) {
//             toast.error("Something went wrong");
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-4 sm:p-6 text-gray-100 relative overflow-hidden font-sans">
//             {/* Ambient Background Glows */}
//             <div className="absolute top-1/4 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>
//             <div className="absolute bottom-1/4 right-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-purple-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

//             {/* Main Container */}
//             <div className="relative w-full max-w-sm sm:max-w-md z-10 mx-auto">
//                 <motion.div 
//                     className="w-full border border-gray-800 bg-gray-900/60 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl"
//                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
//                     animate={{ opacity: 1, scale: 1, y: 0 }}
//                     transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 120 }}
//                 >
//                     {/* Header Section */}
//                     <div className="mb-6 sm:mb-8 text-left">
//                         <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
//                         <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 leading-relaxed">Please enter your workspace details to sign in.</p>
//                     </div>

//                     {/* Login Form */}
//                     <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                        
//                         {/* Email Input */}
//                         <div>
//                             <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-300 mb-1 sm:mb-2">Email Address</label>
//                             <input 
//                                 type="email" 
//                                 id="email" 
//                                 name="email" 
//                                 required
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
//                                 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
//                                 placeholder="name@company.com" 
//                                 value={email} 
//                                 onChange={(e) => setEmail(e.target.value)} 
//                             />
//                             {errors?.email && <p className='text-[11px] sm:text-xs text-rose-400 mt-1.5 flex items-center gap-1'>⚠️ {errors.email}</p>}
//                         </div>

//                         {/* Password Input */}
//                         <div>
//                             <div className="flex justify-between items-center mb-1 sm:mb-2">
//                                 <label htmlFor="password" className="text-xs sm:text-sm font-semibold text-gray-300">Password</label>
//                                 <Link to="/forgot-password" className="text-[11px] sm:text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
//                                     Forgot password?
//                                 </Link>
//                             </div>
//                             <input 
//                                 type="password" 
//                                 id="password" 
//                                 name="password" 
//                                 required
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
//                                 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
//                                 placeholder="••••••••" 
//                                 value={password} 
//                                 onChange={(e) => setPassword(e.target.value)} 
//                             />
//                             {errors?.password && <p className='text-[11px] sm:text-xs text-rose-400 mt-1.5 flex items-center gap-1'>⚠️ {errors.password}</p>}
//                         </div>

//                         {/* Submit Button */}
//                         <div className="pt-1 sm:pt-2">
//                             <button 
//                                 type="submit"
//                                 className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl
//                                 shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]" 
//                                 disabled={loading}
//                             >
//                                 {loading ? <ClipLoader size={18} color='white' /> : "Sign In"}
//                             </button>
//                         </div>
//                     </form>

//                     {/* Footer Link */}
//                     <p className="text-center text-xs sm:text-sm text-gray-400 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800/60">
//                         Don't have an account?{' '}
//                         <button 
//                             onClick={() => navigate("/register")} 
//                             className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline transition-all cursor-pointer bg-transparent border-none text-xs sm:text-sm"
//                         >
//                             Sign up
//                         </button>
//                     </p>
//                 </motion.div>
//             </div>
//         </div>
//     )
// }

// export default Login
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
