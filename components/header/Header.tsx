import { useState } from 'react';
import Link from 'next/link';
import LanguagePicker from '../LanguagePicker';

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
        <Link href='/'>
          <a className={'px-8 text-3xl font-bold'}>The Smyth Group</a>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className='hidden md:block font-bold'>
        <Link href='/blog/1'>
          <a className='px-3'>Blog</a>
        </Link>
        <Link href='/about' className='px-3'>
          <a className='px-3'>About</a>
        </Link>
        <Link href='/contact' className='px-3'>
          <a className='px-3'>Contact</a>
        </Link>
        <Link href='/widgets' className='px-3'>
          <a className='px-3'>Widgets</a>
        </Link>
        <LanguagePicker />
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
          <Link href='/' key='Home'>
            <a className={'px-12 py-5 text-black'}>Home</a>
          </Link>
          <Link href='/blog/1' className={'px-12 py-5 text-black'} key='Blog'>
            <a className={'px-12 py-5 text-black'}>Blog</a>
          </Link>
          <Link href='/about' className={'px-12 py-5 text-black'} key='About'>
            <a className={'px-12 py-5 text-black'}>About</a>
          </Link>
          <Link
            href='/contact'
            className={'px-12 py-5 text-black'}
            key='Contact'
          >
            <a className={'px-12 py-5 text-black'}>Contact</a>
          </Link>
          <Link
            href='/widgets'
            className={'px-12 py-5 text-black'}
            key='Widgets'
          >
            <a className={'px-12 py-5 text-black'}>Widgets</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
