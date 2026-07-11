import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { ChatContext } from '../context/ContextProvider'

const EnterPassword = ({handleUnlockChat, password, setPassword}) => {
    return (
        <div className="w-screen min-h-[calc(100vh-95px)] bg-linear-to-br from-slate-950 via-slate-900  to-slate-950 flex items-center justify-center">
            <div className=" max-w-md">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl px-8 py-5">
                    <div className="flex justify-center mb-2">
                        <div className="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 15v2m-6-8V7a6 6 0 1112 0v2m-9 0h6a2 2 0 012 2v7a2 2 0 01-2 2H9a2 2 0 01-2-2v-7a2 2 0 012-2z"
                                />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-center text-white">
                        Unlock Secure Chat
                    </h1>
                    {/* Password */}
                    <div className="mt-4">
                        <label className="block text-sm text-slate-300 mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none 
                                focus:border-indigo-500 transition"
                            />

                            <button
                                type="submit"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                            >
                                👁️
                            </button>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        className="mt-4 w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 py-3 text-white font-semibold text-lg"
                        onClick={handleUnlockChat}
                    >
                        Unlock Messages
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-5">
                        <div className="flex-1 h-px bg-slate-800"></div>
                        <span className="text-slate-500 text-sm">Secure Encryption</span>
                        <div className="flex-1 h-px bg-slate-800"></div>
                    </div>
                    {/* Info */}
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                            <span>💬</span>
                            <p className="text-slate-400">
                                After unlocking, your messages will be decrypted automatically.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default EnterPassword;