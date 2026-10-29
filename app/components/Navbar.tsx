"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link
              href="/"
              className="text-[#00A9B5] border-b-2 border-[#00A9B5] pb-1 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/destinations"
              className="hover:text-[#00A9B5] transition-colors pb-1"
            >
              Destinations
            </Link>
            <Link
              href="/my-bookings"
              className="hover:text-[#00A9B5] transition-colors pb-1"
            >
              My Bookings
            </Link>
            <Link
              href="/admin"
              className="hover:text-[#00A9B5] transition-colors pb-1"
            >
              Admin
            </Link>
          </nav>

          {/* Center Brand Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="text-2xl md:text-3xl font-serif font-bold text-[#00A9B5] tracking-tight">
              Wanderlast
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/profile"
              className="flex items-center gap-2 text-gray-700 hover:text-[#00A9B5] transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-[#00A9B5] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#00A9B5] hover:bg-[#008f9a] text-white px-5 py-2 rounded-md font-semibold transition-colors shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#00A9B5] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#00A9B5] font-semibold py-2"
          >
            Home
          </Link>
          <Link
            href="/destinations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-[#00A9B5] py-2"
          >
            Destinations
          </Link>
          <Link
            href="/my-bookings"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-[#00A9B5] py-2"
          >
            My Bookings
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-[#00A9B5] py-2"
          >
            Admin
          </Link>
          <div className="border-t border-gray-100 pt-3 flex flex-col gap-3">
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-gray-700 py-1"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 py-1"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#00A9B5] text-white text-center py-2.5 rounded-md font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}