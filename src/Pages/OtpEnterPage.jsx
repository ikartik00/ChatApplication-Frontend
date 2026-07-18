import React from 'react'
import { PulseLoader } from 'react-spinners'
import { motion } from 'framer-motion';

const OtpEnterPage = ({ inputRef, handleChange, handleKeyDown, handlePaste, otpError, handleVerify, verifyOtpLoading }) => {
    return (
        <motion.div

            // Initial state: Form chota (scale 0.7) aur invisible (opacity 0) hoga
            initial={{ opacity: 0, scale: 0.7, y: 50 }}

            // Animate state: Screen par aate hi normal size aur perfect position me aa jayega
            animate={{ opacity: 1, scale: 1, y: 0 }}

            // Transition: Animation kitna smooth aur fast chalega
            transition={{
                duration: 0.5,
                ease: "easeOut",
                type: "spring", // Spring effect se thoda bouncy aur premium feel aata hai
                stiffness: 100
            }}>
            <div>
                <h1 className='text-2xl text-center font-bold mb-3'>Email Verify Otp</h1>
                <p className='text-md text-center font-semibold mb-2'>Enter the 6-digit code sent to your email.</p>
            </div>
            <div className='flex justify-between gap-2 flex-nowrap items-center w-full mb-2'>
                {[...Array(6)].map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        ref={(el) => (inputRef.current[index] = el)}
                        onChange={(e) => handleChange(e.target.value, index)}
                        className='outline-none w-12 h-11 text-2xl text-center border-zinc-300 border font-semibold rounded-lg'
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                    />
                ))}
            </div>
            {otpError && <p className='text-red-500'>{otpError}</p>}
            <div className='flex w-full'>
                <button className='border mt-3 bg-blue-700 w-full text-white font-bold cursor-pointer px-3 py-2 rounded-full' disabled={verifyOtpLoading} onClick={handleVerify}>{verifyOtpLoading ? <PulseLoader size={10} color="#ffffff" /> : "Verify Email"}</button>
            </div>
        </motion.div>
    )
}

export default OtpEnterPage