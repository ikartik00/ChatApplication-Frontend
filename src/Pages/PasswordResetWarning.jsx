import React from 'react';
import { AlertTriangle, ShieldX, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const PasswordResetWarning = ({ setIsWarning }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full bg-[#090d16] flex items-center justify-center  text-gray-100 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg border border-red-500/20 bg-gray-900/40 rounded-3xl p-5 sm:p-5 backdrop-blur-xl shadow-2xl space-y-6 text-center"
            >
                {/* 🚨 Bada Danger Icon */}
                <div className="flex justify-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/25 shadow-xl shadow-red-950/20">
                        <ShieldX size={32} className="animate-bounce" />
                    </div>
                </div>

                {/* Badi Heading */}
                <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Alert!! Warning
                    </h1>
                    <p className="text-gray-400 text-sm font-medium max-w-sm mx-auto">
                        Please Read Carefully this message before resetting the password
                    </p>
                </div>

                {/* 🛑 Ekdum Simple Warning Box */}
                <div className="p-5 bg-red-950/30 border border-red-500/30 rounded-2xl text-left space-y-3">
                    <div className="flex items-center gap-2.5 text-red-400">
                        <AlertTriangle size={22} className="flex-shrink-0" />
                        <h4 className="text-base font-extrabold tracking-wide">Old Chats Will be Decrypted</h4>
                    </div>

                    <p className="text-sm text-gray-200 font-medium leading-relaxed">
                        Your chats are completely secure. If you reset your password now, all your old messages will be locked and you will never be able to read them again
                    </p>

                    <div className="pt-2 border-t border-red-500/10 text-xs text-gray-400 font-semibold space-y-1">
                        <p className="text-emerald-400">
                            Only your new messages will work perfectly</p>
                        <p className="text-rose-400">Old Chats will be permanently unreadable.</p>
                    </div>
                </div>

                {/* ⚡ Bade aur Premium Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">

                    {/* Cancel (Bada aur Safe Control) */}
                    <button
                        type="button"
                        onClick={()=>navigate("/login")}
                        className="w-full sm:flex-1 py-4 px-6 bg-gray-950 border border-gray-800 hover:border-gray-700 hover:text-white text-gray-400 font-bold text-sm sm:text-base rounded-xl
            transition-all duration-150 cursor-pointer active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Cancel
                    </button>

                    {/* Continue Anyway (Premium Danger Button) */}
                    <button
                        type="button"
                        onClick={()=>setIsWarning(false)}
                        className="w-full sm:flex-1 py-4 px-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm sm:text-base rounded-xl
            shadow-xl shadow-red-950/50 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 group border border-red-500/20"
                    >
                        Continue Anyway
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                </div>
            </motion.div>
        </div>
    );
};

export default PasswordResetWarning;