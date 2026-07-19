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