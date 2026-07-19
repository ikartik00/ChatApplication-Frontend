import React, { useContext, useState, useRef, useEffect } from 'react'
import { ChatContext } from '../context/ContextProvider'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import { Camera, User, Mail, Hash, Calendar, Key, Edit3 } from 'lucide-react'
import ChangePassword from '../Pages/ChangePassword'
import { motion, AnimatePresence } from 'framer-motion'

const PersonalDetails = () => {
  const { userData, setUserData } = useContext(ChatContext)
  const navigate = useNavigate()
  const [name, setName] = useState(userData?.name || "");
  const [avatar, setAvatar] = useState(userData?.imgUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80");
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameError, setNameError] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null);
  const [isView, setIsView] = useState("details")
  const API_URL = import.meta.env.VITE_API_URL;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setNameError("Name is Required")
      return;
    }
    const formData = new FormData();
    formData.append("name", name)
    formData.append("image", selectedFile)
    try {
      setLoading(true)
      let response = await fetch(`${API_URL}/api/v1/upload`, {
        method: "POST",
        credentials: "include",
        body: formData
      })
      if (response.ok) {
        let data = await response.json();
        toast.success("Details Updated Successfully")
        setUserData(data)
        setIsView("details")
      } else {
        toast.error("Details not updated")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      if (userData.imgUrl) {
        setAvatar(userData.imgUrl);
      }
    }
  }, [userData]);

  return (
    <div className="w-full min-h-full flex items-center justify-center px-2 sm:p-3 text-gray-100">
      <AnimatePresence mode="wait">
        {isView == "details" &&
          <motion.div
            key="view-card"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-sm sm:max-w-md border border-gray-800 bg-gray-900/40 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-indigo-500 shadow-xl">
                <img
                  src={userData?.imgUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-4 tracking-tight">
                {userData?.name}
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm font-medium mt-1 flex items-center gap-1.5">
                <Mail size={14} className="text-indigo-400" />
                {userData?.email}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-3 sm:p-4 flex flex-col gap-1 shadow-inner">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <Hash size={12} className="text-indigo-500" /> User ID
                </span>
                <p className="text-sm font-semibold text-gray-200 select-all truncate">{userData?.userId}</p>
              </div>

              <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-3 sm:p-4 flex flex-col gap-1 shadow-inner">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <Calendar size={12} className="text-indigo-500" /> Account Created
                </span>
                <p className="text-sm font-semibold text-gray-200">
                  {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                className="w-full py-2.5 sm:py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl
                shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 min-h-[40px] sm:min-h-[44px]"
                onClick={() => setIsView("edit")}
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
              <button
                type="button"
                className="w-full py-2.5 sm:py-3 px-4 bg-gray-950/50 hover:bg-gray-800/80 text-gray-200 border border-gray-800 font-bold text-xs sm:text-sm rounded-xl
                shadow-lg active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 min-h-[40px] sm:min-h-[44px]"
                onClick={() => setIsView("change")}
              >
                <Key size={16} />
                Change Password
              </button>
            </div>
          </motion.div>
        }
        {isView == "edit" && <motion.div
          key="edit-card"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-sm sm:max-w-md border border-gray-800 bg-gray-900/40 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight text-center">Edit Profile Details</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="relative group w-20 h-20 sm:w-24 sm:h-24">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-indigo-500 shadow-lg">
                  <img
                    src={avatar}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  onClick={() => fileInputRef.current.click()}
                  className="absolute inset-0 bg-black/50 rounded-full flex flex-col justify-center items-center text-white cursor-pointer opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <Camera size={18} />
                  <span className="text-[10px] mt-1 font-semibold">Change</span>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <p className="text-[11px] text-gray-500 font-medium">Click on avatar to select image</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="editName" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  id="editName"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError("");
                  }}
                  placeholder="Enter your name"
                  required
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                    focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
                />
                <User className="absolute left-3.5 text-gray-500" size={16} />
              </div>
              {nameError && <p className="text-[11px] sm:text-xs text-rose-400 mt-1 flex items-center gap-1">⚠️ {nameError}</p>}
            </div>

            <hr className="border-gray-800/60" />

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsView("details");
                  setName(userData?.name || "");
                  setAvatar(userData?.imgUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80");
                }}
                className="flex-1 py-2.5 sm:py-3 px-3 bg-gray-950/50 hover:bg-gray-800/80 text-gray-200 border border-gray-800 font-bold text-xs sm:text-sm rounded-xl
                  shadow-lg active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 sm:py-3 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl
                  shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-150 cursor-pointer flex items-center justify-center min-h-[40px] sm:min-h-[44px]"
                disabled={loading}
              >
                {loading ? <ClipLoader size={18} color="white" /> : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>}
        {isView == "change" && <ChangePassword setIsView={setIsView}/>}
      </AnimatePresence>
    </div>
  )
}

export default PersonalDetails