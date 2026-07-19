import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const EnterPassword = ({ handleUnlockChat, password, setPassword }) => {
    const [showPassword, setShowPassword] = useState(false);
    

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-[#090d16] flex items-center justify-center p-4 text-gray-100 font-sans">
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm sm:max-w-md border border-gray-800 bg-gray-900/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
            >
                {/* 🔒 Top Animated Secure Icon */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600/10 text-indigo-400 rounded-2xl mb-4 border border-indigo-500/25 shadow-lg shadow-indigo-600/5">
                        <Lock size={26} className="animate-pulse" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Unlock Secure Chat
                    </h1>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 font-medium">
                        Enter account password to decrypt your E2EE workspace keys
                    </p>
                </div>

                {/* Password Input Control Group */}
                <div className="flex flex-col gap-1.5">
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">
                        Password
                    </label>

                    <div className="relative flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") handleUnlockChat(); }}
                            placeholder="Enter your master password"
                            className="w-full pl-4 pr-10 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 text-gray-500 hover:text-gray-300 transition-colors focus:outline-none bg-transparent border-none p-0 cursor-pointer"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Submit / Unlock Button */}
                <div className="pt-2">
                    <button
                        type="button"
                        onClick={handleUnlockChat}
                        className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl
                        shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
                    >
                        Unlock Messages
                    </button>
                </div>

                {/* Modern Border Divider */}
                <div className="flex items-center my-2 text-center">
                    <div className="flex-1 h-px bg-gray-800/60"></div>
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold px-3">End-to-End Cryptography</span>
                    <div className="flex-1 h-px bg-gray-800/60"></div>
                </div>

                {/* Informational Safe Block */}
                <div className="p-3 bg-gray-950/40 border border-gray-800/60 rounded-xl flex items-start gap-3">
                    {/* <MessageSquareShield size={18} className="text-indigo-400 flex-shrink-0 mt-0.5" /> */}
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">
                        After verification, private credentials will instantly map and decrypt secure chats locally.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default EnterPassword;