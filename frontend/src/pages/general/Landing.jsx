import React, { useEffect } from 'react'

import FeaturesSection from '../../components/landing/Features'
import Footer from '../../components/landing/Footer'
import Navbar from '../../components/landing/Navbar'
import About from '../../components/landing/About'
import HeroSection from '../../components/landing/HeroSection'

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
