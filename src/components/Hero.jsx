import React, { useContext } from 'react';
import { Link } from 'react-router';
import { ChatContext } from '../context/ContextProvider'; // Path check kar len
import JoinRoom from '../components/JoinRoom'; // Path check kar len

const Hero = () => {
  // Context se login state nikaal rahe hain
  const { isLoggedIn, loading } = useContext(ChatContext);

  // Agar context load ho raha hai to chhota sa loading indicator
  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-red-950">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-900 rounded-full opacity-20 blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-900 rounded-full opacity-20 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2.5 bg-indigo-950 border border-indigo-800/50 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-10 shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
            {isLoggedIn ? "Welcome Back! Your rooms are waiting." : "The modern way to connect."}
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-[1.1] max-w-4xl">
            Real-time Chats.<br /> 
            <span className="text-indigo-500">Zero Hassle.</span>
          </h1>
          
          {/* Sub-headline */}
          <p className="mt-8 text-xl text-gray-400 max-w-2xl leading-relaxed">
            Experience blazing fast messaging in a secure environment. Create rooms, invite friends, and start chatting instantly.
          </p>

          {/* --- Dynamic Content Area (Login vs JoinRoom) --- */}
          <div className="mt-14 w-full max-w-md bg-gray-900 border border-gray-800 p-7 rounded-3xl shadow-2xl shadow-gray-950/50 relative">
            
            {/* Subtle glow behind the box */}
            <div className="absolute inset-0 bg-indigo-600 rounded-3xl blur-2xl opacity-10 pointer-events-none"></div>

            {isLoggedIn ? (
              // Case 1: User Logged In -> Show JoinRoom
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-5 text-left flex items-center gap-2.5">
                  <span className="text-2xl">🚪</span> Join or Create a Room
                </h3>
                {/* Aapka JoinRoom component load hoga */}
                <JoinRoom /> 
              </div>
            ) : (
              // Case 2: User NOT Logged In -> Show CTA Buttons
              <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="flex-1 text-center bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl text-lg font-bold transition-all shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transform active:scale-[0.98]">
                  Get Started
                </Link>
                <Link to="/login" className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-gray-200 py-4 rounded-xl text-lg font-semibold transition-all border border-gray-700">
                  Sign In
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;