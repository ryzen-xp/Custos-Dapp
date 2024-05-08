// components/Navbar.js

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-[#090909] py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/"className="text-[#7611f7] text-xl font-semibold">Custos
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
                className="text-white hover:text-[#7611f7]">
                    Pages
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
