import { ChevronRight } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import LogoutModal from './LogoutModal'
import toast from 'react-hot-toast'
import { ChatContext } from '../context/ContextProvider'

const Profile = () => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const navigate = useNavigate()
    const{setIsLoggedIn, setUserData} = useContext(ChatContext)

    const handleDelete =async()=>{
        try{
            setDeleteLoading(true)
            let response = await fetch("http://localhost:8080/api/v1/deleteAccount/user", {
                method : "DELETE",
                credentials : "include"
            });
            if(response.status == 204){
                toast.success("Account Permanently Deleted Successfully");
                navigate("/login")
                setIsLoggedIn(false)
                setUserData(null)
            }
        }catch(error){
            console.log("Something Went Wrong");
        }finally{
            setDeleteLoading(false)
        }
    }

    return (
        <div className='flex h-[calc(100vh-88px)] '>
            <div className='w-1/5 h-full shadow-md bg-[#131a26]'>
                <div className='flex gap-2 flex-col px-2 py-3'>
                    <NavLink end to={"/profile"} className={({ isActive }) => `text-lg font-bold px-3 py-2 rounded-full flex justify-between items-center shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white ${isActive ? "bg-green-500" : "bg-[#0b0f19] "}`}><span>Personal Details</span><span><ChevronRight /></span></NavLink>
                    <NavLink end to={"/profile/all-members"} className={({ isActive }) => `text-lg font-bold px-3 py-2 rounded-full flex justify-between items-center shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white ${isActive ? "bg-green-500  " : "bg-[#0b0f19]"}`}><span>All Members</span><span><ChevronRight /></span></NavLink>
                    <NavLink end to={"/profile/my-rooms"} className={({ isActive }) => `text-lg font-bold px-3 py-2 rounded-full flex justify-between items-center text-white shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] ${isActive ? "bg-green-500 " : "bg-[#0b0f19] "}`}><span>My Room</span> <span><ChevronRight /></span></NavLink>

                    <p className='text-lg font-bold px-3 py-2 rounded-full flex justify-between items-center bg-[#0b0f19] text-white shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] cursor-pointer' onClick={()=>setDeleteModalOpen(true)}>
                        <span>Delete Account</span>
                        <span><ChevronRight /></span>
                    </p>
                </div>
            </div>
            <div className='w-4/5 h-full'>
                <Outlet />
            </div>
            {/* Logout Modal */}
            {deleteModalOpen && <LogoutModal mainText={"Want  to Delete Account"} descText={"Are you Sure You Want to Delete Your Account"} cancelText={"Cancel"} confirmText={"Delete Account"} isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} handleLogoutAndDelete={handleDelete} loading={deleteLoading} />}
        </div>
    )
}

export default Profile