import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
    <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-md shadow-sm flex justify-between items-center px-6 py-3">
      <h1 className="text-2xl font-bold text-orange-600">JobTrackr</h1>
      <div className="space-x-4">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">Features</Button>
        <Button variant="ghost">About</Button>
        <Button onClick={handleGetStarted} variant="custom">Get Started</Button>
      </div>
    </nav>
  );
};

export default Navbar;
