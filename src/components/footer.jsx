import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; 2024 Custos. All rights reserved.</p>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-300">Privacy</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">Terms & Services</a>
            </li>
            
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
