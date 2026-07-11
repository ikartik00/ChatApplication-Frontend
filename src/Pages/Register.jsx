import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { ClipLoader, PulseLoader } from 'react-spinners'
import { generateKeyPair } from '../crypto/KeyManager'
import { encryptPrivateKey } from '../crypto/e2ee'

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = {};
        if (formData.name.trim().length == 0) {
            error.name = "Name is Required"
        }
        if (formData.email.trim().length < 2 || !formData.email.includes(".")) {
            error.email = "Please Enter valid email"
        }
        if (formData.password.trim().length < 6) {
            error.password = "Password must be of 6 characters long"
        }
        setErrors(error)
        if (Object.keys(error).length > 0) {
            return;
        }

        try {
            const { publicKeyB64, privateKeyBuffer } = await generateKeyPair();
            const {encryptedPrivateKey, salt, iv} = await encryptPrivateKey(privateKeyBuffer, formData.password)
            setLoading(true)
            let response = await fetch("http://localhost:8080/api/v1/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...formData, publicKey : publicKeyB64, encryptedPrivateKey, salt, iv})
            })

            let data = await response.json();
            if (response.status == 201) {
                toast.success("Registration Successsfull")
                navigate("/login")
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something wennt wrong");
        } finally {
            setLoading(false)
        }
    }

    const navigate = useNavigate()
    return (
        <div className="bg-linear-to-tr from-slate-900 via-red-900 to-slate-900 animate-gradient min-h-screen flex items-center justify-center p-6 text-white">
            {/* Main Container */}
            <div className="w-full max-w-md  border border-slate-200 rounded-xl shadow-sm p-8 backdrop-blur-md">

                {/* Header Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Create an account</h2>
                    <p className="text-slate-200 text-sm mt-1">Get started by creating your account below.</p>
                </div>

                {/* Register Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Full Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-slate-950 placeholder-slate-400 
                    focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950
                    transition-colors duration-150 font-semibold"
                            placeholder="John Doe"
                        />
                        {errors && <p className='text-red-400'>{errors.name}</p>}
                    </div>

                    {/* Email Address Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">Email Address</label>
                        <input
                            type="type"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-slate-950 placeholder-slate-400 
                    focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950
                    transition-colors duration-150 font-semibold"
                            placeholder="name@company.com"
                        />
                        {errors && <p className='text-red-400'>{errors.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1.5">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-slate-950 placeholder-slate-400 
                    focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950
                    transition-colors duration-150 font-semibold"
                            placeholder="••••••••"
                        />
                        {errors && <p className='text-red-400'>{errors.password}</p>}
                        <p className="text-xs text-slate-200 mt-1.5">Must be at least 8 characters long.</p>
                    </div>



                    {/* Submit Button */}
                    <div className="pt-1">
                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-900 text-white font-medium text-sm rounded-lg
                    shadow-sm active:scale-[0.99] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 cursor-pointer"
                            disabled={loading}>
                            {loading ? <ClipLoader size={16} color='white' /> : "Create Account"}
                        </button>
                    </div>
                </form>

                {/* Footer Link */}
                <p className="text-center text-sm text-white mt-6">
                    Already have an account?{' '}
                    <a href="#" className="font-medium text-slate-300 hover:underline transition-all" onClick={() => navigate("/login")}>Sign in</a>
                </p>
            </div>
        </div>
    )
}

export default Register