// import React, { useEffect } from 'react'
// import { useState } from 'react';
// import toast from 'react-hot-toast';
// import { PulseLoader } from 'react-spinners';

// function AllMembers() {
//   // Mock Data: Yeh aapki global backend API (userRepository) se aayega
//   const [globalUsers, setGlobalUsers] = useState([]);
//   const [deletingId, setDeletingId] = useState(null)

//   useEffect(()=>{
//     const fetchAllMembers = async()=>{
//       try{
//         let response = await fetch("http://localhost:8080/api/v1/getAllUsers", {
//           credentials : "include"
//         })
//         if(response.status == 200){
//           response = await response.json()
//           setGlobalUsers(response)
//         }
//       }catch(error){
//         console.log("Something went wrong");
//       }
//     }
//     fetchAllMembers()
//   }, [])

//   const handleDelete = async(roomId, userId)=>{
//     try{
//       setDeletingId(roomId + userId)
//         let response = await fetch(`http://localhost:8080/api/v1/delete/room/${roomId}/member/${userId}`, {
//           method : "DELETE",
//           credentials : "include"
//         })
//         if(response.status == 204){
//           toast.success("Member Deleted Successfully")
//           setGlobalUsers((prev)=>(prev.filter((user)=>!(user.userId == userId && user.roomId == roomId))))
//         }else{
//           toast.error("Member Not deleted due to some reason")
//         }
//       }catch(error){
//         console.log("Something went wrong");
//       }finally{
//         setDeletingId(null)
//       }
//   }

//   return (
//     <div className="w-full h-[calc(100vh-87px)] overflow-auto bg-[#0e131f] text-white p-8 members">

//       {/* Search and Header Container */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-800 pb-6">
//         <div>
//           <h2 className="text-xl font-bold text-gray-100">Global Users Directory</h2>
//           <p className="text-gray-400 text-xs mt-1">Search users and delete from group</p>
//         </div>

//         {/* Search Bar */}
//         <div className="w-full md:w-80">
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             className="w-full bg-[#161f30] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all shadow-inner"
//           />
//         </div>
//       </div>

//       {/* Modern Table Layout for Clean View */}
//       <div className="bg-[#131a26] border border-gray-800 rounded-xl overflow-hidden shadow-lg">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="border-b border-gray-800 bg-[#161f30]/50 text-gray-400 text-xs uppercase font-semibold tracking-wider">
//               <th className="py-4 px-6">User</th>
//               <th className="py-4 px-6 hidden sm:table-cell">Email Address</th>
//               <th className="py-4 px-6 text-center">Group Name</th>
//               <th className="py-4 px-6 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-800/50">
//             {globalUsers.map((user, idx) => (
//               <tr key={idx} className="hover:bg-[#161f30]/30 transition-colors group">
//                 {/* User Profile + Name */}
//                 <td className="py-4 px-6 flex items-center gap-3">
//                   <div className={`w-10 h-10 rounded-full bg-[#0f131b] flex items-center justify-center font-bold text-sm tracking-wide  shadow-md text-white`}>
//                     {user?.name?.charAt(0)}
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-200 block text-sm group-hover:text-green-400 transition-colors">
//                       {user.name}
//                     </span>
//                     <span className="text-xs text-gray-500 sm:hidden">{user.email}</span>
//                   </div>
//                 </td>

//                 {/* Email (Hidden on Small Screens) */}
//                 <td className="py-4 px-6 text-sm text-gray-400 hidden sm:table-cell">
//                   {user.email}
//                 </td>

//                  <td className="py-4 px-6 text-sm text-center text-gray-400  sm:table-cell">
//                   {user.roomId}
//                 </td>

//                 {/* Action Buttons with Dropdown Logic Option */}
//                 <td className="py-4 px-6 text-right relative">
//                   <div className="inline-flex gap-2">
//                     {/* Add to Group Action */}
//                     <button
//                       className="bg-green-600 hover:bg-green-500 text-white text-xs font-medium px-2 py-1.5 rounded-md cursor-pointer transition-all outline-none border-none shadow-[0_2px_10px_rgba(34,197,94,0.2)]" disabled={deletingId != null} onClick={()=>handleDelete(user.roomId, user.userId)}
//                     >{deletingId == (user.roomId + user.userId)?<PulseLoader size={17} color='white'/> : "Remove from Group"}
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AllMembers

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { Search, UserMinus, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

function AllMembers() {
  const [globalUsers, setGlobalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        let response = await fetch(`${API_URL}/api/v1/getAllUsers`, {
          credentials: "include"
        })
        if (response.status === 200) {
          let data = await response.json();
          setGlobalUsers(data)
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    }
    fetchAllMembers()
  }, [])

  const handleDelete = async (roomId, userId) => {
    try {
      setDeletingId(roomId + userId)
      let response = await fetch(`${API_URL}/api/v1/delete/room/${roomId}/member/${userId}`, {
        method: "DELETE",
        credentials: "include"
      })
      if (response.status === 204) {
        toast.success("Member Removed Successfully")
        setGlobalUsers((prev) => (prev.filter((user) => !(user.userId === userId && user.roomId === roomId))))
      } else {
        toast.error("Member not removed due to an error")
      }
    } catch (error) {
      console.log("Something went wrong");
    } finally {
      setDeletingId(null)
    }
  }

  // ✨ Actual Dynamic Filtering Logic based on Name or Email Search Input
  const filteredUsers = globalUsers.filter(user => 
    user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.roomId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full w-full bg-transparent font-sans flex flex-col space-y-6">

      {/* Search and Header Container */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pb-5 border-b border-gray-800/60">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Global Users Directory</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 font-medium">Search users and remove them from respective rooms</p>
        </div>

        {/* Dynamic Search Bar
        <div className="w-full sm:w-80 relative flex items-center">
          <input
            type="text"
            placeholder="Search by name, email or room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm font-medium shadow-inner"
          />
          <Search className="absolute left-3.5 text-gray-500" size={16} />
        </div> */}
      </div>

      {/* Modern Responsive Table Layout */}
      <div className="flex-1 overflow-x-auto border border-gray-800 bg-gray-900/40 rounded-2xl shadow-xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {filteredUsers.length > 0 ? (
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-950/40 text-gray-400 text-xs uppercase font-bold tracking-wider">
                <th className="py-4 px-6">User Details</th>
                <th className="py-4 px-6 hidden sm:table-cell">Email Address</th>
                <th className="py-4 px-6 text-center">Room ID</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {filteredUsers.map((user, idx) => (
                <tr key={idx} className="hover:bg-gray-800/20 transition-colors group">
                  {/* User Profile avatar + Mobile Details fallback */}
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center font-bold text-sm text-indigo-400 shadow-md">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-bold text-gray-200 block text-sm group-hover:text-indigo-400 transition-colors">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500 sm:hidden block mt-0.5">{user.email}</span>
                    </div>
                  </td>

                  {/* Email (Hidden on mobile grid) */}
                  <td className="py-4 px-6 text-sm font-medium text-gray-400 hidden sm:table-cell">
                    {user.email}
                  </td>

                  <td className="py-4 px-6 text-sm font-mono font-bold text-center text-gray-400">
                    <span className="bg-gray-950/50 border border-gray-800 px-2.5 py-1 rounded-lg text-xs">
                      {user.roomId}
                    </span>
                  </td>

                  {/* Dynamic Action Buttons */}
                  <td className="py-4 px-6 text-right">
                    <button
                      className="inline-flex items-center gap-1.5 bg-gray-950/50 border border-gray-800 hover:border-rose-900/30 text-gray-300 hover:text-rose-400 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer transition-all active:scale-95 min-h-[36px]"
                      disabled={deletingId !== null} 
                      onClick={() => handleDelete(user.roomId, user.userId)}
                    >
                      {deletingId === (user.roomId + user.userId) ? (
                        <ClipLoader size={14} color="#f43f5e" />
                      ) : (
                        <>
                          <UserMinus size={14} />
                          <span className="hidden md:inline">Remove</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          /* Empty Search State */
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
            <div className="p-4 bg-gray-950/40 border border-gray-800 text-gray-500 rounded-full">
              <ShieldAlert size={36} />
            </div>
            <h3 className="text-lg font-bold text-gray-300">No members match</h3>
            <p className="text-sm text-gray-500 max-w-xs">Try adjusting your directory search fields or criteria keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllMembers;