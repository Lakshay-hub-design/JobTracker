import React, { useEffect } from 'react'

import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import About from '../components/About'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'

const Landing = () => {

  useEffect(() => {
    document.body.classList.add('landing-page-body');
    return () => {
      document.body.classList.remove('landing-page-body');
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white min-h-screen scroll-smooth">
      <Navbar />
      <section id="home">
        <HeroSection />
      </section>
      <section id="features">
        <Features />
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
