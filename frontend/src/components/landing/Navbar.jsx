import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const Navbar = () => {

    const navigate = useNavigate();
    
      const handleGetStarted = () => {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/dashboard");
        } else {
          navigate("/register");
        }
      };
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm flex justify-between items-center px-6 py-3">
      <h1 className="text-2xl font-bold text-orange-600">JobTracker</h1>
      <div className="space-x-4">
        <Link
          to="home"
          smooth={true}
          spy={true}
          offset={-80}
          duration={500}
          className="text-gray-600 text-sm font-medium rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
          activeClass="text-orange-600 font-bold"
          >Home</Link>
        <Link
        to="features"
        smooth={true}
        spy={true}
        offset={-60}
        duration={500} 
        className="text-gray-600 text-sm font-medium rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
        activeClass="text-orange-600 font-bold"
        >Features</Link>
        <Link
          to="about"
          smooth={true}
          spy={true}
          offset={-60}
          duration={500}
          className="text-gray-600 text-sm font-medium rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
          activeClass="text-orange-600 font-bold"
          >About</Link>
          
        <Button onClick={() => navigate("/login")} variant="custom">Sign In</Button>
        <Button onClick={handleGetStarted} variant="custom">Get Started</Button>
      </div>
    </nav>
  );
};

export default Navbar;
