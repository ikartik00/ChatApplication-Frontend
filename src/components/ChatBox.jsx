import React, { useContext, useEffect, useRef, useState } from 'react'
import { SendHorizontal, Paperclip, LogOut, ShieldCheck, Image, X } from 'lucide-react';
import { ChatContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import toast from 'react-hot-toast';
import { ClipLoader, PulseLoader } from 'react-spinners';
import { importPublicKey } from '../crypto/KeyManager'
import { decryptAESKey, decryptMessage, encryptAESKeyForMember, encryptMessage, generateAESKey } from '../crypto/e2ee';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBox = () => {
  const { roomData, setRoomData, currentUser, setCurrentUser, connected, setConnected, userData, privateKey } = useContext(ChatContext)
  const navigate = useNavigate();
  const [stompClient, setStompClient] = useState(null)
  const [input, setInput] = useState("")
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const imageInputRef = useRef()
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isimageModalOpen, setIsImageModalOpen] = useState(false)
  const [imageForOpen, setImageForOpen] = useState("")
  const [typingUsers, setTypingUsers] = useState([])
  const typingTimeoutRef = useRef()
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!connected || !privateKey) {
      navigate("/")
    }
  }, [currentUser, connected, roomData])

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  useEffect(() => {
    if (!connected) return;

    const connectWebSocket = () => {
      const sock = new SockJS(`${API_URL}/api/v1/chat`)
      const client = Stomp.over(sock)
      client.debug = () => {}; // Extra raw logs hiding console cleanup
      
      client.connect({}, () => {
        setStompClient(client)
        toast.success("Secure connection established")
        
        client.subscribe(`/user/queue/room/${roomData?.roomId}`, async (message) => {
          const newMessage = JSON.parse(message.body)
          let aesKey = await decryptAESKey(newMessage.myEncryptedKey, privateKey);
          let content = await decryptMessage(newMessage.content, newMessage.iv, aesKey);
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
          console.log("WebSocket Disconnected");
        });
      }
    }
  }, [roomData])

  const sendMessage = async () => {
    if (input.trim() === "" && !imageUrl) return;
    
    sendTypingEvent(false)
    clearTimeout(typingTimeoutRef.current)
    
    if (stompClient && connected) {
      const aesKey = await generateAESKey();
      const { ciphertext, iv } = await encryptMessage(input, aesKey);
      const encryptedKeys = {};

      try {
        let response = await fetch(`${API_URL}/api/v1/keys/${roomData?.roomId}`, {
          method: "GET",
          credentials: "include"
        })
        if (response.ok) {
          let membersAndKeys = await response.json();
          for (const member of membersAndKeys) {
            const pubKey = await importPublicKey(member.publicKey);
            encryptedKeys[member.userId] = await encryptAESKeyForMember(aesKey, pubKey);
          }
        }
      } catch (error) {
        console.error("Key exchange failed", error);
      }

      const message = {
        roomId: roomData?.roomId,
        content: ciphertext || null,
        iv: iv,
        encryptedKeys: encryptedKeys,
        imageUrl: imageUrl || null,
        type: imageUrl ? "IMAGE" : "TEXT"
      }

      stompClient.send(`/app/sendMessage/${roomData?.roomId}`, {}, JSON.stringify(message))
      setInput("")
      setImageUrl("")
    } else {
      toast.error("Unable to send message")
    }
  }

  useEffect(() => {
    if (!connected) return;
    
    const loadMessages = async () => {
      try {
        let response = await fetch(`${API_URL}/api/v1/all-messages/${roomData?.roomId}`, {
          credentials: "include"
        })
        let data = await response.json();
        if (response.ok) {
          const decryptedMessages = await Promise.all(
            data.map(async (message) => {
              try {
                const aesKey = await decryptAESKey(message.myEncryptedKey, privateKey);
                const content = await decryptMessage(message.content, message.iv, aesKey);
                return { ...message, content };
              } catch (e) {
                return { ...message, content: "🔒 End-to-End Decryption failed" };
              }
            })
          );
          setMessages(decryptedMessages)
        }
      } catch (error) {
        toast.error("Error loading chat history")
      }
    }
    loadMessages()
  }, [])

  const leaveRoom = () => {
    if(stompClient) stompClient.disconnect()
    setConnected(false)
    setRoomData(null)
    setCurrentUser(null)
    navigate("/")
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  const handleImageChange = async (e) => {
    let file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image")) {
      toast.error("Please select an image file only");
      return;
    }
    let formData = new FormData();
    formData.append("file", file)
    try {
      setUploading(true)
      let response = await fetch(`${API_URL}/api/v1/uploadImage`, {
        method: "POST",
        credentials: "include",
        body: formData
      })
      let data = await response.json();
      if (response.status === 200) {
        toast.success("Image attached successfully")
        setImageUrl(data?.imgUrl)
      }
    } catch (error) {
      toast.error("Image upload failed")
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
    <div className="h-[100dvh] w-full bg-[#090d16] text-gray-100 flex flex-col overflow-hidden font-sans relative">
      
      {/* 🔮 TOP HEADER */}
      <header className="h-16 flex-shrink-0 border-b border-gray-800/80 bg-gray-900/60 backdrop-blur-xl px-4 sm:px-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-2 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-xl hidden sm:block">
            <ShieldCheck size={18} />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-white truncate flex items-center gap-1">
              <span className="text-gray-500 font-mono">#</span> {roomData?.roomId}
            </h1>
            <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              E2EE Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <span className="text-xs text-gray-500 block">Logged in as</span>
            <span className="text-sm font-bold text-gray-200">{userData?.name}</span>
          </div>
          <button 
            className="px-3 py-1.5 rounded-xl bg-rose-600/10 border border-rose-500/20 text-rose-400 text-xs sm:text-sm font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1.5" 
            onClick={leaveRoom}
          >
            <LogOut size={14} />
            Leave Room
          </button>
        </div>
      </header>

      {/* 🎯 MESSAGES VIEWPORT */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 space-y-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-transparent">
        {messages.map((message, index) => {
          const isMe = message?.senderUserId === currentUser;
          return (
            <div key={index} className={`w-full flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-sm sm:max-w-md items-end ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                
                {/* User Avatar Circle */}
                <div className="w-8 h-8 rounded-full bg-gray-950 border border-gray-800 flex shrink-0 justify-center items-center font-bold text-xs text-indigo-400 overflow-hidden shadow-md">
                  {message.senderImageUrl ? (
                    <img src={message.senderImageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    message?.senderName?.charAt(0).toUpperCase()
                  )}
                </div>

                {/* Message Bubble container */}
                <div className="flex flex-col space-y-1">
                  {!isMe && (
                    <span className="text-[11px] text-indigo-400 font-bold ml-1">
                      {message.senderName || "Deleted Account"}
                    </span>
                  )}
                  
                  <div className={`px-4 py-2.5 rounded-2xl border text-sm font-medium shadow-lg break-words whitespace-pre-wrap leading-relaxed ${
                    isMe 
                      ? "bg-indigo-600 border-indigo-500 text-white rounded-br-none" 
                      : "bg-gray-900/60 border-gray-800/80 text-gray-200 rounded-bl-none"
                  }`}>
                    {message.type === "IMAGE" ? (
                      <div className="space-y-2">
                        <img 
                          src={message.imageUrl} 
                          alt="chat-upload" 
                          onClick={() => { setImageForOpen(message.imageUrl); setIsImageModalOpen(true) }}
                          className="max-w-full max-h-48 object-cover rounded-xl border border-gray-800/60 cursor-zoom-in hover:brightness-95 transition"
                        />
                        {message.content && <p className="break-words pt-1 whitespace-pre-wrap max-w-full">{message.content}</p>}
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                  
                  <span className={`text-[10px] text-gray-500 px-1 font-medium ${isMe ? "text-right" : "text-left"}`}>
                    {formatTime(message.sentAt)}
                  </span>
                </div>

              </div>
            </div>
          );
        })}

        {/* Dynamic Typing Bar */}
        {typingUsers.length > 0 && typingUsers.map((user, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-gray-400 italic bg-gray-950/30 border border-gray-900 w-fit px-3 py-1.5 rounded-xl ml-11">
            <p>{user.name} is typing</p>
            <PulseLoader size={4} color="#6366f1" speedMultiplier={0.7} />
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </main>

      {/* 💾 INTERACTIVE BOTTOM UTILITY FOOTER */}
      <footer className="p-4 bg-transparent border-t border-gray-800/50 flex-shrink-0 relative z-20">
        <div className="max-w-5xl mx-auto relative">
          
          {/* Attached Image Preview bar inside footer padding area */}
          <AnimatePresence>
            {imageUrl && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full mb-3 left-0 bg-gray-900 border border-gray-800 p-2 rounded-xl flex items-center gap-3 shadow-2xl z-30 backdrop-blur-xl"
              >
                <div className="relative w-12 h-12">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover rounded-lg border border-gray-800" />
                  <button 
                    onClick={() => setImageUrl("")}
                    className="absolute -top-1.5 -right-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold cursor-pointer transition shadow-lg border-none"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-left pr-2">
                  <span className="text-[10px] text-gray-500 block uppercase tracking-wider font-bold">Attachment</span>
                  <span className="text-xs text-indigo-400 font-semibold">Image file ready</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Input Control Bar row */}
          <div className="w-full bg-gray-950/50 border border-gray-800 focus-within:border-indigo-500/50 rounded-2xl flex items-center px-2 py-1.5 transition shadow-inner">
            
            <input type="file" ref={imageInputRef} accept="image/*" hidden onChange={handleImageChange} />
            <button 
              type="button"
              onClick={() => imageInputRef.current.click()}
              disabled={uploading}
              className="p-2.5 text-gray-400 hover:text-indigo-400 rounded-xl transition cursor-pointer bg-transparent border-none flex-shrink-0"
            >
              {uploading ? <ClipLoader size={16} color="#6366f1" /> : <Paperclip size={18} />}
            </button>

            <input 
              type="text" 
              placeholder="Type a secure message..." 
              value={input}
              onChange={handleInput}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm font-medium px-2 py-1.5"
            />

            <button 
              type="button"
              onClick={sendMessage}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl cursor-pointer transition shadow-lg shadow-indigo-600/20 border-none flex-shrink-0 ml-1"
            >
              <SendHorizontal size={16} />
            </button>
          </div>

        </div>
      </footer>

      {/* 🌟 FULL SCREEN LARGE IMAGE MODAL */}
      <AnimatePresence>
        {isimageModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center延 z-50 p-4 cursor-zoom-out"
            onClick={() => setIsImageModalOpen(false)}
          >
            <div className="relative max-w-4xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
              <button 
                className="absolute -top-12 right-0 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white p-2 rounded-xl cursor-pointer transition"
                onClick={() => setIsImageModalOpen(false)}
              >
                <X size={18} />
              </button>
              <img 
                src={imageForOpen} 
                alt="Enlarged preview" 
                className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl object-contain border border-gray-800"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default ChatBox