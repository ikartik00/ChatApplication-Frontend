import React, { useState, useRef, useContext, useEffect } from "react";
import { ChatContext } from "../context/ContextProvider";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { Camera } from "lucide-react";

const EditProfile = () => {
    const { userData, setUserData, getProfile } = useContext(ChatContext)
    const [name, setName] = useState(userData?.name);
    const [avatar, setAvatar] = useState(userData?.imgUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80");
    const [selectedFile, setSelectedFile] = useState(null); 
    const navigate = useNavigate()
    const [nameError, setNameError] = useState("")
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        getProfile();
    }, [])

    useEffect(() => {
        if (userData) {
            setName(userData.name || "");
            if (userData.imgUrl) {
                setAvatar(userData.imgUrl);
            }
        }
    }, [userData]);

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
            } else {
                toast.error("Details not updated")
            }
        } catch (error) {
            console.log("Eror");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="h-full w-full flex justify-center items-center p-2 sm:p-4 text-gray-100">
            {/* Main Form Box */}
            <div className="w-full max-w-sm sm:max-w-md border border-gray-800 bg-gray-900/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
                
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">Edit Profile</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* --- Image Upload Field --- */}
                    <div className="flex flex-col items-center space-y-3">
                        <div className="relative group w-20 h-20 sm:w-24 sm:h-24">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-indigo-500 shadow-lg">
                                <img
                                    src={avatar}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Clickable Overlay */}
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
                        <p className="text-xs text-gray-500 font-medium">Click on photo to upload</p>
                    </div>

                    {/* --- Name Input Field --- */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="fullName" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if(nameError) setNameError("");
                            }}
                            placeholder="Enter your name"
                            required
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-950/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 
                            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base font-medium shadow-inner"
                        />
                        {nameError && <p className="text-[11px] sm:text-xs text-rose-400 mt-1 flex items-center gap-1">⚠️ {nameError}</p>}
                    </div>

                    <hr className="border-gray-800/60" />

                    {/* --- Action Buttons --- */}
                    <div className="flex space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
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
            </div>
        </div>
    );
};

export default EditProfile;