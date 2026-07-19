import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import chatappLogo from '../assets/chatappLogo.png'
import LogoutModal from '../Pages/LogoutModal'
import toast from 'react-hot-toast'
import { ChatContext } from '../context/ContextProvider'
import { Menu, X, LogOut, MessageCircleMore } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();
    const { setIsLoggedIn, setPrivateKey, setPvtKeyResponse } = useContext(ChatContext)
    const API_URL = import.meta.env.VITE_API_URL;

    const handleLogout = async () => {
        try {
            setloading(true)
            let response = await fetch(`${API_URL}/api/v1/logout`, {
                method: "POST",
                credentials: "include"
            });
            if (response.ok) {
                setIsLoggedIn(false)
                const data = await response.text();
                toast.success(data)
                setIsOpen(false)
                setIsMobileMenuOpen(false)
                setPrivateKey(null)
                setPvtKeyResponse(null)
                navigate("/")
            } else {
                toast.error("Error")
            }
        } catch (error) {
            toast.error("Some error occurred");
        } finally {
            setloading(false)
        }
    }

    return (
        /* ✨ FIX: bg-slate-900 aur glass effect hatakar direct exact matching solid bg-[#090d16] color de diya hai */
        <header className="w-full px-4 sm:px-6 sticky top-0 z-50 bg-[#090d16] border-b border-gray-800/40 text-gray-100 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center h-16 sm:h-20">

                {/* 💼 LEFT SECTION: Compact Logo alignment */}
                {/* <div className="flex items-center cursor-pointer select-none" onClick={() => navigate("/")}>
                    <img 
                        src={chatappLogo} 
                        className="object-contain w-32 sm:w-40 transition-transform duration-200 active:scale-95" 
                        alt="ChatApp" 
                    />
                </div> */}
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600">
                        <MessageCircleMore size={24} className="text-white" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold text-white">
                            ChatFlow
                        </h1>

                        <p className="text-xs text-slate-400">
                            Connect Instantly
                        </p>
                    </div>
                </div>

                {/* 🎯 MIDDLE SECTION: Desktop Tab-Style Navigation */}
                <nav className="hidden md:flex items-center h-full">
                    <ul className="flex items-center gap-1.5">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => `px-4 py-2 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 ${isActive
                                        ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                                    }`}
                            >
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/add-member"
                                className={({ isActive }) => `px-4 py-2 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 ${isActive
                                        ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                                    }`}
                            >
                                Add Member
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) => `px-4 py-2 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 ${isActive
                                        ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                                        : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                                    }`}
                            >
                                Profile
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* 🔒 RIGHT SECTION: Desktop Logout */}
                <div className="hidden md:flex items-center">
                    <button
                        className="px-4 py-2 rounded-xl bg-gray-950/50 hover:bg-rose-950/20 border border-gray-800 hover:border-rose-900/40 text-gray-300 hover:text-rose-400 text-sm sm:text-base font-bold tracking-wide active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
                        onClick={() => setIsOpen(true)}
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>

                {/* 📱 MOBILE NAVIGATION HAMBURGER BUTTON */}
                <div className="flex md:hidden items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg focus:outline-none transition-colors cursor-pointer"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* 📱 MOBILE RESPONSIVE DRAWER OVERLAY */}
            <div className={`md:hidden fixed inset-x-0 top-[64px] sm:top-[80px] bg-[#090d16] border-b border-gray-800/60 transition-all duration-300 ease-in-out z-40 transform origin-top ${isMobileMenuOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible h-0"
                }`}>
                <nav className="p-4 space-y-3">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `block px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive ? "bg-indigo-600/10 text-indigo-400" : "text-gray-400 hover:bg-gray-800/40 text-gray-300"
                                    }`}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/add-member"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `block px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive ? "bg-indigo-600/10 text-indigo-400" : "text-gray-400 hover:bg-gray-800/40 text-gray-300"
                                    }`}
                            >
                                Add Member
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `block px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive ? "bg-indigo-600/10 text-indigo-400" : "text-gray-400 hover:bg-gray-800/40 text-gray-300"
                                    }`}
                            >
                                Profile
                            </NavLink>
                        </li>
                    </ul>

                    <div className="pt-2 border-t border-gray-800/60">
                        <button
                            className="w-full px-4 py-3 rounded-xl bg-rose-600/10 border border-rose-500/20 text-rose-400 text-base font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2"
                            onClick={() => setIsOpen(true)}
                        >
                            <LogOut size={18} />
                            Logout Account
                        </button>
                    </div>
                </nav>
            </div>

            {/* Logout Modal */}
            {isOpen && (
                <LogoutModal
                    mainText={"Want to Logout Account"}
                    descText={"Are you Sure You Want to Logout"}
                    cancelText={"Cancel"}
                    confirmText={"Logout"}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    handleLogoutAndDelete={handleLogout}
                    loading={loading}
                />
            )}
        </header>
    )
}

export default Navbar