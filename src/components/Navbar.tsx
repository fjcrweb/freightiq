'use client';

import React from 'react';
import Link from 'next/link';
import { Anchor, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-navy-900 text-white border-b border-navy-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Anchor size={24} />
          <span>FreightIQ</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/indices" className="hover:text-blue-200 transition">
            Indices
          </Link>
          <Link href="/routes" className="hover:text-blue-200 transition">
            Routes
          </Link>
          <Link href="/ports" className="hover:text-blue-200 transition">
            Ports
          </Link>
          <Link href="/actualites" className="hover:text-blue-200 transition">
            Actualités
          </Link>
          <Link href="/apprendre" className="hover:text-blue-200 transition">
            Apprendre
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <Link href="/dashboard" className="btn-primary">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="btn-secondary bg-navy-900 border-white text-white hover:bg-white hover:text-navy-900">
                Se connecter
              </Link>
              <Link href="/auth/signup" className="btn-primary bg-white text-navy-900 hover:bg-gray-100">
                Essayer gratuitement
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-700 border-t border-navy-600 p-4 space-y-3">
          <Link href="/indices" className="block hover:text-blue-200">Indices</Link>
          <Link href="/routes" className="block hover:text-blue-200">Routes</Link>
          <Link href="/ports" className="block hover:text-blue-200">Ports</Link>
          <Link href="/actualites" className="block hover:text-blue-200">Actualités</Link>
          <Link href="/apprendre" className="block hover:text-blue-200">Apprendre</Link>
          <hr className="border-navy-600 my-3" />
          {isLoggedIn ? (
            <Link href="/dashboard" className="block btn-primary">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/login" className="block btn-secondary">
                Se connecter
              </Link>
              <Link href="/auth/signup" className="block btn-primary">
                Essayer gratuitement
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
