const HeaderComponent: React.FC = () => {
  return (
    <div className={'py-8 flex flex-row justify items-center'}>
      <img
        className={'inline-block w-24 rounded-full border border-gray-light'}
        src={'assets/images/tsg_icon_large.png'}
        alt={'The Smyth Group logo'}
      />
      <span className={'px-8 text-3xl font-bold'}>The Smyth Group</span>
    </div>
  );
};

export default HeaderComponent;
