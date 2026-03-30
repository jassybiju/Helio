import React from "react";
import ClayButton from "./ui/ClayButton";
import Image from "next/image";
import Link from "next/link";
import UserAuthButtons from "./UserAuthButtons";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Image alt={"logo"} src={"/HelioLogo.svg"} width={25} height={25} />
          </div>
          <span className="text-2xl font-bold text-slate-900">Helio</span>
        </div>

        {/* Navigation */}
        {children}

        <UserAuthButtons/>
      </div>
    </header>
  );
};

export default Navbar;
