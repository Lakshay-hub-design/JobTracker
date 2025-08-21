import React from 'react'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import Footer from '../components/landing/Footer'
import Navbar from '../components/landing/Navbar'
import About from '../components/landing/About'

const Landing = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white min-h-screen">
      <Navbar />
      <section id="home">
        <HeroSection />
      </section>
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="footer"> 
        <Footer />
      </section>
    </div>
  )
}

export default Landing
