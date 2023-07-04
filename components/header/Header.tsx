import { useState } from 'react';
import Link from 'next/link';
import LanguagePicker from '../LanguagePicker';

const HeaderComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const setOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems: { linkName: string; href: string }[] = [
    {
      linkName: 'Blog',
      href: '/blog/1',
    },
    {
      linkName: 'About',
      href: '/about',
    },
    {
      linkName: 'Contact',
      href: '/contact',
    },
    {
      linkName: 'Widgets',
      href: '/widgets',
    },
  ];

  // If Next Router is used to navigate instead of an <a /> tag,
  // you will need to watch for route change to close the menu.
  // Router.events.on('routeChangeComplete', () => {
  //   setIsMenuOpen(false);
  // });
  return (
    <div className='py-8 flex flex-row justify-between items-center'>
      <div className={'flex flex-row justify items-center'}>
        <img
          className={'inline-block w-24'}
          src={'/assets/images/tsg-logo-color.png'}
          alt={'The Smyth Group logo'}
        />
        <Link href='/'>
          <a className={'px-8 text-xl md:text-3xl font-bold'}>
            The Smyth Group
          </a>
        </Link>
      </div>

      <div
        className={[
          isMenuOpen
            ? 'fixed w-[90%] h-[100vh] bg-white left-0 top-0 z-10 flex flex-col'
            : 'hidden',
          'font-bold pt-5 md:pt-0 md:static md:bg-transparent md:w-auto md:h-auto md:block',
        ].join(' ')}
      >
        {isMenuOpen ? (
          <div
            className='md:hidden absolute right-10 top-5 py-5 text-sm cursor-pointer'
            onClick={() => setOpen()}
          >
            Close
          </div>
        ) : null}
        {menuItems.map((item, i) => {
          return (
            <Link key={i} href={item.href}>
              <a className={'px-12 text-xl md:text-base py-5 md:py-0 md:px-3'}>
                {item.linkName}
              </a>
            </Link>
          );
        })}
        <span className={'px-12 pt-5 md:px-0'}>
          <LanguagePicker />
        </span>
      </div>

      {/* Mobile Menu Open/Close Button **/}
      <div
        className='md:hidden text-sm cursor-pointer font-bold'
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
    </div>
  );
};

export default HeaderComponent;
