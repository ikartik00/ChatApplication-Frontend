import React, { useEffect } from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';

function AllMembers() {
  // Mock Data: Yeh aapki global backend API (userRepository) se aayega
  const [globalUsers, setGlobalUsers] = useState([]);
  const [deletingId, setDeletingId] = useState(null)

  useEffect(()=>{
    const fetchAllMembers = async()=>{
      try{
        let response = await fetch("http://localhost:8080/api/v1/getAllUsers", {
          credentials : "include"
        })
        if(response.status == 200){
          response = await response.json()
          setGlobalUsers(response)
        }
      }catch(error){
        console.log("Something went wrong");
      }
    }
    fetchAllMembers()
  }, [])

  const handleDelete = async(roomId, userId)=>{
    try{
      setDeletingId(roomId + userId)
        let response = await fetch(`http://localhost:8080/api/v1/delete/room/${roomId}/member/${userId}`, {
          method : "DELETE",
          credentials : "include"
        })
        if(response.status == 204){
          toast.success("Member Deleted Successfully")
          setGlobalUsers((prev)=>(prev.filter((user)=>!(user.userId == userId && user.roomId == roomId))))
        }else{
          toast.error("Member Not deleted due to some reason")
        }
      }catch(error){
        console.log("Something went wrong");
      }finally{
        setDeletingId(null)
      }
  }

  return (
    <div className="w-full h-[calc(100vh-87px)] overflow-auto bg-[#0e131f] text-white p-8 members">

      {/* Search and Header Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-800 pb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-100">Global Users Directory</h2>
          <p className="text-gray-400 text-xs mt-1">Search users and delete from group</p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full bg-[#161f30] border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Modern Table Layout for Clean View */}
      <div className="bg-[#131a26] border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-[#161f30]/50 text-gray-400 text-xs uppercase font-semibold tracking-wider">
              <th className="py-4 px-6">User</th>
              <th className="py-4 px-6 hidden sm:table-cell">Email Address</th>
              <th className="py-4 px-6 text-center">Group Name</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {globalUsers.map((user, idx) => (
              <tr key={idx} className="hover:bg-[#161f30]/30 transition-colors group">
                {/* User Profile + Name */}
                <td className="py-4 px-6 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-[#0f131b] flex items-center justify-center font-bold text-sm tracking-wide  shadow-md text-white`}>
                    {user?.name?.charAt(0)}
                  </div>
                  <div>
                    <span className="font-medium text-gray-200 block text-sm group-hover:text-green-400 transition-colors">
                      {user.name}
                    </span>
                    <span className="text-xs text-gray-500 sm:hidden">{user.email}</span>
                  </div>
                </td>

                {/* Email (Hidden on Small Screens) */}
                <td className="py-4 px-6 text-sm text-gray-400 hidden sm:table-cell">
                  {user.email}
                </td>

                 <td className="py-4 px-6 text-sm text-center text-gray-400  sm:table-cell">
                  {user.roomId}
                </td>

                {/* Action Buttons with Dropdown Logic Option */}
                <td className="py-4 px-6 text-right relative">
                  <div className="inline-flex gap-2">
                    {/* Add to Group Action */}
                    <button
                      className="bg-green-600 hover:bg-green-500 text-white text-xs font-medium px-2 py-1.5 rounded-md cursor-pointer transition-all outline-none border-none shadow-[0_2px_10px_rgba(34,197,94,0.2)]" disabled={deletingId != null} onClick={()=>handleDelete(user.roomId, user.userId)}
                    >{deletingId == (user.roomId + user.userId)?<PulseLoader size={17} color='white'/> : "Remove from Group"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllMembers