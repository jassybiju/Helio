"use client";

import React, { useState } from "react";
import Image from "next/image";
import UserAuthButtons from "./UserAuthButtons";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = ({ isPatient = false }: { isPatient?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Image
                src="/HelioLogo.svg"
                alt="Helio Logo"
                width={25}
                height={25}
              />
            </div>
            <span className="text-2xl font-bold text-slate-900">Helio</span>
          </div>

          {/* Desktop Navigation */}
          {isPatient && (
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/search"
                className="text-slate-700 hover:text-slate-900 font-medium text-sm"
              >
                Find Doctors
              </Link>
              <Link
                href="/#howitworks"
                className="text-slate-700 hover:text-slate-900 font-medium text-sm"
              >
                How it Works
              </Link>
              <Link
                href="/#testimonials"
                className="text-slate-700 hover:text-slate-900 font-medium text-sm"
              >
                Testimonials
              </Link>
              <Link
                href="/#faq"
                className="text-slate-700 hover:text-slate-900 font-medium text-sm"
              >
                FAQ
              </Link>
            </nav>
          )}

          {/* Desktop Auth Buttons */}
          <div className="hidden md:block">
            <UserAuthButtons />
          </div>

          {/* Mobile Menu Button */}
          {isPatient && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}

          {/* If not patient, show auth buttons on mobile */}
          {!isPatient && (
            <div className="md:hidden">
              <UserAuthButtons />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isPatient && isOpen && (
          <div className="md:hidden absolute px-3 bg-white w-full border-t border-slate-200 py-4 space-y-4">
            <a
              href="/search"
              className="block text-slate-700 hover:text-slate-900 font-medium"
            >
              Find Doctors
            </a>

            <a
              href="#"
              className="block text-slate-700 hover:text-slate-900 font-medium"
            >
              How it Works
            </a>

            <a
              href="#"
              className="block text-slate-700 hover:text-slate-900 font-medium"
            >
              Pricing
            </a>

            <a
              href="#"
              className="block text-slate-700 hover:text-slate-900 font-medium"
            >
              FAQ
            </a>

            <div className="pt-2 border-t border-slate-200">
              <UserAuthButtons />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;