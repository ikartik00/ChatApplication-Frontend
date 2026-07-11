import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ContextProvider'
import { PulseLoader } from 'react-spinners'
import toast from 'react-hot-toast'

const AddMember = () => {
    const [users, setusers] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [selectedRoom, setSelectedRoom] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(false)
    const{allRooms, getRooms} = useContext(ChatContext)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (searchValue?.trim() == "") {
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
        if (debouncedSearch?.trim() == "") {
            setusers([])
            return;
        }
        const searchByEmail = async () => {
            let response = await fetch(`http://localhost:8080/api/v1/search?email=${debouncedSearch}`, {
                credentials: "include"
            })
            let data = await response.json();
            if (response.status == 200) {
                setusers(data)
                setIsOpen(true)
            }
        }
        if(!selected){
            searchByEmail();
        }
    }, [debouncedSearch])

    useEffect(()=>{
        getRooms();
    }, [])

    const handleSearch = (e) => {
        setIsOpen(false)
        setSelected(true)
        setSearchValue(e.target.innerText)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let error = {};
        if(searchValue.trim().length < 2 || !searchValue.includes(".")){
            error.email = "Please Enter valid email"
        }
        if(selectedRoom == ""){
            error.room = "Please Select the Room"
        }
        setErrors(error)
        if(Object.keys(error).length > 0){
            return;
        }

         try{
            setLoading(true)
            let response = await fetch("http://localhost:8080/api/v1/add-member", {
                method : "POST",
                credentials : "include",
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email : searchValue,
                    roomId : selectedRoom
                })
            })
            let data = await response.json();
            if(response.status == 201){
                toast.success("Member Added Successfully");
                setSearchValue("")
                setSelectedRoom("")
                console.log(data);
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error("Some thing went wrong");
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className='bg-slate-950 min-h-[calc(100vh-87px)] flex justify-center items-center '>
            <form className='flex gap-3 flex-col rounded-3xl px-7 py-8 w-120 bg-slate-900 text-white' onSubmit={handleSubmit}>
                <h1 className='text-center text-3xl font-bold text-white mb-4'>Add Member</h1>
                <div className='flex flex-col relative'>
                    <div className='flex gap-1 flex-col'>
                        <label htmlFor="" className='text-lg font-bold text-slate-500 uppercase'>Search Member</label>
                        <input type="text" placeholder='search' className=' rounded-xl px-4 py-2  font-semibold outline-none bg-slate-950 border border-slate-200' value={searchValue} onChange={(e) => {
                            setSearchValue(e.target.value)
                            setSelected(false)
                        }} />
                        {errors && <p className='text-red-400'>{errors.email}</p>}
                    </div>
                    {isOpen && <div className='w-full h-40 bg-slate-950 text-white absolute top-20 overflow-y-auto emailScroll'>
                        {users.length > 0 ? users.map((user, idx) => (
                            <p key={idx} className='text-lg bg-emerald-800 px-2 py-1 mb-1  cursor-pointer' onClick={handleSearch}>{user.email}</p>
                        )) : <p className='text-red-600 font-bold text-xl text-center'>No Users Found</p>}
                    </div>}
                </div>

                <div className='flex flex-col gap-1 '>
                    <label className='text-lg font-bold uppercase text-slate-500'>Select Room</label>
                    <select className='px-4 py-2 rounded-xl font-semibold border border-slate-200 bg-slate-950' onChange={(e)=>setSelectedRoom(e.target.value)} value={selectedRoom}>
                         <option value="">Select Room</option>
                        {allRooms.map((room, idx)=>(
                            <option key={idx}>{room.roomId}</option>
                        ))}
                    </select>
                    {errors && <p className='text-red-400'>{errors.room}</p>}
                </div>
                <button className='bg-emerald-800 text-white font-semibold px-3 py-2 rounded-full text-lg cursor-pointer '>{loading?<PulseLoader color='white' size={17}/> : "Add Member"}</button>
            </form>
        </div>
    )
}

export default AddMember