import React, { useState, useEffect, useCallback } from 'react';
import { LOCALES } from '../lib/locale-settings';
import { useRouter } from 'next/router';

export default function LanguagePicker() {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<number | null>(null);

  const navigationItems = LOCALES.map((supportedLocale) => {
    return {
      linkName: `${supportedLocale}`,
    };
  });

  const onSetCurrentItem = useCallback(async (item: number) => {
    const relatedItem = navigationItems.findIndex((linkItem, i) => {
      return i === item;
    });

    console.log('relatedItem', relatedItem);
    console.log('currentItem', currentItem);

    if (relatedItem !== currentItem) {
      setCurrentItem(relatedItem);

      await router.push({ pathname, query }, asPath, {
        locale: navigationItems[relatedItem].linkName,
      });

      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    if (currentItem != null) {
      return;
    }

    const matchedLocale = navigationItems.findIndex(
      (item) => item.linkName === locale,
    );

    if (matchedLocale > -1) {
      setCurrentItem(matchedLocale);
    }
  }, [currentItem, locale]);

  const handleKeyDown = async (e) => {
    if (isOpen) {
      e.preventDefault();

      switch (e.keyCode) {
        // KeyDown
        case 40:
          if (currentItem === navigationItems.length - 1) {
            await onSetCurrentItem(0);
          } else {
            await onSetCurrentItem(currentItem + 1);
          }
          break;
        // KeyUp
        case 38:
          if (currentItem === 0) {
            await onSetCurrentItem(navigationItems.length - 1);
          } else {
            await onSetCurrentItem(currentItem - 1);
          }
          break;
        // Escape
        case 27:
          await onSetCurrentItem(1);
          setIsOpen(false);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <div className='relative inline-flex' id='dropdown'>
        <button
          className='inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded border border-1 border-slate-600 bg-white-500 px-5 text-sm font-medium tracking-wide text-black transition duration-300 hover:text-white hover:bg-slate-600  disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none'
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span>
            {navigationItems[currentItem]?.linkName
              ? navigationItems[currentItem]?.linkName
              : 'Language'}
          </span>
          <span className='relative only:-mx-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='1.5'
              aria-labelledby='t-01 d-01'
              role='graphics-symbol'
            >
              <title id='t-01'>Button icon</title>
              <desc id='d-01'>An icon describing the buttons usage</desc>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.5 8.25l-7.5 7.5-7.5-7.5'
              />
            </svg>
          </span>
        </button>
        <ul
          className={`${
            isOpen ? 'flex' : 'hidden'
          } absolute top-full z-10 mt-1 flex w-72 list-none flex-col rounded bg-gray-200 py-2 shadow-md shadow-slate-500/10 `}
        >
          {navigationItems.map((item, index) => {
            return (
              <li key={index}>
                <button
                  className={`${
                    index === currentItem
                      ? 'bg-gray-50 text-gray-500'
                      : 'bg-none text-slate-500'
                  } flex w-full items-start justify-start gap-2 p-2 px-5 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-500 focus:bg-gray-50 focus:text-gray-600`}
                  aria-current={index + 1 === currentItem ? 'page' : 'false'}
                  onClick={() => onSetCurrentItem(index)}
                >
                  <span className='flex flex-col gap-1 overflow-hidden whitespace-nowrap'>
                    <span className='truncate leading-5'>{item.linkName}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {/*  <!-- End Menu list --> */}
      </div>
      {/* <!-- End Basic dropdown menu--> */}
    </>
  );
}
