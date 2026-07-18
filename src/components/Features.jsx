// import {
//   ShieldCheck,
//   MessageCircleMore,
//   Users,
//   Image,
//   Bell,
//   Smartphone,
// } from "lucide-react";

// const features = [
//   {
//     icon: MessageCircleMore,
//     title: "Real-Time Messaging",
//     desc: "Instant messaging powered by WebSockets with zero delay communication.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Secure Chats",
//     desc: "Your conversations remain private with modern authentication & encryption.",
//   },
//   {
//     icon: Users,
//     title: "Group Conversations",
//     desc: "Create teams, communities and chat together in real time.",
//   },
//   {
//     icon: Image,
//     title: "Media Sharing",
//     desc: "Share images, files and documents effortlessly with everyone.",
//   },
//   {
//     icon: Bell,
//     title: "Live Notifications",
//     desc: "Never miss a message with instant notifications and typing indicators.",
//   },
//   {
//     icon: Smartphone,
//     title: "Responsive Design",
//     desc: "Works beautifully on desktop, tablet and mobile devices.",
//   },
// ];

// const Features = () => {
//   return (
//     <section
//       id="features"
//       className="bg-slate-950 py-28 text-white"
//     >
//       <div className="mx-auto max-w-7xl px-6">

//         <div className="text-center">

//           <span className="rounded-full bg-indigo-500/10 px-5 py-2 text-sm text-indigo-400">
//             FEATURES
//           </span>

//           <h2 className="mt-6 text-5xl font-bold">
//             Everything You Need
//           </h2>

//           <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
//             Powerful features designed to make communication faster,
//             smarter and more secure.
//           </p>

//         </div>

//         <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

//           {features.map((feature, index) => {
//             const Icon = feature.icon;

//             return (
//               <div
//                 key={index}
//                 className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition duration-300 hover:-translate-y-3 hover:border-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]"
//               >
//                 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 transition duration-300 group-hover:rotate-6">

//                   <Icon size={30} />

//                 </div>

//                 <h3 className="mt-8 text-2xl font-semibold">
//                   {feature.title}
//                 </h3>

//                 <p className="mt-4 leading-7 text-slate-400">
//                   {feature.desc}
//                 </p>

//               </div>
//             );
//           })}

//         </div>

//       </div>
//     </section>
//   );
// };

// export default Features;
import React from 'react';

// Icons ke liye clean built-in SVGs
const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h9M3.375 19.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.125a3.375 3.375 0 0 0-3.375-3.375H6.125A3.375 3.375 0 0 0 2.812 17.25v1.125c0 .621.504 1.125 1.125 1.125Z" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0V10.5m-2.25 0h13.5m-13.5 0a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25M6.75 10.5h10.5" />
  </svg>
);

const MailCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21.75 6v12A2.25 2.25 0 0 1 19.5 20.25h-15A2.25 2.25 0 0 1 2.25 18V6A2.25 2.25 0 0 1 4.5 3.75h15A2.25 2.25 0 0 1 21.75 6Z" />
  </svg>
);

const Features = () => {
  const coreFeatures = [
    {
      icon: <MessageIcon />,
      title: "Real-Time Messaging",
      description: "Blazing fast chat experience using WebSockets. No refresh required, messages deliver instantly."
    },
    {
      icon: <ShieldIcon />,
      title: "End-to-End Encryption",
      description: "Your privacy matters. Every message is encrypted, meaning only you and the recipient can read them."
    },
    {
      icon: <LockIcon />,
      title: "Secure Authentication",
      description: "Robust JWT-based login session management to keep your account safe from unauthorized access."
    },
    {
      icon: <MailCheckIcon />,
      title: "Verified Registration",
      description: "Spam protection via mandatory email verification. Keeping our chat rooms clean and genuine."
    }
  ];

  return (
    <section id='features' className="w-full bg-gray-950 text-gray-100 py-20 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Short & crisp heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Built with modern technologies for speed, security, and absolute privacy.
          </p>
        </div>

        {/* 2x2 Clean Grid Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {coreFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-2xl flex items-start gap-5 hover:border-indigo-500/30 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="bg-gray-950 border border-gray-800 p-3 rounded-xl shrink-0">
                {feature.icon}
              </div>
              
              {/* Text content */}
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;