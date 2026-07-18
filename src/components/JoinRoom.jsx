// import React, { useContext, useEffect, useState } from 'react'
// import ChatIcon from '../assets/ChatIcon.png'
// import toast from 'react-hot-toast'
// import { ChatContext } from '../context/ContextProvider'
// import { useNavigate } from 'react-router'
// import { PulseLoader } from 'react-spinners'
// import Navbar from './Navbar'
// import EnterPassword from './EnterPassword'

// const JoinRoom = () => {
//     const [roomId, setRoomId] = useState("")
//     const [error, setError] = useState(null)
//     const [loadingCreate, setLoadingCreate] = useState(false)
//     const navigate = useNavigate();
//     const { userData, setUserData, getProfile, decryptPrivateKeyFnc } = useContext(ChatContext)
//     const { roomData, setRoomData, currentUser, setCurrentUser,connected, setConnected, joinRoomAPI, loadingJoin, setLoadingJoin, privateKey, getPrivateKey, pvtKeyResponse, isLoggedIn } = useContext(ChatContext)
//     const [password, setPassword] = useState("")

//     const validateForm = () => {
//         let errors = {};
//         if (roomId.trim() === "") {
//             errors.roomId = "Room ID is required";
//         }
//         return errors;
//     }

//     const joinRoom = async () => {
//         let errors = validateForm();
//         setError(errors)
//         if (Object.keys(errors).length > 0) {
//             return;
//         }
//         joinRoomAPI(roomId);
//     }

//     const createRoom = async () => {
//         let errors = validateForm();
//         setError(errors)
//         if (Object.keys(errors).length > 0) {
//             return;
//         }
//         try {
//             setLoadingCreate(true)
//             const response = await fetch("http://localhost:8080/api/v1/create-room", {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     roomId
//                 })
//             })
//             let data = await response.json();
//             if (response.status === 201) {
//                 setRoomData(data)
//                 setCurrentUser(userData?.userId)
//                 setConnected(true)
//                 navigate("/chat")
//                 toast.success("Room Created Successfully")
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error("Some error occured while creating a room");
//         } finally {
//             setLoadingCreate(false)
//         }
//     }
//      const handleUnlockChat = ()=>{
//         if(!password){
//             toast.error("Password is Required")
//             return;
//         }
//         console.log(pvtKeyResponse);
//         decryptPrivateKeyFnc(pvtKeyResponse, password)
//     }

//     if(!privateKey && isLoggedIn){
//         console.log(isLoggedIn);
//         return <EnterPassword handleUnlockChat = {handleUnlockChat} password = {password} setPassword = {setPassword}/>
//     }

//     return (
//         <div className='min-h-[calc(100vh-87px)] w-full flex flex-col justify-center items-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300'>
//             <h1 className='text-3xl font-bold text-emerald-700'>Welcome, {userData && userData.name}</h1>
//             {/* Main Card Container with subtle floating effect */}
//             <div className='w-full max-w-md px-6 py-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex gap-6 flex-col relative overflow-hidden backdrop-blur-sm'>

//                 {/* Background Subtle Gradient Glow (Sirf look badhane ke liye) */}
//                 <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
//                 <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

//                 {/* Logo/Icon Container */}
//                 <div className="relative z-10">
//                     <div className="w-20 h-20 mx-auto bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center p-3 shadow-inner border border-slate-200/40 dark:border-slate-700/40">
//                         <img src={ChatIcon} alt="chaticon" className="w-full h-full object-contain" />
//                     </div>
//                 </div>

//                 {/* Header */}
//                 <div className="text-center relative z-10">
//                     <h1 className='text-2xl font-extrabold tracking-tight bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent'>
//                         Join or Create Room
//                     </h1>
//                     <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">Connect with your friends instantly</p>
//                 </div>

//                 {/* Form Fields */}
//                 <div className="space-y-4 relative z-10">
//                     {/* Room ID Input */}
//                     <div className='flex flex-col gap-1.5'>
//                         <label htmlFor="roomInput" className='text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1'>
//                             Room ID
//                         </label>
//                         <input
//                             type="text"
//                             id="roomInput"
//                             placeholder='Enter or generate ID'
//                             className='w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-white outline-none placeholder-slate-400 dark:placeholder-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-200'
//                             value={roomId}
//                             onChange={(e) => setRoomId(e.target.value)}
//                         />
//                         {error?.roomId && (
//                             <p className='text-xs font-semibold text-rose-500 dark:text-rose-400 mt-1 ml-1 flex items-center gap-1 animate-fade-in'>
//                                 ⚠️ {error.roomId}
//                             </p>
//                         )}
//                     </div>

//                 </div>

//                 {/* Action Buttons */}
//                 <div className='grid grid-cols-2 gap-3 mt-2 relative z-10'>
//                     <button
//                         className='bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl py-3 text-sm tracking-wide cursor-pointer shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 transform active:scale-[0.98] transition-all duration-150'
//                         onClick={joinRoom} disabled={loadingJoin, loadingCreate}
//                     >
//                         {loadingJoin ? <PulseLoader color='white' size={16} /> : "Join Room"}
//                     </button>

//                     <button
//                         className='bg-slate-900 hover:bg-slate-800 active:bg-slate-950 dark:bg-orange-600 dark:hover:bg-orange-500 dark:active:bg-orange-700 text-white font-bold rounded-xl py-3 text-sm tracking-wide cursor-pointer shadow-lg shadow-slate-900/10 dark:shadow-orange-600/10 transform active:scale-[0.98] transition-all duration-150 border border-slate-800 dark:border-transparent'
//                         onClick={createRoom}
//                         disabled={loadingJoin, loadingCreate}
//                     >
//                         {loadingCreate ? <PulseLoader color='white' size={16} /> : "Create Room"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default JoinRoom

// import React, { useContext, useState } from 'react'
// import ChatIcon from '../assets/ChatIcon.png'
// import toast from 'react-hot-toast'
// import { ChatContext } from '../context/ContextProvider'
// import { useNavigate } from 'react-router'
// import { ClipLoader } from 'react-spinners'
// import EnterPassword from './EnterPassword'
// import { motion } from 'framer-motion'

// const JoinRoom = () => {
//     const [roomId, setRoomId] = useState("")
//     const [error, setError] = useState(null)
//     const [loadingCreate, setLoadingCreate] = useState(false)
//     const navigate = useNavigate();
//     const { userData, decryptPrivateKeyFnc } = useContext(ChatContext)
//     const { setRoomData, setCurrentUser, setConnected, joinRoomAPI, loadingJoin, privateKey, pvtKeyResponse, isLoggedIn } = useContext(ChatContext)
//     const [password, setPassword] = useState("")

//     const validateForm = () => {
//         let errors = {};
//         if (roomId.trim() === "") {
//             errors.roomId = "Room ID is required";
//         }
//         return errors;
//     }

//     const joinRoom = async () => {
//         let errors = validateForm();
//         setError(errors)
//         if (Object.keys(errors).length > 0) {
//             return;
//         }
//         joinRoomAPI(roomId);
//     }

//     const createRoom = async () => {
//         let errors = validateForm();
//         setError(errors)
//         if (Object.keys(errors).length > 0) {
//             return;
//         }
//         try {
//             setLoadingCreate(true)
//             const response = await fetch("http://localhost:8080/api/v1/create-room", {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ roomId })
//             })
//             let data = await response.json();
//             if (response.status === 201) {
//                 setRoomData(data)
//                 setCurrentUser(userData?.userId)
//                 setConnected(true)
//                 navigate("/chat")
//                 toast.success("Room Created Successfully")
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.log(error)
//             toast.error("Some error occurred while creating a room");
//         } finally {
//             setLoadingCreate(false)
//         }
//     }
    
//     const handleUnlockChat = () => {
//         if (!password) {
//             toast.error("Password is Required")
//             return;
//         }
//         decryptPrivateKeyFnc(pvtKeyResponse, password)
//     }

//     if (!privateKey && isLoggedIn) {
//         return <EnterPassword handleUnlockChat={handleUnlockChat} password={password} setPassword={setPassword} />
//     }

//     return (
//         <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center p-4 sm:p-6 text-gray-100 relative overflow-hidden font-sans">
            
//             {/* Ambient Background Glows */}
//             <div className="absolute top-1/4 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>
//             <div className="absolute bottom-1/4 right-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-purple-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

//             {/* Welcome Banner */}
//             {userData?.name && (
//                 <motion.h1 
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-xl sm:text-2xl font-extrabold text-indigo-400 mb-6 text-center tracking-tight px-4"
//                 >
//                     Welcome, {userData.name} 👋
//                 </motion.h1>
//             )}

//             {/* Main Card Container */}
//             <div className="relative w-full max-w-sm sm:max-w-md z-10 mx-auto px-2">
//                 <motion.div 
//                     className="w-full border border-gray-800 bg-gray-900/60 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6"
//                     initial={{ opacity: 0, scale: 0.95, y: 20 }}
//                     animate={{ opacity: 1, scale: 1, y: 0 }}
//                     transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 120 }}
//                 >
//                     {/* Logo/Icon Container */}
//                     <div className="relative flex justify-center">
//                         <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-950/50 rounded-2xl flex items-center justify-center p-3 shadow-inner border border-gray-800">
//                             <img src={ChatIcon} alt="chaticon" className="w-full h-full object-contain filter brightness-110" />
//                         </div>
//                     </div>

//                     {/* Header */}
//                     <div className="text-center">
//                         <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
//                             Join or Create Room
//                         </h2>
//                         <p className="text-gray-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
//                             Connect with your secure workspace workspace workspace workspaceinstantly.
//                         </p>
//                     </div>

//                     {/* Form Fields */}
//                     <div className="space-y-4">
//                         <div className="flex flex-col gap-1.5">
//                             <label htmlFor="roomInput" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">
//                                 Room ID
//                             </label>
//                             <input
//                                 type="text"
//                                 id="roomInput"
//                                 placeholder="Enter or generate ID"
//                                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
//                                 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
//                                 value={roomId}
//                                 onChange={(e) => setRoomId(e.target.value)}
//                             />
//                             {error?.roomId && (
//                                 <p className="text-[11px] sm:text-xs text-rose-400 mt-1.5 flex items-center gap-1">
//                                     ⚠️ {error.roomId}
//                                 </p>
//                             )}
//                         </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="grid grid-cols-2 gap-3 pt-2">
//                         <button
//                             className="py-2.5 sm:py-3 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl
//                             shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
//                             onClick={joinRoom} 
//                             disabled={loadingJoin || loadingCreate}
//                         >
//                             {loadingJoin ? <ClipLoader size={18} color="white" /> : "Join Room"}
//                         </button>

//                         <button
//                             className="py-2.5 sm:py-3 px-3 bg-gray-950/50 hover:bg-gray-800/80 text-gray-200 border border-gray-800 font-bold text-xs sm:text-sm rounded-xl
//                             shadow-lg active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
//                             onClick={createRoom}
//                             disabled={loadingJoin || loadingCreate}
//                         >
//                             {loadingCreate ? <ClipLoader size={18} color="white" /> : "Create Room"}
//                         </button>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     )
// }

// export default JoinRoom

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