import React, { useContext } from 'react'
import { ChatContext } from '../context/ContextProvider';
import { Navigate, Outlet } from 'react-router';

const PublicRoute = () => {
    const { isLoggedIn, loadingProfile } = useContext(ChatContext);
    if (loadingProfile) {
        return <div className='text-4xl text-center mt-5'>Loading......</div>
    }
    return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />
}

export default PublicRoute