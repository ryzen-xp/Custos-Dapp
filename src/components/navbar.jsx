import Image from "next/image";
import Link from "next/link";
import ConnectButtoncomponent from "./connect";

const Navbar = () => {
  return (
    <nav className="py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt=""
                width={200}
                height={50}
                className="rounded-lg"
              />
            </Link>
          </div>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/" className="text-white hover:text-[#c92eff]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white hover:text-[#c92eff]">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-white hover:text-[#c92eff]"
              >
                Services
              </Link>
            </li>

            <li>
              <ConnectButtoncomponent />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
