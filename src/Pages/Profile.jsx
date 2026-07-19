import { ChevronRight } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import LogoutModal from './LogoutModal'
import toast from 'react-hot-toast'
import { ChatContext } from '../context/ContextProvider'
import { motion } from 'framer-motion'

const Profile = () => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const navigate = useNavigate()
    const { setIsLoggedIn, setUserData } = useContext(ChatContext)
    const API_URL = import.meta.env.VITE_API_URL;

    const handleDelete = async () => {
        try {
            setDeleteLoading(true)
            let response = await fetch(`${API_URL}/api/v1/deleteAccount/user`, {
                method: "DELETE",
                credentials: "include"
            });
            if (response.status === 204) {
                toast.success("Account Permanently Deleted Successfully");
                navigate("/login")
                setIsLoggedIn(false)
                setUserData(null)
            }
        } catch (error) {
            console.log("Something Went Wrong");
        } finally {
            setDeleteLoading(false)
        }
    }

    return (
        <div className="h-[calc(100vh-64px)] sm:h-[calc(100vh-81px)] w-full bg-[#090d16] flex flex-col md:flex-row text-gray-100 overflow-hidden font-sans">
            
            {/* 🛠️ NAVIGATION BAR / SIDEBAR AREA */}
            <div className="w-full md:w-1/4 lg:w-1/5 bg-gray-900/40 border-b md:border-b-0 md:border-r border-gray-800/80 backdrop-blur-xl flex-shrink-0 transition-all duration-300">
                {/* ✨ FIX: Mobile row layout me scrollbar completely hide karne ke liye Tailwind utility layers add kiye hain */}
                <div className="flex md:flex-col gap-2 p-3 overflow-x-auto md:overflow-x-visible md:overflow-y-auto whitespace-nowrap md:whitespace-normal [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    
                    <NavLink 
                        end 
                        to={"/profile"} 
                        className={({ isActive }) => `text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 border ${
                            isActive 
                            ? "bg-indigo-600/10 text-indigo-400 border-indigo-500/20 shadow-lg shadow-indigo-600/5" 
                            : "bg-gray-950/40 text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-900/60"
                        }`}
                    >
                        <span>Personal Details</span>
                        <ChevronRight size={16} className="hidden md:inline text-gray-500" />
                    </NavLink>

                    <NavLink 
                        end 
                        to={"/profile/all-members"} 
                        className={({ isActive }) => `text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 border ${
                            isActive 
                            ? "bg-indigo-600/10 text-indigo-400 border-indigo-500/20 shadow-lg shadow-indigo-600/5" 
                            : "bg-gray-950/40 text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-900/60"
                        }`}
                    >
                        <span>All Members</span>
                        <ChevronRight size={16} className="hidden md:inline text-gray-500" />
                    </NavLink>

                    <NavLink 
                        end 
                        to={"/profile/my-rooms"} 
                        className={({ isActive }) => `text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 border ${
                            isActive 
                            ? "bg-indigo-600/10 text-indigo-400 border-indigo-500/20 shadow-lg shadow-indigo-600/5" 
                            : "bg-gray-950/40 text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-900/60"
                        }`}
                    >
                        <span>My Room</span> 
                        <ChevronRight size={16} className="hidden md:inline text-gray-500" />
                    </NavLink>

                    {/* Delete Account Button */}
                    <button 
                        onClick={() => setDeleteModalOpen(true)}
                        className="text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 border bg-gray-950/40 text-gray-400 border-transparent hover:text-rose-400 hover:bg-rose-950/10 hover:border-rose-900/20 cursor-pointer text-left w-auto md:w-full flex-shrink-0"
                    >
                        <span>Delete Account</span>
                        <ChevronRight size={16} className="hidden md:inline text-gray-500 hover:text-rose-400" />
                    </button>
                </div>
            </div>

            {/* 🎯 CONTENT ROUTER OUTLET VIEWER AREA */}
            <div className="flex-1 h-full overflow-y-auto p-4 sm:p-6 md:p-8 bg-transparent [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                >
                    <Outlet />
                </motion.div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && (
                <LogoutModal 
                    mainText={"Want to Delete Account"} 
                    descText={"Are you sure you want to delete your account permanently? This action cannot be undone."} 
                    cancelText={"Cancel"} 
                    confirmText={"Delete Account"} 
                    isOpen={deleteModalOpen} 
                    setIsOpen={setDeleteModalOpen} 
                    handleLogoutAndDelete={handleDelete} 
                    loading={deleteLoading} 
                />
            )}
        </div>
    )
}

export default Profile