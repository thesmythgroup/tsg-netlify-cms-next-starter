import { i18nString } from '../../lib/i18n';
import { useRouter } from 'next/router';

const FooterComponent: React.FC = () => {
  const router = useRouter();
  const locale = router?.locale;

  return (
    <div className={'py-20'}>
      <div className={'text-center'}>
        <p>&copy; {new Date().getFullYear()} The Jamie Smyth Group, LLC</p>
        <p>{i18nString(locale, 'footerMessageAllRightsReserved')}</p>
      </div>
    </div>
  );
};

export default FooterComponent;
