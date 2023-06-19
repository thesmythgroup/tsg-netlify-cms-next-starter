import { i18nString } from '../../lib/i18n';
import { useRouter } from 'next/router';

export interface ContactPageComponentProps {
  title: string;
  intro: string;
}

const ContactPageComponent: React.FC<ContactPageComponentProps> = (props) => {
  const router = useRouter();
  const locale = router?.locale;

  return (
    <div className={'prose'}>
      <h1>{props.title}</h1>

      <p>{props.intro}</p>

      <form>
        <label className={'block'} htmlFor={'name'}>
          {i18nString(locale, 'formLabelName')}:
        </label>
        <input id='name' type='text' />

        <label className={'block'} htmlFor={'subject'}>
          {i18nString(locale, 'formLabelSubject')}:
        </label>
        <input id='subject' type='text' />

        <label className={'block'} htmlFor={'message'}>
          {i18nString(locale, 'formLabelMessage')}:
        </label>
        <input id='message' type='text' />
      </form>
    </div>
  );
};
export default ContactPageComponent;
