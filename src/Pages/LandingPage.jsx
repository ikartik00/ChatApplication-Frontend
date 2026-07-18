import React from 'react'
import Navbar from '../components/Navbar2'
import Hero from '../components/Hero'
import { div } from 'framer-motion/client'
import Features from '../components/Features'
import WhyChoose from '../components/WhyChoose'
import HowItWorks from '../components/HowItWorks'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const LandingPage = () => {
    return (
        // <div class="min-h-screen bg-[#090D16] text-slate-100 font-sans relative overflow-hidden">

        //     <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        //     <div class="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[150px] pointer-events-none"></div>


        //     <header class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        //         <div class="flex items-center gap-3">
        //             <div class="h-9 w-9 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/20">N</div>
        //             <span class="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">NexusChat</span>
        //         </div>
        //         <nav class="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
        //             <a href="#features" class="hover:text-white transition-colors">Features</a>
        //             <a href="#security" class="hover:text-white transition-colors">Security</a>
        //             <a href="#pricing" class="hover:text-white transition-colors">Enterprise</a>
        //         </nav>
        //         <div class="flex items-center gap-4">
        //             <button class="text-sm font-semibold hover:text-indigo-400 transition-colors">Sign In</button>
        //             <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20">Launch App</button>
        //         </div>
        //     </header>


        //     <main class="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center relative z-10 flex flex-col items-center">

        //         <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs text-indigo-400 font-medium mb-6 backdrop-blur-md animate-fade-in">
        //             <span class="flex h-2 w-2 relative"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span></span>
        //             Nexus v2.0 Architecture is now live
        //         </div>


        //         <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.15] bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
        //             Where developer teams chat, collaborate & build.
        //         </h1>
        //         <p class="text-base sm:text-lg text-slate-400 mt-6 max-w-2xl leading-relaxed">
        //             A lightning-fast workspace combining real-time secure messaging, code snippet sharing, and persistent channels. Built for modern creators who value speed.
        //         </p>


        //         <div class="flex flex-col sm:flex-row gap-4 mt-10 w-full justify-center">
        //             <button class="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-sm font-semibold rounded-xl shadow-xl shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5">
        //                 Get Started Free
        //             </button>
        //             <button class="px-8 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-sm font-semibold text-slate-300 rounded-xl border border-slate-700/50 backdrop-blur-sm transition-all flex items-center justify-center gap-2">
        //                 <i class="ri-play-fill"></i> Watch Demo
        //             </button>
        //         </div>


        //         <div class="mt-16 w-full rounded-2xl border border-slate-800/80 bg-[#121B2E]/40 p-2 shadow-2xl backdrop-blur-sm shadow-indigo-500/5">
        //             <div class="bg-[#0B0F19] rounded-xl border border-slate-800/50 aspect-[16/9] flex items-center justify-center">
        //                 <div class="text-center text-slate-600 flex flex-col items-center gap-2">
        //                     <i class="ri-layout-dashboard-line text-4xl text-slate-500"></i>
        //                     <span class="text-sm font-medium tracking-wide">Interactive Dashboard App Preview</span>
        //                 </div>
        //             </div>
        //         </div>
        //     </main>
        //     <section id="features" class="py-24 bg-[#070A10] border-t border-slate-900 text-slate-200 relative">
        //         <div class="max-w-7xl mx-auto px-6">

        //             <div class="max-w-2xl mb-16">
        //                 <h2 class="text-xs uppercase font-bold tracking-widest text-indigo-400">Engineered for Performance</h2>
        //                 <p class="text-3xl font-bold tracking-tight text-white mt-2">Everything you expect from a premium messenger. And more.</p>
        //             </div>


        //             <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        //                 <div class="bg-[#0F1524]/60 border border-slate-800/60 p-8 rounded-2xl relative group hover:border-indigo-500/40 transition-all duration-300">
        //                     <div class="h-12 w-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        //                         <i class="ri-flashlight-line text-2xl"></i>
        //                     </div>
        //                     <h3 class="text-lg font-bold text-white mb-2">Ultra-Low Latency</h3>
        //                     <p class="text-sm text-slate-400 leading-relaxed">Powered by optimized WebSockets for real-time data persistence. No spin wheels, no loading buffers.</p>
        //                 </div>


        //                 <div class="bg-[#0F1524]/60 border border-slate-800/60 p-8 rounded-2xl relative group hover:border-violet-500/40 transition-all duration-300">
        //                     <div class="h-12 w-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-all">
        //                         <i class="ri-shield-keyhole-line text-2xl"></i>
        //                     </div>
        //                     <h3 class="text-lg font-bold text-white mb-2">End-to-End Cryptography</h3>
        //                     <p class="text-sm text-slate-400 leading-relaxed">Stateless JWT payload verification coupled with encrypted storage engines ensures security by default.</p>
        //                 </div>


        //                 <div class="bg-[#0F1524]/60 border border-slate-800/60 p-8 rounded-2xl relative group hover:border-pink-500/40 transition-all duration-300">
        //                     <div class="h-12 w-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400 mb-6 group-hover:bg-pink-600 group-hover:text-white transition-all">
        //                         <i class="ri-code-s-slash-line text-2xl"></i>
        //                     </div>
        //                     <h3 class="text-lg font-bold text-white mb-2">Developer Friendly</h3>
        //                     <p class="text-sm text-slate-400 leading-relaxed">Share system code blocks with native syntax highlighting built right inside the chat rows natively.</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>

        // </div>
        <div>
            <Navbar />
            <Hero />
            <Features/>
            <WhyChoose/>
            <HowItWorks/>
            <CTA/>
            <Footer/>
        </div>
    )
}

export default LandingPage