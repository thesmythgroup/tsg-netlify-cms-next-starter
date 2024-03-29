import { useRouter } from 'next/router';
import { i18nString } from '../../lib/i18n';

interface ProfileProps {
  profilePicture: string;
  name: string;
  public: boolean;
  age: number;
  roles: string[];
  bio: string;
  airportCode: string;
  address: AddressProps;
}

interface AddressProps {
  street: string;
  city: string;
  'zip-code': string;
}

interface CodeProps {
  code: string;
  lang: string;
}

interface LocationProps {
  type: string;
  coordinates: number[];
}

export interface WidgetShowcaseComponentProps {
  title: string;
  color?: string;
  profile?: ProfileProps;
  appointmentTime?: string;
  location?: LocationProps;
  code?: CodeProps;
}

const WidgetShowcaseComponent: React.FC<WidgetShowcaseComponentProps> = (
  props,
) => {
  const router = useRouter();
  const locale = router?.locale;
  const { color, profile, appointmentTime, location, code } = props;
  const googleUrl = location?.coordinates
    ? `https://www.google.com/maps/search/?api=1&query=${location.coordinates[1]},${location.coordinates[0]}`
    : undefined;

  return (
    <div className={'flex flex-col gap-5'}>
      <div
        className='p-3 w-full'
        style={{ backgroundColor: color ?? 'lavender' }}
      >
        <h1 className='text-3xl font-bold'>{props.title}</h1>
      </div>

      {/* PROFILE BLOCK */}
      <div className='p-3'>
        <div className='flex flex-row gap-3'>
          {profile?.profilePicture ? (
            <img
              className='inline-block h-12 w-12 rounded-full ring-2 ring-white mr-3'
              src={profile?.profilePicture}
              alt='Avatar'
            />
          ) : (
            <div className='bg-gray h-12 w-12 rounded-full ring-2 ring-white'></div>
          )}

          <p>
            <span className='font-semibold text-lg'>
              {profile?.name ?? 'Your Name'}
            </span>
            <span className='text-sm text-gray-500 ml-2'>
              ({profile?.public ? 'visible' : 'private'})
            </span>
            <br />
            <span className='text-gray-600 text-sm'>
              {i18nString(locale, 'widgetLabelAge')}:{' '}
              {profile?.age ?? 'unknown'}
            </span>

            {/* ROLES */}
            <span className='flex flex-row gap-3'>
              {profile?.roles?.map((role: string, index: number) => (
                <span
                  key={index}
                  className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300'
                >
                  {role}
                </span>
              ))}
            </span>
          </p>
        </div>

        {profile?.bio && (
          <p
            className='prose p-3 mt-3 mx-5'
            style={{ backgroundColor: color ?? 'lavender' }}
          >
            {profile?.bio}
          </p>
        )}

        {profile?.airportCode && (
          <p className='mt-3 mx-5'>
            {i18nString(locale, 'widgetLabelNearestAirport')}:{' '}
            {profile.airportCode}
          </p>
        )}

        {appointmentTime && (
          <p className='mt-3 mx-5'>
            {i18nString(locale, 'widgetLabelAppointmentDate')}:{' '}
            {appointmentTime ?? 'Not yet scheduled'}
          </p>
        )}

        {profile?.address && (
          <p className='mt-3 mx-5'>
            {profile?.address.street && (
              <span className={'block'}>{profile?.address.street}</span>
            )}
            {profile?.address.city && (
              <span className={'block'}>{profile?.address.city}</span>
            )}
            {profile?.address['zip-code'] && (
              <span className={'block'}>{profile?.address['zip-code']}</span>
            )}
          </p>
        )}

        {googleUrl && (
          <div className='my-3'>
            <a className='underline my-2 ml-5' href={googleUrl}>
              {i18nString(locale, 'widgetLinkAViewPickupLocation')}
            </a>
          </div>
        )}
      </div>

      {/* CODE BLOCK */}
      <div className='p-5 prose'>
        <pre>
          <code>{code?.code ? code.code : '// type your code here'}</code>
        </pre>
        {code?.lang && (
          <span className='text-md font-light italic'>
            <em>{code?.lang}</em>
          </span>
        )}
      </div>
    </div>
  );
};

export default WidgetShowcaseComponent;
