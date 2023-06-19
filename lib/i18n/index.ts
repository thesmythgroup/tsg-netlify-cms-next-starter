import { LOCALES } from '../locale-settings';
import en from './en';
import es from './es';
import { I18nString } from '../../interfaces/I18nString.interface';

export const i18nString = (
  locale: typeof LOCALES[number],
  i18nString: string,
) => {
  let selectedLocale: I18nString;

  switch (locale) {
    case 'es': {
      selectedLocale = es;
      break;
    }
    default: {
      selectedLocale = en;
    }
  }

  return selectedLocale[i18nString] ?? i18nString;
};
