import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import { generateKeyPair } from '../crypto/KeyManager'
import { encryptPrivateKey } from '../crypto/e2ee'
import OtpEnterPage from './OtpEnterPage'
import NameAndPassword from './NameAndPassword'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)
    const [otpError, setOtpError] = useState(null)
    const navigate = useNavigate()
    const inputRef = useRef([]);
    const [emailSentLoading, setEmailSentLoading] = useState(false)
    const [verifyOtpLoading, setVerifyOtpLoading] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = {};
        if (formData.name.trim().length === 0) {
            error.name = "Name is Required"
        }
        if (formData.password.trim().length < 6) {
            error.password = "Password must be at least 6 characters long"
        }
        setErrors(error)
        if (Object.keys(error).length > 0) {
            return;
        }

        setLoading(true)
        try {
            const { publicKeyB64, privateKeyBuffer } = await generateKeyPair();
            const { encryptedPrivateKey, salt, iv } = await encryptPrivateKey(privateKeyBuffer, formData.password)
            let response = await fetch(`${API_URL}/api/v1/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formData, publicKey: publicKeyB64, encryptedPrivateKey, salt, iv })
            })

            let data = await response.json();
            if (response.status === 201) {
                toast.success("Registration Successful")
                navigate("/login")
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    const handleChangeOtpBox = (value, index) => {
        if (!/^[0-9]?$/.test(value)) {
            inputRef.current[index].value = "";
            return;
        }
        const newValue = value.replace(/\D/, "")
        if (newValue && index < 5) {
            inputRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRef.current[index - 1].focus();
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text");
        if (!/^\d+$/.test(data)) return;
        const digits = data.slice(0, 6).split("");
        digits.forEach((digit, index) => {
            if (inputRef.current[index]) {
                inputRef.current[index].value = digit
            }
        });
        const next = digits.length < 6 ? digits.length : 5;
        inputRef.current[next].focus();
    }

    const handleSendEmail = async (e) => {
        e.preventDefault();
        let error = {};
        if (formData.email.trim().length < 2 || !formData.email.includes(".")) {
            error.email = "Please enter a valid email address"
        }
        setErrors(error)
        if (Object.keys(error).length > 0) {
            return;
        }

        setEmailSentLoading(true)
        try {
            let response = await fetch(`${API_URL}/api/v1/auth/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: formData.email })
            })
            if (response.ok) {
                toast.success("OTP Sent Successfully")
                setIsEmailSent(true);
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to send OTP");
            }
        } catch (error) {
            toast.error("Some error occurred");
        } finally {
            setEmailSentLoading(false);
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault();
        const otp = inputRef.current.map(input => input.value).join("")
        if (otp.length !== 6) {
            setOtpError("Please enter a valid 6-digit OTP")
            return;
        }

        setVerifyOtpLoading(true)
        try {
            let response = await fetch(`${API_URL}/api/v1/auth/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: formData.email, otp: otp })
            })
            if (response.ok) {
                toast.success("OTP Verified Successfully")
                setIsOtpSubmitted(true);
            } else {
                const data = await response.json();
                toast.error(data.message || "Invalid OTP");
            }
        } catch (error) {
            toast.error("Some error occurred");
        } finally {
            setVerifyOtpLoading(false);
        }
    }

    // Dynamic Headers based on Registration State
    const getHeaderContent = () => {
        if (isOtpSubmitted) return { title: "Complete Profile", sub: "Set up your screen name and secure password." };
        if (isEmailSent) return { title: "Verify Email", sub: `We've sent a 6-digit code to ${formData.email}` };
        return { title: "Create Account", sub: "Get started with your secure chat workspace." };
    }

    const header = getHeaderContent();

    return (
        <div className="min-h-screen bg-[#090d16] flex items-center justify-center p-6 text-gray-100 relative overflow-hidden font-sans">
            {/* Ambient Background Lights */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            {/* Main Container */}
            <div className="relative w-full max-w-md z-10">
                
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
                    className="w-full border border-gray-800 bg-gray-900/60 rounded-3xl shadow-2xl p-8 backdrop-blur-xl" 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 120 }}
                >
                    {/* Header Section */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-white tracking-tight">{header.title}</h2>
                        <p className="text-gray-400 text-sm mt-2 leading-relaxed">{header.sub}</p>
                    </div>

                    {/* Form Elements with AnimatePresence for Smooth Stage Swapping */}
                    <AnimatePresence mode="wait">
                        {/* STEP 1: Email Input */}
                        {!isEmailSent && (
                            <motion.form 
                                key="email-form"
                                className="space-y-6" 
                                onSubmit={handleSendEmail}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            >
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                                        focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 font-medium shadow-inner"
                                        placeholder="name@company.com"
                                    />
                                    {errors?.email && <p className='text-xs text-rose-400 mt-2 flex items-center gap-1'>⚠️ {errors.email}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl
                                    shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[44px]"
                                    disabled={emailSentLoading}
                                >
                                    {emailSentLoading ? <ClipLoader size={18} color='white' /> : "Send OTP Verification"}
                                </button>
                            </motion.form>
                        )}

                        {/* STEP 2: OTP Entry */}
                        {!isOtpSubmitted && isEmailSent && (
                            <motion.div
                                key="otp-form"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            >
                                <OtpEnterPage 
                                    handleChange={handleChangeOtpBox} 
                                    handleKeyDown={handleKeyDown} 
                                    handleVerify={handleVerify} 
                                    handlePaste={handlePaste} 
                                    inputRef={inputRef} 
                                    otpError={otpError} 
                                    verifyOtpLoading={verifyOtpLoading} 
                                />
                            </motion.div>
                        )}

                        {/* STEP 3: Name & Password Entry */}
                        {isOtpSubmitted && isEmailSent && (
                            <motion.div
                                key="profile-form"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <NameAndPassword 
                                    handleSubmit={handleSubmit} 
                                    loading={loading} 
                                    password={formData.password} 
                                    handleChange={handleChange} 
                                    name={formData.name} 
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer Link */}
                    <p className="text-center text-sm text-gray-400 mt-8 pt-6 border-t border-gray-800/60">
                        Already have an account?{' '}
                        <button 
                            onClick={() => navigate("/login")} 
                            className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline transition-all cursor-pointer bg-transparent border-none"
                        >
                            Sign in
                        </button>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

export default Register