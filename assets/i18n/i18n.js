import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import { getCurrentLanguage } from '../../src/functions/language';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import cn from './cn.json';
import pt from './pt.json'


i18n.use(initReactI18next).init({
    lng: getCurrentLanguage(),
    fallbackLng: 'en',
    resources: {
        en: en,
        es: es,
        fr: fr,
        cn: cn,
        pt: pt
    },
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});

export default i18n;
