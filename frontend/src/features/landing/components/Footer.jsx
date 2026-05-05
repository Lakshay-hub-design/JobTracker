const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bebas-neue tracking-wider">JobTracker</h3>
              <p className="mt-2 text-gray-400 text-sm">Your ultimate job search companion.</p>
            </div>
            <div>
              <h4 className="font-bold">Product</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Company</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} JobTracker. All rights reserved.
          </div>
        </div>
      </footer>
  );
};

export default Footer;
