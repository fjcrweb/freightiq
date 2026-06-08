'use client';

import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
