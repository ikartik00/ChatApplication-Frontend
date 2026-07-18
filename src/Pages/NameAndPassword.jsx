import { UserKey, Eye, EyeClosed } from 'lucide-react'
import React, { useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { motion } from 'framer-motion'

const NameAndPassword = ({ loading, handleSubmit, password, handleChange, name }) => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <motion.div className='flex w-100 gap-4  rounded-lg px-5 py-7 flex-col' initial={{ opacity: 0, scale: 0.7, y: 50 }}

            // Animate state: Screen par aate hi normal size aur perfect position me aa jayega
            animate={{ opacity: 1, scale: 1, y: 0 }}

            // Transition: Animation kitna smooth aur fast chalega
            transition={{
                duration: 0.5,
                ease: "easeOut",
                type: "spring", // Spring effect se thoda bouncy aur premium feel aata hai
                stiffness: 100
            }}>
            <div>
                <p className='text-md text-center font-semibold text-xl'>Enter the Basic Details</p>
            </div>
            <form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-full text-slate-950 placeholder-slate-400 
                    focus:outline-none focus:ring-1 focus:ring-slate-950 focus:border-slate-950
                    transition-colors duration-150 font-semibold"
                        placeholder="John Doe"
                    />
                    {/* {errors && <p className='text-red-400'>{errors.name}</p>} */}
                </div>
                <div className='w-full '>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">Create Password</label>
                    <div className='flex items-center bg-white rounded-full focus:border transition-colors duration-150 focus:border-slate-950'>
                        <UserKey className='ml-3 mr-2 text-black' />
                        <input type={showPassword?"text" : "password"}
                        name='password'
                            placeholder="**********"
                            className='outline-none w-full  px-2 pr-4 py-2 placeholder-slate-400  rounded-r-full text-slate-950 font-semibold select-none
                    transition-colors duration-150'
                            value={password}
                            onChange={handleChange}
                            required
                        />
                        {showPassword?<Eye onClick={()=>setShowPassword(!showPassword)} className='ml-3 mr-2 text-black' /> : <EyeClosed onClick={()=>setShowPassword(!showPassword)} className='ml-3 mr-2 text-black'/>}
                        
                    </div>
                </div>
                <div className='flex w-full mt-2'>
                    <button className='border bg-blue-700 w-full text-white font-bold cursor-pointer px-3 py-2 rounded-full' disabled={loading}>{loading ? <PulseLoader size={10} color="#ffffff" /> : "Submit"}</button>
                </div>
            </form>
        </motion.div>
    )
}

export default NameAndPassword