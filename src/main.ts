import Vue from 'vue';
import store from './store';
//@ts-ignore
import TextareaAutosize from 'vue-textarea-autosize';
import EasyRefresh from '@/shared/components/EasyRefresh/vue-easyrefresh/src/index';
// @ts-ignore
import i18n from '@/locale/i18';

import App from './App.vue';

import Api from './service/network/api';
import { HrLinkRepository, HrLinkRepositoryInterface } from './service/repositories/HrLinkRepository';

Vue.config.productionTip = false;
Vue.use(TextareaAutosize);
Vue.use(EasyRefresh);

declare module "vue/types/vue" {
  interface Vue {
    $style: Record<string, string>;
    $hrLinkRepository: HrLinkRepositoryInterface;
  }
}


declare global {
  interface Window {
    sessionFromNative: (arg0: string) => void;
    activateFromNative: () => void;
    appercode: {
      reloadPage: () => void;
    };
    actor: {
      changeButtons: (arg0: any) => void;
      postMessage: (arg0: any) => void;
    };
    clickButton: (arg0: any) => void;
    // eslint-disable-next-line
    webkit: any;
    // eslint-disable-next-line
    session: any;
  }
}

const app = new Vue({
  components: {
    App,
  },
  template: "<app v-if='isSessionSet'></app>",
  data(): {
    isSessionSet: boolean;
    activate: boolean;
    api: Api | null;
  } {
    return {
      isSessionSet: false,
      activate: false,
      api: null,
    };
  },
  store,
  i18n,
  created() {
    this.api = Api.getInstance();
  },
  methods: {
    sessionFromNative(sessionData: string) {
      const parsedSessionData = JSON.parse(sessionData);
      this.api && this.api.setSession(parsedSessionData);
      this.$store.commit('setSession', parsedSessionData);
      store.dispatch("fetchProfile");
      this.isSessionSet = true;

      Vue.prototype.$hrLinkRepository = new HrLinkRepository();
    },
    activateFromNative() {
      this.activate = !this.activate;
    },
  },
});

window.sessionFromNative = app.sessionFromNative;
window.activateFromNative = app.activateFromNative;

app.$mount('#app');


if (process.env.NODE_ENV !== 'production') {
  window.sessionFromNative(
    '{"backendUrl":"https://api.test.appercode.com/hrlink", "sessionId":"86e54d1a-710d-4386-893c-c8cabc77633c", "userId": 41323, "baseUrl":"https://api.test.appercode.com/","projectName":"hrlink","appPlatform":"Web","appVersion": "3.3.0","language": "ru", "userProfile": {"groupIds":["eadb87e0-538e-49d6-b985-40986f8e3e3b"]}}',
  );
}
