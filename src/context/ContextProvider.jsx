import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { decryptPrivateKey } from '../crypto/e2ee'

export const ChatContext = createContext(null)

const ContextProvider = ({ children }) => {
  const [roomData, setRoomData] = useState(null)
  const [currentUser, setCurrentUser] = useState("")
  const [connected, setConnected] = useState(false)
  const [userData, setUserData] = useState(null)
  const [allRooms, setAllRooms] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loadingJoin, setLoadingJoin] = useState(false)
  const [privateKey, setPrivateKey] = useState(null)
  const [pvtKeyResponse, setPvtKeyResponse] = useState(null)

  const navigate = useNavigate()

  const getProfile = async () => {
    try {
      let response = await fetch("http://localhost:8080/api/v1/profile", {
        credentials: "include"
      })
      if (response.status == 200) {
        setIsLoggedIn(true)
        response = await response.json();
        setUserData(response)
      } else {
        setIsLoggedIn(false)
        navigate("/login")
        console.log("Some Error Occured Please Login Again")
        setUserData(null)
      }
    } catch (error) {
      console.log("Please Login then try")
    }
  }

  const joinRoomAPI = async (roomId) => {
    try {
      setLoadingJoin(true)
      const response = await fetch(`http://localhost:8080/api/v1/room/${roomId}`, {
        credentials: "include"
      })
      let data = await response.json();
      if (response.status === 200) {
        toast.success("Room Joined Successfully")
        setCurrentUser(userData?.userId)
        setRoomData(data)
        setConnected(true)
        navigate("/chat")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("Some error occured while joining a room");
    } finally {
      setLoadingJoin(false)
    }
  }

  const getRooms = async () => {
    try {
      let response = await fetch("http://localhost:8080/api/v1/getAllRoom", {
        credentials: "include"
      })
      let data = await response.json();
      if (response.status == 200) {
        setAllRooms(data)
      } else {
        setAllRooms([])
      }
    } catch (error) {
      console.log("error occured");
    }
  }


  useEffect(() => {
    if (!userData) return;
    fetchEncryptedPrivateKey();   // Sirf fetch
  }, [userData]);


  const fetchEncryptedPrivateKey = async () => {
    try {
      let pvtKeyResponse = await fetch("http://localhost:8080/api/v1/privateKey/user", {
        credentials: "include"
      })
      let PvtKeyResponse = await pvtKeyResponse.json();
      if (pvtKeyResponse.ok) {
        setPvtKeyResponse(PvtKeyResponse)
        return PvtKeyResponse;
      }else{
        return null;
      }
    } catch (error) {
      console.log("Something went wrong");
      return null;
    }
  }
  const decryptPrivateKeyFnc = async (PvtKeyResponse, password) => {
    try {
      let decryptPvtKey = await decryptPrivateKey(PvtKeyResponse.privateKey, PvtKeyResponse.iv, PvtKeyResponse.salt, password);
      setPrivateKey(decryptPvtKey)
      return decryptPvtKey;
    } catch (error) {
      toast.error("Invalid Password")
    }
  }

  useEffect(() => {
    getProfile();
    getRooms();
  }, [])

  return (
    <ChatContext.Provider value={{ roomData, setRoomData, currentUser, setCurrentUser, connected, setConnected, getProfile, userData, setUserData, getRooms, allRooms, isLoggedIn, setIsLoggedIn, joinRoomAPI, privateKey, setPrivateKey, fetchEncryptedPrivateKey, decryptPrivateKeyFnc, pvtKeyResponse, setPvtKeyResponse }}>
      {children}
    </ChatContext.Provider>
  )
}

export default ContextProvider