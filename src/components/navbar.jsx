// components/Navbar.js

import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-[#090909] py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/"><Image
          src="/logo.png" 
          alt=""
          width={200}
          height={50} 
          className="rounded-lg"
        />
            </Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/"className="text-white hover:text-[#7611f7]">Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white hover:text-[#7611f7]">About
              </Link>
            </li>
            <li>
              <Link href="/contact"
                className="text-white hover:text-[#7611f7]">
                    Service
              </Link>
            </li>
            
            <li>
              <Link href="/contact"
                className="text-white hover:text-[#7611f7]">Connect Button
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
