import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='container mx-auto px-2'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
