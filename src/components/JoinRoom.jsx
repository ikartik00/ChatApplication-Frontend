import React, { useContext, useState } from 'react'
import ChatIcon from '../assets/ChatIcon.png'
import toast from 'react-hot-toast'
import { ChatContext } from '../context/ContextProvider'
import { useNavigate } from 'react-router'
import { ClipLoader } from 'react-spinners'
import EnterPassword from './EnterPassword'
import { motion } from 'framer-motion'

const JoinRoom = () => {
    const [roomId, setRoomId] = useState("")
    const [error, setError] = useState(null)
    const [loadingCreate, setLoadingCreate] = useState(false)
    const navigate = useNavigate();
    const { userData, decryptPrivateKeyFnc } = useContext(ChatContext)
    const { setRoomData, setCurrentUser, setConnected, joinRoomAPI, loadingJoin, privateKey, pvtKeyResponse, isLoggedIn } = useContext(ChatContext)
    const [password, setPassword] = useState("")
    const API_URL = import.meta.env.VITE_API_URL;

    const validateForm = () => {
        let errors = {};
        if (roomId.trim() === "") {
            errors.roomId = "Room ID is required";
        }
        return errors;
    }

    const joinRoom = async () => {
        let errors = validateForm();
        setError(errors)
        if (Object.keys(errors).length > 0) {
            return;
        }
        joinRoomAPI(roomId);
    }

    const createRoom = async () => {
        let errors = validateForm();
        setError(errors)
        if (Object.keys(errors).length > 0) {
            return;
        }
        try {
            setLoadingCreate(true)
            const response = await fetch(`${API_URL}/api/v1/create-room`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ roomId })
            })
            let data = await response.json();
            if (response.status === 201) {
                setRoomData(data)
                setCurrentUser(userData?.userId)
                setConnected(true)
                navigate("/chat")
                toast.success("Room Created Successfully")
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Some error occurred while creating a room");
        } finally {
            setLoadingCreate(false)
        }
    }
    
    const handleUnlockChat = () => {
        if (!password) {
            toast.error("Password is Required")
            return;
        }
        decryptPrivateKeyFnc(pvtKeyResponse, password)
    }

    if (!privateKey && isLoggedIn) {
        return <EnterPassword handleUnlockChat={handleUnlockChat} password={password} setPassword={setPassword} />
    }

    return (
        /* ✨ FIX: min-h-screen ko change karke h-[calc(100vh-64px)] ya sm:h-[calc(100vh-80px)] kiya taaki Navbar space subtract ho sake aur scroll wrap na ho */
        <div className="h-[calc(100vh-64px)] sm:h-[calc(100vh-82px)] w-full bg-[#090d16] flex flex-col items-center justify-center p-4 sm:p-6 text-gray-100 relative overflow-hidden font-sans">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-purple-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

            {/* Welcome Banner */}
            {userData?.name && (
                <motion.h1 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl sm:text-2xl font-extrabold text-indigo-400 mb-4 sm:mb-6 text-center tracking-tight px-4 relative z-10"
                >
                    Welcome, {userData.name} 👋
                </motion.h1>
            )}

            {/* Main Card Container */}
            <div className="relative w-full max-w-sm sm:max-w-md z-10 mx-auto px-2">
                <motion.div 
                    className="w-full border border-gray-800 bg-gray-900/60 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-5 sm:space-y-6"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 120 }}
                >
                    {/* Logo/Icon Container */}
                    <div className="relative flex justify-center">
                        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gray-950/50 rounded-2xl flex items-center justify-center p-3 shadow-inner border border-gray-800">
                            <img src={ChatIcon} alt="chaticon" className="w-full h-full object-contain filter brightness-110" />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Join or Create Room
                        </h2>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
                            Connect with your secure workspace instantly.
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="roomInput" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">
                                Room ID
                            </label>
                            <input
                                type="text"
                                id="roomInput"
                                placeholder="Enter or generate ID"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                                focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                            />
                            {error?.roomId && (
                                <p className="text-[11px] sm:text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                                    ⚠️ {error.roomId}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                            className="py-2.5 sm:py-3 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl
                            shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
                            onClick={joinRoom} 
                            disabled={loadingJoin || loadingCreate}
                        >
                            {loadingJoin ? <ClipLoader size={18} color="white" /> : "Join Room"}
                        </button>

                        <button
                            className="py-2.5 sm:py-3 px-3 bg-gray-950/50 hover:bg-gray-800/80 text-gray-200 border border-gray-800 font-bold text-xs sm:text-sm rounded-xl
                            shadow-lg active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
                            onClick={createRoom}
                            disabled={loadingJoin || loadingCreate}
                        >
                            {loadingCreate ? <ClipLoader size={18} color="white" /> : "Create Room"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default JoinRoom