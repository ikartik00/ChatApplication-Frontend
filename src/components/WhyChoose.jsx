// import {
//   CheckCircle2,
//   Shield,
//   Zap,
//   Users,
//   Clock,
//   Globe,
// } from "lucide-react";

// const points = [
//   {
//     icon: Shield,
//     title: "Secure Authentication",
//     desc: "JWT based authentication keeps your account protected.",
//   },
//   {
//     icon: Zap,
//     title: "Lightning Fast",
//     desc: "Messages are delivered instantly using WebSockets.",
//   },
//   {
//     icon: Users,
//     title: "Group Chats",
//     desc: "Create unlimited groups and communicate effortlessly.",
//   },
//   {
//     icon: Clock,
//     title: "24/7 Availability",
//     desc: "Reliable infrastructure with high uptime.",
//   },
//   {
//     icon: Globe,
//     title: "Access Anywhere",
//     desc: "Desktop, tablet or mobile — your chats are always available.",
//   },
// ];

// const WhyChoose = () => {
//   return (
//     <section
//       id="about"
//       className="relative overflow-hidden bg-slate-900 py-28 text-white"
//     >
//       {/* Background Blur */}
//       <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />
//       <div className="absolute right-0 bottom-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

//       <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

//         {/* LEFT SIDE */}
//         <div className="relative">

//           <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">

//             {/* Header */}
//             <div className="mb-8 flex items-center justify-between">

//               <div>
//                 <h3 className="text-xl font-bold">
//                   Team Chat
//                 </h3>

//                 <p className="text-sm text-slate-400">
//                   8 Members Online
//                 </p>
//               </div>

//               <div className="rounded-full bg-green-500 px-3 py-1 text-xs">
//                 Live
//               </div>

//             </div>

//             {/* Users */}

//             <div className="space-y-5">

//               {[
//                 "Alex Johnson",
//                 "Sophia",
//                 "Michael",
//                 "Emma",
//               ].map((user) => (
//                 <div
//                   key={user}
//                   className="flex items-center justify-between rounded-xl bg-slate-900 p-4"
//                 >
//                   <div className="flex items-center gap-4">

//                     <div className="h-12 w-12 rounded-full bg-indigo-500" />

//                     <div>
//                       <h4>{user}</h4>
//                       <p className="text-sm text-slate-400">
//                         Typing...
//                       </p>
//                     </div>

//                   </div>

//                   <div className="h-3 w-3 rounded-full bg-green-500" />

//                 </div>
//               ))}

//             </div>

//           </div>

//           {/* Floating Card */}

//           <div className="absolute -bottom-8 -right-6 rounded-2xl border border-slate-700 bg-slate-950 p-5 shadow-xl">

//             <p className="text-sm text-slate-400">
//               Messages Today
//             </p>

//             <h2 className="mt-2 text-3xl font-bold">
//               12,450
//             </h2>

//             <p className="mt-1 text-green-400">
//               +18% This Week
//             </p>

//           </div>

//         </div>

//         {/* RIGHT SIDE */}

//         <div>

//           <span className="rounded-full bg-indigo-500/10 px-5 py-2 text-indigo-400">
//             WHY CHOOSE US
//           </span>

//           <h2 className="mt-6 text-5xl font-bold leading-tight">
//             Built For Fast,
//             <br />
//             Secure &
//             <br />
//             Modern Communication.
//           </h2>

//           <p className="mt-8 text-lg leading-8 text-slate-400">
//             Our platform is designed to deliver seamless conversations
//             with enterprise-grade security and an elegant user
//             experience.
//           </p>

//           <div className="mt-12 space-y-8">

//             {points.map((item, index) => {
//               const Icon = item.icon;

//               return (
//                 <div
//                   key={index}
//                   className="flex gap-5"
//                 >
//                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600">
//                     <Icon size={26} />
//                   </div>

//                   <div>
//                     <h3 className="flex items-center gap-2 text-xl font-semibold">
//                       {item.title}
//                       <CheckCircle2
//                         size={18}
//                         className="text-green-400"
//                       />
//                     </h3>

//                     <p className="mt-2 text-slate-400">
//                       {item.desc}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// };

// export default WhyChoose;
import React from 'react';

// Modern Glow Icons
const SpeedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-indigo-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
);

const SecurityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-emerald-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-purple-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
  </svg>
);

const WhyChoose = () => {
  return (
    <section id='why-us' className="w-full bg-gray-950 text-gray-100 py-24 border-t border-gray-900 relative overflow-hidden">
      {/* Background Subtle Ambient Light */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Eye-catching Visual / Stats Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-linear-to-br from-gray-900 to-gray-950 border border-gray-800 p-8 rounded-3xl relative shadow-2xl">
              {/* Green Active Ping */}
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-emerald-950/50 border border-emerald-800/30 px-3 py-1 rounded-full text-xs text-emerald-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Optimized
              </div>

              <span className="text-sm font-semibold uppercase tracking-widest text-indigo-500">The Benchmarks</span>
              <h3 className="text-3xl font-black text-white mt-2 tracking-tight">Built for Next-Gen Conversations.</h3>
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                We eliminated the clunkiness of traditional chat protocols to deliver something exceptionally refined.
              </p>

              {/* Mini Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-900">
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">&lt; 15ms</div>
                  <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Message Latency</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-white tracking-tight">100%</div>
                  <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Data Ownership</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Core Reasons */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 bg-indigo-950/60 border border-indigo-900/50 px-3 py-1.5 rounded-full">
                Why Us
              </span>
              <h2 className="text-4xl font-extrabold tracking-tighter text-white mt-4 max-w-xl">
                A communication standard built without compromises.
              </h2>
            </div>

            {/* List of Features */}
            <div className="space-y-6">
              
              {/* Item 1 */}
              <div className="flex gap-4 p-4 rounded-2xl hover:bg-gray-900/40 transition-colors duration-200">
                <div className="h-12 w-12 rounded-xl bg-indigo-950/80 border border-indigo-900 flex items-center justify-center shrink-0">
                  <SpeedIcon />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">Zero Lag Architecture</h4>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                    Powered by WebSocket logic optimized to deliver group and direct messages instantly, no matter your location.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4 p-4 rounded-2xl hover:bg-gray-900/40 transition-colors duration-200">
                <div className="h-12 w-12 rounded-xl bg-emerald-950/80 border border-emerald-900 flex items-center justify-center shrink-0">
                  <SecurityIcon />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">Strict Privacy First</h4>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                    We do not harvest or monetize your metadata. Your chats, rooms, and media stay completely yours.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4 p-4 rounded-2xl hover:bg-gray-900/40 transition-colors duration-200">
                <div className="h-12 w-12 rounded-xl bg-purple-950/80 border border-purple-900 flex items-center justify-center shrink-0">
                  <UserIcon />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">Distraction-Free Experience</h4>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                    No cluttered algorithmic feeds, no bloatware. Just a pure, beautiful, and focused workspace for messaging.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChoose;