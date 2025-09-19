import { useState, useEffect } from "react";
import {Button} from '../../components/ui/button'
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Prevent body scroll when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/user/register");
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleMobileGetStarted = () => {
    handleGetStarted();
    closeMenu();
  };
  
  const handleMobileSignIn = () => {
    navigate("/login");
    closeMenu();
  };

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-6 py-3">
          <h1 className="text-2xl font-bold text-orange-600">JobTracker</h1>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="home" smooth spy offset={-80} duration={500} className="text-gray-600 text-sm font-medium rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer" activeClass="text-orange-600 font-bold">Home</Link>
            <Link to="features" smooth spy offset={-60} duration={500} className="text-gray-600 text-sm font-medium rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer" activeClass="text-orange-600 font-bold">Features</Link>
            <Link to="about" smooth spy offset={-60} duration={500} className="text-gray-600 text-sm font-medium rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer" activeClass="text-orange-600 font-bold">About</Link>
            <Button onClick={() => navigate("/user/login")} variant="custom">Sign In</Button>
            <Button onClick={handleGetStarted} variant="custom">Get Started</Button>
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-gray-600 hover:text-orange-600 focus:outline-none" aria-label="Open menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          onClick={closeMenu} 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden"
        ></div>
      )}

      {/* Slide-in Menu from the RIGHT */}
      <div 
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full" /* 1. Changed here */
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-orange-600">Menu</h2>
          <button onClick={closeMenu} className="text-gray-500 hover:text-gray-800" aria-label="Close menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-start space-y-2 p-4">
          <Link to="home" smooth spy offset={-80} duration={500} className="text-gray-700 font-medium hover:text-orange-600 w-full text-left py-3 px-4 rounded-md hover:bg-gray-100" activeClass="text-orange-600 font-bold bg-orange-50" onClick={closeMenu}>Home</Link>
          <Link to="features" smooth spy offset={-60} duration={500} className="text-gray-700 font-medium hover:text-orange-600 w-full text-left py-3 px-4 rounded-md hover:bg-gray-100" activeClass="text-orange-600 font-bold bg-orange-50" onClick={closeMenu}>Features</Link>
          <Link to="about" smooth spy offset={-60} duration={500} className="text-gray-700 font-medium hover:text-orange-600 w-full text-left py-3 px-4 rounded-md hover:bg-gray-100" activeClass="text-orange-600 font-bold bg-orange-50" onClick={closeMenu}>About</Link>
          
          <div className="w-full pt-6 space-y-3 border-t mt-4">
              <Button onClick={handleMobileSignIn} variant="custom" className="w-full">Sign In</Button>
              <Button onClick={handleMobileGetStarted} variant="custom" className="w-full">Get Started</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
