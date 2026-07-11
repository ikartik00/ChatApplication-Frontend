import React, { useContext, useEffect, useRef, useState } from 'react'
import paper from '../assets/paper (1).png'
import { SendHorizontal } from 'lucide-react';
import { Paperclip } from 'lucide-react';
import { ChatContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';
import { importPublicKey, loadPrivateKey } from '../crypto/KeyManager'
import { decryptAESKey, decryptMessage, encryptAESKeyForMember, encryptMessage, generateAESKey } from '../crypto/e2ee';

const ChatBox = () => {
  const { roomData, setRoomData, currentUser, setCurrentUser, connected, setConnected, userData, setUserData, privateKey } = useContext(ChatContext)
  const navigate = useNavigate();
  const [stompClient, setStompClient] = useState(null)
  const [input, setInput] = useState("")
  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const imageInputRef = useRef()
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isimageModalOpen, setIsImageModalOpen] = useState(false)
  const [imageForOpen, setImageForOpen] = useState("")
  const [typingUsers, setTypingUsers] = useState([])
  const typingTimeoutRef = useRef()

  useEffect(() => {
    if (!connected || !privateKey) {
      navigate("/")
    }
  }, [currentUser, connected, roomData])

  const scrollToBottom = () => {
    chatBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);


  useEffect(() => {
    if (!connected) {
      return;
    }
    const connectWebSocket = () => {
      const sock = new SockJS("http://localhost:8080/api/v1/chat")
      //client -> hamara ek agent ha jo server tak jaata ha
      //Stomp.over(sock): Tumne agent ko ek cycle (SockJS ka rasta) de di aur bola—"Isi raste se server tak jaana hai." Ab tumhara agent (client) taiyar hai. 
      const client = Stomp.over(sock)
      //{} iska matlab ha headers ko bhjna jaise security ke liye bearer token
      //clinet.connect -> yaha server hello bolta ha ki bhai connect ho gaya hai or jaise hi connect ho jata ha callback chalta hai
      //client.connect(...):-> Tumne agent ko bola—"Jaao, pehle server ke paas jaakar apna naam darj karwao aur connection pakka karo."
      client.connect({}, () => {
        setStompClient(client)
        toast.success("connected")
        //client.subscribe(...): Tumne agent ko order diya—"Is chat room ke baahar khade ho jaao. Jaise hi koi naya message aaye, turant pakad ke mujhe laakar do!"
        client.subscribe(`/user/queue/room/${roomData && roomData.roomId}`, async (message) => {
          const newMessage = JSON.parse(message.body)
          let aesKey = await decryptAESKey(newMessage.myEncryptedKey, privateKey && privateKey);
          let content = await decryptMessage(newMessage.content, newMessage.iv, aesKey);
          console.log("Decrypted:", content)
          setMessages((prev) => [...prev, { ...newMessage, content: content }]);
        })

        client.subscribe(`/topic/room/${roomData?.roomId}/typing`, (message) => {
          const data = JSON.parse(message.body)
          if (data.userId === currentUser) return;
          if (data.isTyping) {
            setTypingUsers((prev) => {
              let alreadyExists = prev.find(u => u.userId === data.userId);
              if (alreadyExists) return prev;
              return [...prev, { userId: data?.userId, name: data?.name }]
            })
          } else {
            setTypingUsers((prev) => prev.filter(user => user.userId !== data.userId))
          }
        })
      })
      return client;
    }
    let activeClient = connectWebSocket();
    return () => {
      if (activeClient && activeClient.connected) {
        activeClient.disconnect(() => {
          toast.error("Discnonnected");
          console.log("WebSocket Disconnected Successfully!");
        });
      }
    }
  }, [roomData])

  const sendMessage = async () => {
    if (input.trim() == "" && !imageUrl) {
      return;
    }
    sendTypingEvent(false)
    clearTimeout(typingTimeoutRef.current)
    if (stompClient && connected) {
      const aesKey = await generateAESKey();
      const { ciphertext, iv } = await encryptMessage(input, aesKey);
      const encryptedKeys = {};

      try {
        let response = await fetch(`http://localhost:8080/api/v1/keys/${roomData?.roomId}`, {
          method: "GET",
          credentials: "include"
        })
        if (response.ok) {
          let membersAndKeys = await response.json();
          console.log(membersAndKeys);

          for (const member of membersAndKeys) {
            const pubKey = await importPublicKey(member.publicKey);
            encryptedKeys[member.userId] = await encryptAESKeyForMember(aesKey, pubKey);
            console.log("Encrypted keys bane:", Object.keys(encryptedKeys));
          }
        } else {
          console.log('Something went wrong');
        }
      } catch (error) {
        console.log("Something");
      }

      const message = {
        roomId: roomData?.roomId,
        content: ciphertext || null,
        iv: iv,
        encryptedKeys: encryptedKeys,
        imageUrl: imageUrl || null,
        type: imageUrl ? "IMAGE" : "TEXT"
      }
      if (imageUrl) {
        message.imageUrl = imageUrl
      }
      stompClient.send(`/app/sendMessage/${roomData?.roomId}`, {}, JSON.stringify(message))
      setInput("")
      setImageUrl("")
    } else {
      toast.error("Unable to send message")
    }
  }

  useEffect(() => {
    if (!connected) {
      return;
    }
    const loadMessages = async () => {
      try {
        let response = await fetch(`http://localhost:8080/api/v1/all-messages/${roomData && roomData.roomId}`, {
          credentials: "include"
        })
        let data = await response.json();
        if (response.ok) {
          const decryptedMessages = await Promise.all(
            data.map(async (message) => {
              try {
                const aesKey = await decryptAESKey(message.myEncryptedKey, privateKey&&privateKey);
                const content = await decryptMessage(message.content, message.iv, aesKey);
                return { ...message, content };
              } catch (e) {
                console.error("Decrypt failed:", e);
                return { ...message, content: "🔒 Decrypt failed" };
              }
            })
          );
          setMessages(decryptedMessages)
        } else {
          console.log(data.message);
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Some error occured")
      }
    }
    loadMessages()
  }, [])

  const leaveRoom = () => {
    stompClient.disconnect()
    setConnected(false)
    setRoomData(null)
    setCurrentUser(null)
    navigate("/")
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleImageChange = async (e) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image")) {
      toast.error("Please select the image file only");
      return;
    }
    let formData = new FormData();
    formData.append("file", file)
    try {
      setUploading(true)
      let response = await fetch("http://localhost:8080/api/v1/uploadImage", {
        method: "POST",
        credentials: "include",
        body: formData
      })
      let data = await response.json();
      if (response.status == 200) {
        toast.success("Image Attached Click on send button or press Enter")
        console.log(data)
        setImageUrl(data?.imgUrl)
      }
    } catch (error) {
      toast.error("Some error occured while uploading the file")
    } finally {
      setUploading(false)
    }
  }

  const sendTypingEvent = (isTyping) => {
    if (stompClient && connected) {
      stompClient.send(`/app/typing/${roomData?.roomId}`, {}, JSON.stringify({ isTyping: isTyping }))
    }
  }

  const handleInput = (e) => {
    setInput(e.target.value)
    sendTypingEvent(true)
    clearTimeout(typingTimeoutRef.current)
    typingTimeoutRef.current = setTimeout(() => {
      sendTypingEvent(false)
    }, 2000);
  }

  return (
    <div className='dark:bg-black h-screen relative'>
      <header className="flex justify-between fixed top-0 w-full items-center text-white px-4 py-3 border dark:border-gray-700 bg-emerald-800">
        <div className=' font-bold'>
          <h1 className='text-lg'>Room : <span>{roomData && roomData.roomId}</span></h1>
        </div>
        <div className=' font-bold'>
          <h1 className='text-lg'>User : <span className='text-lg'>{userData?.name}</span></h1>
        </div>
        <div>
          <button className="bg-red-500 text-white font-semibold px-3 py-1 rounded-full cursor-pointer" onClick={leaveRoom}>Leave Room</button>
        </div>
      </header>
      <main className='h-screen py-16 text-white font-semibold '>
        <div className='w-4/5 mx-auto bg-slate-900 px-3 pt-1 pb-2 h-full overflow-auto '>
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message?.
              senderUserId === currentUser ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-2 ${message?.
                senderUserId === currentUser ? "bg-blue-600" : "bg-white"} mt-2 px-3 py-2 rounded-md max-w-xs`}>
                <div className='w-10 h-10  flex shrink-0 justify-center items-center bg-orange-300 rounded-[50%] overflow-hidden font-bold text-lg'>{message.senderImageUrl ? <img src={message.senderImageUrl} alt="" className='w-full h-full object-cover' /> : message?.senderName?.charAt(0).toUpperCase()}</div>
                <div className='flex flex-col'>
                  <p className='text-sm text-amber-300 font-bold '>{message.senderName ? message.senderName : "Deleted Account"}</p>
                  {message.type == "IMAGE" ?
                    <div>
                      <img src={message.imageUrl} alt='image' onClick={() => { setImageForOpen(message.imageUrl); setIsImageModalOpen(true) }} />
                      {message.content && <p className={`break-all ${message.sender === currentUser ? "text-white" : "text-black"}`}>{message.content}</p>}
                    </div>
                    : <p className={`break-all ${message.sender === currentUser ? "text-white" : "text-black"}`}>{message.content}</p>
                  }
                  <p className="text-zinc-700 text-sm">send at : {formatTime(message.sentAt)}</p>
                </div>
              </div>
            </div>
          ))}
          {typingUsers.length > 0 && typingUsers.map((user, idx) => (
            <div key={idx} className="px-2 py-3 text-gray-400 text-sm italic flex items-center gap-1 justify-center w-fit text-center">
              <p>{user.name} is typing </p>
              <span className='text-center'><PulseLoader size={11} color='#f2f2f2' /></span>
            </div>
          ))
          }
          <div ref={chatBoxRef}></div>
        </div>
      </main>
      {imageUrl && (
        <div className="fixed bottom-14 left-[10%] bg-slate-800 border border-gray-700 p-2 rounded-lg flex items-center gap-3 shadow-2xl z-20 animate-bounce-short">
          <div className="relative">
            {/* Choti si Photo */}
            <img
              src={imageUrl}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-md border border-gray-600"
            />

            {/* Cancel (X) Button: Agar user ka mood badal gaya to remove karne ke liye */}
            <button
              onClick={() => setImageUrl("")} // Ispe click karte hi state khali, preview gayab!
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold cursor-pointer transition shadow"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Ready to send</span>
            <span className="text-xs text-emerald-400 font-semibold">Image attached ✅</span>
          </div>
        </div>
      )}
      <footer className='flex justify-between fixed bg-emerald-800 px-3 py-2 items-center bottom-0 w-full'>
        <div className='w-[90%]'>
          <input type="text" placeholder='Type a message' className='border dark:border-gray-600 border-white text-black outline-none rounded-full px-2 py-1 w-full bg-white'
            value={input}
            onChange={e => handleInput(e)}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                sendMessage()
              }
            }}
          />
        </div>
        <input type='file' ref={imageInputRef} accept='image/**' hidden onChange={handleImageChange} />
        <div className='w-[10%] flex justify-center items-center gap-3'>
          <button onClick={() => imageInputRef.current.click()} className='p-2 bg-purple-800 dark:text-black text-white  font-bold rounded-[50%] cursor-pointer'> <Paperclip color='white' className='font-bold' /> </button>
          <button className='p-2 bg-white dark:text-black text-white font-bold rounded-[50%] cursor-pointer' onClick={sendMessage}> <SendHorizontal color='black' className='font-bold' /> </button>
        </div>
      </footer>
      {/* 🌟 FULL SCREEN IMAGE MODAL 🌟 */}
      {isimageModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in cursor-zoom-out"
          onClick={() => setIsImageModalOpen(false)} // Kaale parde par kahi bhi click karo to modal band
        >
          <div className="relative max-w-4xl max-h-[85vh] p-2" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 bg-gray-800/80 hover:bg-gray-700 text-white font-bold p-2 rounded-full cursor-pointer transition"
              onClick={() => setIsImageModalOpen(false)}
            >
              ✕
            </button>

            {/* Badi Image */}
            <img
              src={imageForOpen}
              alt="Enlarged view"
              className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain border border-gray-700"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBox