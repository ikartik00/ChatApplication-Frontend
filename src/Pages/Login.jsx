import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { ClipLoader, PulseLoader } from 'react-spinners'
import { ChatContext } from '../context/ContextProvider'
import { decryptPrivateKey } from '../crypto/e2ee'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { userData, setUserData, getProfile, privateKey, setPrivateKey, fetchEncryptedPrivateKey, decryptPrivateKeyFnc, pvtKeyResponse, setIsLoggedIn } = useContext(ChatContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = {};
        if (email.trim().length < 2 || !email.includes(".")) {
            error.email = "Please Enter valid email"
        }
        if (password.trim().length < 6) {
            error.password = "Password must be of 6 characters long"
        }
        setErrors(error)
        if (Object.keys(error).length > 0) {
            return;
        }
        try {
            setLoading(true)
            let response = await fetch("http://localhost:8080/api/v1/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            let data = await response.json();
            if (response.status == 200) {
                setIsLoggedIn(true);
                await getProfile();
                const data = await fetchEncryptedPrivateKey();
                if (data) {
                    await decryptPrivateKeyFnc(data, password);
                }
                toast.success("Login Successfull");
                navigate("/")
                console.log(data);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Some thing went wrong");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-linear-to-tr from-slate-900 via-red-900 to-slate-900 animate-gradient min-h-screen flex items-center justify-center p-4'>
            <div className="relative w-full max-w-md">
                {/* Main Form Card */}
                <div className=" backdrop-blur-md border border-white rounded-2xl p-8 shadow-2xl relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
                        <p className="text-slate-300 text-sm mt-2">Please enter your details to sign in</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Input Group */}
                        <div>
                            {/* FIX: 'for' ko 'htmlFor' kiya */}
                            <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">Email Address</label>
                            <div className="relative">
                                <input type="email" id="email" name="email" required
                                    className="w-full px-4 py-3 bg-white/5 border border-slate-500/30 rounded-xl text-white placeholder-slate-400 
                            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                            transition-all duration-300 ease-in-out hover:border-slate-400"
                                    placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                {errors && <p className='text-red-500'>{errors.name}</p>}
                            </div>
                        </div>

                        {/* Password Input Group */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                {/* FIX: 'class' aur 'for' dono ko change kiya */}
                                <label htmlFor="password" className="text-sm font-medium text-slate-200">Password</label>
                                <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors duration-200">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <input type="password" id="password" name="password" required
                                    className="w-full px-4 py-3 bg-white/5 border border-slate-500/30 rounded-xl text-white placeholder-slate-400 
                            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
                            transition-all duration-300 ease-in-out hover:border-slate-400"
                                    placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                                {errors && <p className='text-red-500'>{errors.password}</p>}
                            </div>
                        </div>
                        {/* Remember Me Checkbox */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox"
                                    className="h-4 w-4 rounded bg-white/5 border-slate-500/30 text-purple-600 focus:ring-purple-500 accent-purple-500 cursor-pointer" />
                                {/* FIX: 'for' ko 'htmlFor' kiya */}
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300 cursor-pointer select-none">Remember me</label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button type="submit"
                                className="w-full py-3 px-4 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl
                        shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:from-purple-500 hover:to-blue-500
                        transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer" disabled={loading}>
                                {loading ? <PulseLoader color='white' size={17} /> : "Sign in"}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-slate-400 mt-8">
                        Don't have an account?{' '}
                        <a href="#" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200" onClick={() => navigate("/register")}>Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login