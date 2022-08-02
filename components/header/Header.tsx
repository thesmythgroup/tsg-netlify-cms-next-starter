const HeaderComponent: React.FC = () => {
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
      <div>
        <a href='/about' className='px-3'>
          About
        </a>
        <a href='/contact' className='px-3'>
          Contact
        </a>
      </div>
    </div>
  );
};

export default HeaderComponent;
