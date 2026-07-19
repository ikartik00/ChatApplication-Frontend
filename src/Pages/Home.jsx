import React, { useContext } from 'react'
import {ChatContext} from '../context/ContextProvider'
import LandingPage from './LandingPage'
import JoinRoom from '../components/JoinRoom'
import Navbar from '../components/Navbar'

const Home = () => {
    const{isLoggedIn, loadingProfile} = useContext(ChatContext)
    if(loadingProfile){
        return <div className='text-3xl text-center'>Loading..</div>
    }
    return isLoggedIn ? <><Navbar/><JoinRoom/></>  : <LandingPage/>
}

export default Home