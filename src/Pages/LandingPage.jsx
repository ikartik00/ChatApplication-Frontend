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
        <div>
            <Navbar />
            <Hero />
            <Features />
            <WhyChoose />
            <HowItWorks />
            <CTA />
            <Footer />
        </div>
    )
}

export default LandingPage