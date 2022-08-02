import { Router } from 'next/router';
import { useState } from 'react';

const HeaderComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const setOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // If Next Router is used to navigate instead of an <a /> tag,
  // you will need to watch for route change to close the menu.
  // Router.events.on('routeChangeComplete', () => {
  //   setIsMenuOpen(false);
  // });
  return (
    <div className='py-8 flex flex-row justify-between items-center'>
      <div className={'flex flex-row justify items-center'}>
        <img
          className={'inline-block w-24 rounded-full border border-gray-light'}
          src={'/assets/images/tsg_icon_large.png'}
          alt={'The Smyth Group logo'}
        />
        <a href='/' className={'px-8 text-3xl font-bold'}>
          The Smyth Group
        </a>
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:block'>
        <a href='/about' className='px-3'>
          About
        </a>
        <a href='/contact' className='px-3'>
          Contact
        </a>
      </div>

      {/* Mobile Menu Open/Close Button */}
      <div className='md:hidden cursor-pointer' onClick={() => setOpen()}>
        Menu
      </div>

      {/* Mobile Menu */}
      <div
        className={
          isMenuOpen
            ? 'fixed w-[75vw] h-[100vh] bg-[white] top-0 left-0 z-10'
            : 'hidden'
        }
      >
        <div className='flex  flex-col justify-center text-2xl font-bold'>
          <div
            className='absolute right-0 top-0 py-1 text-base cursor-pointer'
            onClick={() => setOpen()}
          >
            {' '}
            Close{' '}
          </div>
          <a href='/' className={'px-12 py-5 text-black'} key='Home'>
            Home
          </a>
          <a href='/about' className={'px-12 py-5 text-black'} key='About'>
            About
          </a>
          <a href='/contact' className={'px-12 py-5 text-black'} key='Contact'>
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
