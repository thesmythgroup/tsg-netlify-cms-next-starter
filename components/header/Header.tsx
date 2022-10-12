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
      <div className='hidden md:block font-bold'>
        <a href='/blog' className='px-3'>
          Blog
        </a>
        <a href='/about' className='px-3'>
          About
        </a>
        <a href='/contact' className='px-3'>
          Contact
        </a>
        <a href='/widgets' className='px-3'>
          Widgets
        </a>
      </div>

      {/* Mobile Menu Open/Close Button **/}
      <div
        className='md:hidden cursor-pointer font-bold'
        onClick={() => setOpen()}
      >
        Menu
      </div>

      {/* Mobile Menu Background Shade*/}
      <div
        className={[
          'md:hidden',
          isMenuOpen
            ? 'fixed w-[100vw] h-[100vh] bg-[#00000085] left-0 top-0'
            : '',
        ].join(' ')}
        onClick={() => setOpen()}
      ></div>

      {/* Mobile Menu */}
      <div
        className={
          isMenuOpen
            ? 'fixed w-[60vw] h-[100vh] bg-[white] py-5 top-0 left-0 z-10'
            : 'hidden'
        }
      >
        <div className='flex flex-col justify-center text-l font-bold'>
          <div
            className='absolute right-10 top-5 py-5 text-sm cursor-pointer'
            onClick={() => setOpen()}
          >
            Close
          </div>
          <a href='/' className={'px-12 py-5 text-black'} key='Home'>
            Home
          </a>
          <a href='/blog' className={'px-12 py-5 text-black'} key='Blog'>
            Blog
          </a>
          <a href='/about' className={'px-12 py-5 text-black'} key='About'>
            About
          </a>
          <a href='/contact' className={'px-12 py-5 text-black'} key='Contact'>
            Contact
          </a>
          <a href='/widgets' className={'px-12 py-5 text-black'} key='Widgets'>
            Widgets
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
