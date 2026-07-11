import React, { useContext } from 'react'
import { Routes, Route } from 'react-router'
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

const App = () => {
  const {connected, isLoggedIn} = useContext(ChatContext)
  return (
    <div>
      <Toaster/>
      {!connected && isLoggedIn && <Navbar/>}
      <Routes>
        <Route path='/' element = {<JoinRoom/>}/>
        <Route path='/chat' element={<ChatBox/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/register' element={<Register/>}/>
         <Route path='/add-member' element={<AddMember/>}/>
         <Route path='/profile' element={<Profile/>}>
            <Route index element={<PersonalDetails/>}/>
            <Route path='all-members' element={<AllMembers/>}/>
            <Route path='my-rooms' element={<MyRooms/>}/>
            <Route path='change-password' element={<ChangePassword/>}/>
         </Route>
         <Route path='/check-debounce' element={<CheckDebounce/>}/>
      </Routes>
    </div>
  )
}

export default App