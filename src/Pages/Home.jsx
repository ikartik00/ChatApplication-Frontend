import React, { useContext } from 'react'
import {ChatContext} from '../context/ContextProvider'
import LandingPage from './LandingPage'
import JoinRoom from '../components/JoinRoom'

const Home = () => {
    const{isLoggedIn, loadingProfile} = useContext(ChatContext)
    if(loadingProfile){
        return <div className='text-3xl text-center'>Loading..</div>
    }
    return isLoggedIn ? <JoinRoom/>  : <LandingPage/>
}

export default Home