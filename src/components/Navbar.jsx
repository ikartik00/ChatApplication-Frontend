import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import chatappLogo from '../assets/chatappLogo.png'
import LogoutModal from '../Pages/LogoutModal'
import toast from 'react-hot-toast'
import { ChatContext } from '../context/ContextProvider'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();
    const { setIsLoggedIn, setPrivateKey, setPvtKeyResponse } = useContext(ChatContext)

    const handleLogout = async () => {
        try {
            setloading(true)
            let response = await fetch("http://localhost:8080/api/v1/logout", {
                method: "POST",
                credentials: "include"
            });
            if (response.ok) {
                setIsLoggedIn(false)
                const data = await response.text();
                toast.success(data)
                setIsOpen(false)
                setPrivateKey(null)
                setPvtKeyResponse(null)
                navigate("/login")
            } else {
                toast.error("Error")
            }
        } catch (error) {
            toast.error("Some error occured");
        } finally {
            setloading(false)
        }
    }

    return (
        <header className="w-full px-6  sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                
                {/* 💼 LEFT SECTION: Compact Logo alignment */}
                <div className="flex items-center cursor-pointer select-none">
                    <img 
                        src={chatappLogo} 
                        className="object-contain w-40" 
                        alt="ChatApp" 
                    />
                </div>

                {/* 🎯 MIDDLE SECTION: Corporate Tab-Style Navigation */}
                <nav className="flex items-center h-full">
                    <ul className="flex items-center gap-1 h-full">
                        <li>
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => `px-4 py-2 rounded-md text-xl font-medium transition-all duration-150 ${
                                    isActive 
                                    ? "bg-slate-800 text-emerald-400 font-semibold" 
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                }`}
                            >
                                Home
                            </NavLink>
                        </li>
                        
                        <li>
                            <NavLink 
                                to="/add-member" 
                                className={({ isActive }) => `px-4 py-2 rounded-md text-xl font-medium transition-all duration-150 ${
                                    isActive 
                                    ? "bg-slate-800 text-emerald-400 font-semibold" 
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                }`}
                            >
                                Add Member
                            </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                to="/profile" 
                                className={({ isActive }) => `px-4 py-2 rounded-md text-xl font-medium transition-all duration-150 ${
                                    isActive 
                                    ? "bg-slate-800 text-emerald-400 font-semibold" 
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                }`}
                            >
                                Profile
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* 🔒 RIGHT SECTION: Tight Clean Action Area */}
                <div className="flex items-center">
                    <button 
                        className="px-3.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xl font-semibold tracking-wide border border-slate-700 active:scale-98 transition-all cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        Logout
                    </button>
                </div>

            </div>

            {/* Logout Modal */}
            {isOpen && <LogoutModal mainText={"Want  to Logout Account"} descText={"Are you Sure You Want to Logout"} cancelText={"Cancel"} confirmText={"Logout"} isOpen={isOpen} setIsOpen={setIsOpen} handleLogoutAndDelete={handleLogout} loading={loading} />}
        </header>
    )
}

export default Navbar