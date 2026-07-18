// import React, { useContext, useEffect, useState } from 'react'
// import { ChatContext } from '../context/ContextProvider'
// import { PulseLoader } from 'react-spinners'
// import toast from 'react-hot-toast'

// const AddMember = () => {
//     const [users, setusers] = useState([])
//     const [searchValue, setSearchValue] = useState("")
//     const [selectedRoom, setSelectedRoom] = useState("")
//     const [debouncedSearch, setDebouncedSearch] = useState("")
//     const [isOpen, setIsOpen] = useState(false)
//     const [selected, setSelected] = useState(false)
//     const{allRooms, getRooms} = useContext(ChatContext)
//     const [errors, setErrors] = useState(null)
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         if (searchValue?.trim() == "") {
//             setDebouncedSearch("")
//             setIsOpen(false)
//             setusers([])
//             return;
//         }
//         let timer = setTimeout(() => {
//             setDebouncedSearch(searchValue)
//         }, 500)
//         return () => {
//             clearTimeout(timer)
//         }
//     }, [searchValue])

//     useEffect(() => {
//         if (debouncedSearch?.trim() == "") {
//             setusers([])
//             return;
//         }
//         const searchByEmail = async () => {
//             let response = await fetch(`http://localhost:8080/api/v1/search?email=${debouncedSearch}`, {
//                 credentials: "include"
//             })
//             let data = await response.json();
//             if (response.status == 200) {
//                 setusers(data)
//                 setIsOpen(true)
//             }
//         }
//         if(!selected){
//             searchByEmail();
//         }
//     }, [debouncedSearch])

//     useEffect(()=>{
//         getRooms();
//     }, [])

//     const handleSearch = (e) => {
//         setIsOpen(false)
//         setSelected(true)
//         setSearchValue(e.target.innerText)
//     }

//     const handleSubmit = async(e)=>{
//         e.preventDefault();
//         let error = {};
//         if(searchValue.trim().length < 2 || !searchValue.includes(".")){
//             error.email = "Please Enter valid email"
//         }
//         if(selectedRoom == ""){
//             error.room = "Please Select the Room"
//         }
//         setErrors(error)
//         if(Object.keys(error).length > 0){
//             return;
//         }

//          try{
//             setLoading(true)
//             let response = await fetch("http://localhost:8080/api/v1/add-member", {
//                 method : "POST",
//                 credentials : "include",
//                 headers : {
//                     "Content-Type" : "application/json"
//                 },
//                 body: JSON.stringify({
//                     email : searchValue,
//                     roomId : selectedRoom
//                 })
//             })
//             let data = await response.json();
//             if(response.status == 201){
//                 toast.success("Member Added Successfully");
//                 setSearchValue("")
//                 setSelectedRoom("")
//                 console.log(data);
//             }else{
//                 toast.error(data.message)
//             }
//         }catch(error){
//             console.log(error)
//             toast.error("Some thing went wrong");
//         }finally{
//             setLoading(false)
//         }
//     }

//     return (
//         <div className='bg-slate-950 min-h-[calc(100vh-87px)] flex justify-center items-center '>
//             <form className='flex gap-3 flex-col rounded-3xl px-7 py-8 w-120 bg-slate-900 text-white' onSubmit={handleSubmit}>
//                 <h1 className='text-center text-3xl font-bold text-white mb-4'>Add Member</h1>
//                 <div className='flex flex-col relative'>
//                     <div className='flex gap-1 flex-col'>
//                         <label htmlFor="" className='text-lg font-bold text-slate-500 uppercase'>Search Member</label>
//                         <input type="text" placeholder='search' className=' rounded-xl px-4 py-2  font-semibold outline-none bg-slate-950 border border-slate-200' value={searchValue} onChange={(e) => {
//                             setSearchValue(e.target.value)
//                             setSelected(false)
//                         }} />
//                         {errors && <p className='text-red-400'>{errors.email}</p>}
//                     </div>
//                     {isOpen && <div className='w-full h-40 bg-slate-950 text-white absolute top-20 overflow-y-auto emailScroll'>
//                         {users.length > 0 ? users.map((user, idx) => (
//                             <p key={idx} className='text-lg bg-emerald-800 px-2 py-1 mb-1  cursor-pointer' onClick={handleSearch}>{user.email}</p>
//                         )) : <p className='text-red-600 font-bold text-xl text-center'>No Users Found</p>}
//                     </div>}
//                 </div>

//                 <div className='flex flex-col gap-1 '>
//                     <label className='text-lg font-bold uppercase text-slate-500'>Select Room</label>
//                     <select className='px-4 py-2 rounded-xl font-semibold border border-slate-200 bg-slate-950' onChange={(e)=>setSelectedRoom(e.target.value)} value={selectedRoom}>
//                          <option value="">Select Room</option>
//                         {allRooms.map((room, idx)=>(
//                             <option key={idx}>{room.roomId}</option>
//                         ))}
//                     </select>
//                     {errors && <p className='text-red-400'>{errors.room}</p>}
//                 </div>
//                 <button className='bg-emerald-800 text-white font-semibold px-3 py-2 rounded-full text-lg cursor-pointer '>{loading?<PulseLoader color='white' size={17}/> : "Add Member"}</button>
//             </form>
//         </div>
//     )
// }

// export default AddMember

import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ContextProvider'
import { ClipLoader } from 'react-spinners'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { UserPlus, Search, ShieldAlert } from 'lucide-react'

const AddMember = () => {
    const [users, setusers] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [selectedRoom, setSelectedRoom] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(false)
    const { allRooms, getRooms } = useContext(ChatContext)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (searchValue?.trim() === "") {
            setDebouncedSearch("")
            setIsOpen(false)
            setusers([])
            return;
        }
        let timer = setTimeout(() => {
            setDebouncedSearch(searchValue)
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [searchValue])

    useEffect(() => {
        if (debouncedSearch?.trim() === "") {
            setusers([])
            return;
        }
        const searchByEmail = async () => {
            let response = await fetch(`${API_URL}/api/v1/search?email=${debouncedSearch}`, {
                credentials: "include"
            })
            let data = await response.json();
            if (response.status === 200) {
                setusers(data)
                setIsOpen(true)
            }
        }
        if (!selected) {
            searchByEmail();
        }
    }, [debouncedSearch])

    useEffect(() => {
        getRooms();
    }, [])

    const handleSearch = (e) => {
        setIsOpen(false)
        setSelected(true)
        setSearchValue(e.target.innerText)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = {};
        if (searchValue.trim().length < 2 || !searchValue.includes(".")) {
            error.email = "Please enter a valid email address"
        }
        if (selectedRoom === "") {
            error.room = "Please select a room"
        }
        setErrors(error)
        if (Object.keys(error).length > 0) {
            return;
        }

        try {
            setLoading(true)
            let response = await fetch(`${API_URL}/api/v1/add-member`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: searchValue,
                    roomId: selectedRoom
                })
            })
            let data = await response.json();
            if (response.status === 201) {
                toast.success("Member Added Successfully");
                setSearchValue("")
                setSelectedRoom("")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    return (
        /* ✨ FIX: Dynamic Viewport calculation jo Navbar height adjust karke layout overflow aur page scroll rokti hai */
        <div className="h-[calc(100vh-64px)] sm:h-[calc(100vh-81px)] w-full bg-[#090d16] flex items-center justify-center p-4 sm:p-6 text-gray-100 relative overflow-hidden font-sans">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-60 h-60 sm:w-80 sm:h-80 bg-purple-600/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

            {/* Form Container */}
            <div className="relative w-full max-w-sm sm:max-w-md z-10 mx-auto px-2">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 120 }}
                >
                    <form className="w-full border border-gray-800 bg-gray-900/60 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                        
                        {/* Header Title with Icon */}
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600/10 text-indigo-400 rounded-xl mb-3 border border-indigo-500/25">
                                <UserPlus size={22} />
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Add Member</h1>
                            <p className="text-gray-400 text-xs sm:text-sm mt-1 font-medium">Add members to your existing workspaces</p>
                        </div>

                        {/* Field 1: Search Member */}
                        <div className="flex flex-col relative">
                            <label htmlFor="searchMember" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 ml-1">
                                Search Member
                            </label>
                            <div className="relative flex items-center">
                                <input 
                                    type="text" 
                                    id="searchMember"
                                    placeholder="Search by email..." 
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner" 
                                    value={searchValue} 
                                    onChange={(e) => {
                                        setSearchValue(e.target.value)
                                        setSelected(false)
                                    }} 
                                />
                                <Search className="absolute left-3.5 text-gray-500" size={16} />
                            </div>
                            {errors?.email && <p className="text-[11px] sm:text-xs text-rose-400 mt-1.5 flex items-center gap-1">⚠️ {errors.email}</p>}
                            
                            {/* Dropdown Suggestions List */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="w-full max-h-40 bg-gray-950/95 border border-gray-800 rounded-xl absolute top-[74px] sm:top-[84px] overflow-y-auto z-50 shadow-2xl backdrop-blur-md divide-y divide-gray-900"
                                    >
                                        {users.length > 0 ? users.map((user, idx) => (
                                            <p 
                                                key={idx} 
                                                className="text-sm text-gray-300 hover:text-white bg-transparent hover:bg-indigo-600/20 px-4 py-2.5 cursor-pointer transition-colors duration-150 font-medium" 
                                                onClick={handleSearch}
                                            >
                                                {user.email}
                                            </p>
                                        )) : (
                                            <div className="flex items-center justify-center gap-2 py-6 text-rose-400 font-semibold text-sm">
                                                <ShieldAlert size={16} />
                                                <span>No Users Found</span>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Field 2: Select Room */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="selectRoom" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-0.5 ml-1">
                                Select Room
                            </label>
                            <select 
                                id="selectRoom"
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner cursor-pointer appearance-none" 
                                onChange={(e) => setSelectedRoom(e.target.value)} 
                                value={selectedRoom}
                            >
                                <option value="" className="bg-[#090d16] text-gray-500">Choose a Room ID</option>
                                {allRooms.map((room, idx) => (
                                    <option key={idx} value={room.roomId} className="bg-[#090d16] text-gray-200">
                                        {room.roomId}
                                    </option>
                                ))}
                            </select>
                            {errors?.room && <p className="text-[11px] sm:text-xs text-rose-400 mt-1.5 flex items-center gap-1">⚠️ {errors.room}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button 
                                type="submit"
                                className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl
                                shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
                                disabled={loading}
                            >
                                {loading ? <ClipLoader size={18} color="white" /> : "Add Member"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default AddMember