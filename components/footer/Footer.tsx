const FooterComponent: React.FC = () => {
  return (
    <div className={'pt-20'}>
      <div>
        &copy; {new Date().getFullYear()} The Jamie Smyth Groups, LLC All rights
        reserved
      </div>
    </div>
  );
};

export default FooterComponent;
