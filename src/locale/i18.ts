import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { messages } from '../locale/locale';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: messages,
});

export default i18n;
