// import React, { useContext, useEffect, useEffectEvent, useState } from 'react';
// import toast from 'react-hot-toast';
// import { ChatContext } from '../context/ContextProvider';
// import { useNavigate } from 'react-router';
// import { Trash } from 'lucide-react';
// import { PulseLoader } from 'react-spinners';


// // Maan ke chalo ye data backend (API) se aa raha hai


// function MyRooms() {
//   const [allRooms, setAllRooms] = useState([])
//   const { userData, joinRoomAPI, currentUser, setCurrentUser, connected, setConnected, loadingJoin, setLoadingJoin, privateKey } = useContext(ChatContext)
//   const navigate = useNavigate()
//   const [deleteLoading, setDeleteLoading] = useState(false)
//   const [deleteId, setDeleteId] = useState("")

//   useEffect(() => {
//     const getAllRooms = async () => {
//       try {
//         let response = await fetch("http://localhost:8080/api/v1/getAllRoomsCreateOrJoin", {
//           credentials: "include"
//         })
//         if (response.ok) {
//           response = await response.json();
//           setAllRooms(response)
//         } else {
//           toast.error("Something went wrong try later")
//         }
//       } catch (error) {
//         toast.error("Some error occured")
//       }
//     }
//     getAllRooms();
//   }, [])

//   const joinRoom = (roomId) => {
//     if(!privateKey){
//       navigate("/")
//       return;
//     }
//     joinRoomAPI(roomId);
//   }

//   const handleDelete = async(roomId) => {
//     setDeleteId(roomId)
//     try {
//       setDeleteLoading(true)
//       let response = await fetch(`http://localhost:8080/api/v1/delete/room/${roomId}`, {
//         credentials: "include",
//         method : "DELETE"
//       })
//       if (response.ok) {
//         toast.success("Room deleted successfully")
//         setAllRooms((prev) => (prev.filter(room => room.roomId !== roomId)))
//       } else {
//         toast.error("Room Not Deleted Due to some error")
//       }
//     } catch (error) {
//       toast.error("Some error occured")
//     } finally {
//       setDeleteLoading(false)
//       setDeleteId("")
//     }
//   }

//   return (
//     <div className="h-[calc(100vh-87px)] bg-[#0b0f19] text-white p-6 font-sans overflow-auto rooms">
//       {/* Header Section */}
//       <div className="max-w-6xl mx-auto flex justify-between items-center mb-8 border-b border-gray-800 pb-5">
//         <div>
//           <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//             Your Rooms
//           </h1>
//           <p className="text-gray-400 text-sm mt-1">Manage and jump into rooms you created or joined.</p>
//         </div>

//         {/* Create Room Button */}
//         <button className="bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium px-5 py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] text-sm cursor-pointer" onClick={() => navigate("/")}>
//           + Create New Room
//         </button>
//       </div>

//       {/* Grid Layout for Rooms */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {allRooms.map((room) => (
//           <div
//             key={room.roomId}
//             className="bg-[#131a26] border border-gray-800/60 rounded-xl p-5 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 shadow-[0_0_15px_5px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] group relative overflow-hidden"
//           >
//             {/* Subtle top light bar on hover */}
//             <div className="absolute top-0 left-0 w-full h-0.75 bg-linear-to-r from-blue-500 to-cyan-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

//             {/* Room Title & Role Tag */}
//             <div>
//               <div className="flex justify-between items-start gap-2 mb-2">
//                 <h3 className="text-lg font-semibold text-gray-100 group-hover:text-blue-400 transition-colors truncate">
//                   # {room.roomId}
//                 </h3>
//                 <span className={`${userData?.userId == room.userId ? "border-blue-500/20 bg-blue-500/10" : "bg-gray-500/10 border-gray-500/20"} not-visited:text-[10px]  text-gray-400 border  font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider`}>
//                   {userData?.userId == room.userId ? "Owner" : "User"}
//                 </span>
//                 {userData?.userId == room.userId && <button className={`bg-gray-500/10 border-gray-500/20 not-visited:text-[10px]  text-gray-400 border  font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider cursor-pointer hover:bg-gray-500/30`} onClick={()=>handleDelete(room.roomId)} disabled={deleteLoading && deleteId === room.roomId}>
//                   {deleteId === room.roomId ?<PulseLoader size={7}/>:<Trash size={13}/>}
//                 </button>}
//               </div>
//             </div>

//             {/* Bottom Info & Action Button */}
//             <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-800/40">
//               <div className="flex items-center text-gray-400 text-xs gap-1.5">
//                 {/* Users Icon Placeholder using standard HTML entities or simple dots */}
//                 <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//                 <span>{room.members} Members</span>
//               </div>

//               <button className="text-xs font-semibold text-blue-400 hover:text-white border border-blue-500/30 hover:bg-blue-600 px-3 py-1.5 rounded-md transition-all cursor-pointer" onClick={() => joinRoom(room.roomId)}>
//                 Open Chat →
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }
// export default MyRooms;

import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ChatContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router';
import { Trash, MessageSquarePlus, Users, MessageSquareCode } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';

function MyRooms() {
  const [allRooms, setAllRooms] = useState([])
  const { userData, joinRoomAPI, privateKey } = useContext(ChatContext)
  const navigate = useNavigate()
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        let response = await fetch(`${API_URL}/api/v1/getAllRoomsCreateOrJoin`, {
          credentials: "include"
        })
        if (response.ok) {
          let data = await response.json();
          setAllRooms(data)
        } else {
          toast.error("Something went wrong, please try again later")
        }
      } catch (error) {
        toast.error("Some error occurred")
      }
    }
    getAllRooms();
  }, [])

  const joinRoom = (roomId) => {
    if(!privateKey){
      navigate("/")
      return;
    }
    joinRoomAPI(roomId);
  }

  const handleDelete = async (roomId) => {
    setDeleteId(roomId)
    try {
      setDeleteLoading(true)
      let response = await fetch(`${API_URL}/api/v1/delete/room/${roomId}`, {
        credentials: "include",
        method : "DELETE"
      })
      if (response.ok) {
        toast.success("Room deleted successfully")
        setAllRooms((prev) => (prev.filter(room => room.roomId !== roomId)))
      } else {
        toast.error("Room not deleted due to an error")
      }
    } catch (error) {
      toast.error("Some error occurred")
    } finally {
      setDeleteLoading(false)
      setDeleteId("")
    }
  }

  return (
    /* ✨ FIX: Parent window overflow control tabs taaki right profile page pane smoothly display ho */
    <div className="h-full w-full bg-transparent font-sans flex flex-col space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pb-5 border-b border-gray-800/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Your Rooms
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 font-medium">Manage and jump into rooms you created or joined.</p>
        </div>

        {/* Create Room Button */}
        <button 
          className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl
          shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 min-h-[40px]" 
          onClick={() => navigate("/")}
        >
          <MessageSquarePlus size={16} />
          Create New Room
        </button>
      </div>

      {/* Grid Layout for Rooms */}
      <div className="flex-1 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {allRooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-6">
            {allRooms.map((room) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={room.roomId}
                className="bg-gray-900/40 border border-gray-800/60 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] group relative overflow-hidden min-h-[140px]"
              >
                {/* Top decorative gradient line on hover */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-linear-to-r from-indigo-500 to-purple-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

                {/* Room Title & Role Tag */}
                <div>
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-100 group-hover:text-indigo-400 transition-colors truncate pr-2 flex items-center gap-2">
                      <MessageSquareCode size={18} className="text-gray-500 group-hover:text-indigo-400" />
                      <span>{room.roomId}</span>
                    </h3>
                    
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
                        userData?.userId === room.userId 
                          ? "bg-indigo-600/10 text-indigo-400 border-indigo-500/25" 
                          : "bg-gray-950/50 text-gray-400 border-gray-800"
                      }`}>
                        {userData?.userId === room.userId ? "Owner" : "User"}
                      </span>
                      
                      {userData?.userId === room.userId && (
                        <button 
                          className="p-1 rounded-md bg-gray-950/50 border border-gray-800 text-gray-400 hover:text-rose-400 hover:border-rose-900/30 transition-colors cursor-pointer"
                          onClick={() => handleDelete(room.roomId)} 
                          disabled={deleteLoading && deleteId === room.roomId}
                          title="Delete Room"
                        >
                          {deleteId === room.roomId ? <ClipLoader size={12} color="#f43f5e" /> : <Trash size={13} />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Info & Action Button */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-800/40 mt-auto">
                  <div className="flex items-center text-gray-400 text-xs gap-1.5 font-medium">
                    <Users size={14} className="text-gray-500" />
                    <span>{room.members || 0} Members</span>
                  </div>

                  <button 
                    className="text-xs font-bold text-indigo-400 hover:text-white border border-indigo-500/20 hover:bg-indigo-600 px-3 py-1.5 rounded-xl transition-all duration-150 cursor-pointer" 
                    onClick={() => joinRoom(room.roomId)}
                  >
                    Open Chat →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State View */
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <div className="p-4 bg-gray-950/40 border border-gray-800 text-gray-500 rounded-full">
              <MessageSquareCode size={36} />
            </div>
            <h3 className="text-lg font-bold text-gray-300">No rooms found</h3>
            <p className="text-sm text-gray-500 max-w-xs">You haven't created or joined any secure communication workspace rooms yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRooms;