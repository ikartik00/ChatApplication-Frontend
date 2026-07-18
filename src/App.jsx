import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import JoinRoom from './components/JoinRoom'
import ChatBox from './components/ChatBox'
import { Toaster } from 'react-hot-toast'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AddMember from './Pages/AddMember'
import Navbar from './components/Navbar'
import { ChatContext } from './context/ContextProvider'
import Profile from './Pages/Profile'
import PersonalDetails from './ProfilePages/PersonalDetails'
import AllMembers from './ProfilePages/AllMembers'
import MyRooms from './ProfilePages/MyRooms'
import EditProfile from './Pages/EditProfile'
import CheckDebounce from './Pages/CheckDebounce'
import ChangePassword from './Pages/ChangePassword'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute'
import PageNotFound from './Pages/PageNotFound'
import LandingPage from './Pages/LandingPage'
import Home from './Pages/Home'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsConditions from './components/TermsConditions'
import PasswordResetWarning from './Pages/PasswordResetWarning'

const App = () => {
  const { connected, isLoggedIn } = useContext(ChatContext)
  const location = useLocation();

  const noNavbarRoutes = ['/login', '/register', '/forgot-password', '/reset-password']
  return (
    <div>
      <Toaster />
      {!connected && isLoggedIn && !noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/chat' element={<ChatBox />} />
          <Route path='/add-member' element={<AddMember />} />
          <Route path='/profile' element={<Profile />}>
            <Route index element={<PersonalDetails />} />
            <Route path='all-members' element={<AllMembers />} />
            <Route path='my-rooms' element={<MyRooms />} />
            <Route path='change-password' element={<ChangePassword />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/check-debounce' element={<CheckDebounce />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
         <Route path='/terms' element={<TermsConditions />} />
         <Route path='/reset' element={<PasswordResetWarning />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App