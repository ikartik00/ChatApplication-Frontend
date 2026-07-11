import React, { useContext, useState, useRef, useEffect } from 'react'
import { ChatContext } from '../context/ContextProvider'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'

const PersonalDetails = () => {
  const { userData, setUserData, getProfile } = useContext(ChatContext)
  const navigate = useNavigate()
  const [isEdit, setIsEdit] = useState(false)
  const [name, setName] = useState(userData?.name);
  const [avatar, setAvatar] = useState(userData?.imgUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80");
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameError, setNameError] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Agar backend API me FormData bhejna ho
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl); // Instant UI preview ke liye
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() == "") {
      setNameError("Name is Required")
      return;
    }
    const formData = new FormData();
    formData.append("name", name)
    formData.append("image", selectedFile)
    try {
      setLoading(true)
      let response = await fetch("http://localhost:8080/api/v1/upload", {
        method: "POST",
        credentials: "include",
        body: formData
      })
      if (response.ok) {
        response = await response.json();
        toast.success("Details UpdatedSuccessfully")
        setUserData(response)
        setIsEdit(false)
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
    <div className="h-full flex justify-center items-center bg-[#0b0f19]">
      {!isEdit ? <div className="bg-[#131a26] shadow-xl rounded-2xl px-8 py-2 w-100">
        <div className="flex flex-col items-center">
          <img
            src={userData?.imgUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt=""
            className="h-28 w-28 rounded-full border-4 border-amber-400 object-cover"
          />

          <h1 className="text-2xl font-bold mt-3 text-white">
            {userData?.name}
          </h1>

          <p className="text-gray-500">
            {userData?.email}
          </p>
        </div>

        <div className="mt-2 space-y-3">

          <div className="bg-gray-100 p-3 rounded-lg">
            <span className="font-semibold">User ID:</span>
            <p>{userData?.userId}</p>
          </div>

          <div className="bg-gray-100 p-3 rounded-lg">
            <span className="font-semibold">Joined:</span>
            <p>
              {new Date(userData?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" onClick={() => setIsEdit(true)}>
            Edit Profile
          </button>
          <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer" onClick={() => navigate("/profile/change-password")}>
            Change Password
          </button>
        </div>
      </div> : <div className="bg-[#131a26] w-full max-w-md mx-auto rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="font-bold text-white mb-6 text-center text-3xl">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* --- Image Upload Field --- */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative group w-24 h-24">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-indigo-500 shadow-sm">
                <img
                  src={avatar}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Clickable Overlay */}
              <div
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 bg-black/40 rounded-full flex flex-col justify-center items-center text-white cursor-pointer opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
                <span className="text-[10px] mt-1 font-medium">Change</span>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <p className="text-xs text-gray-400">Click on photo to upload</p>
          </div>

          {/* --- Name Input Field --- */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-white"
            />
          </div>

          <hr className="border-gray-100" />

          {/* --- Action Buttons --- */}
          <div className="flex space-x-3">
            <button
              type="button"
              // onClick={onCancel} // Tumhare main page par wapas le jaane ke liye
              className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition" onClick={() => setIsEdit(false)}
            >

              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-100 transition"
            >
              {loading ? <ClipLoader /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>}
    </div>
  )
}

export default PersonalDetails