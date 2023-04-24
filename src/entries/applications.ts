import Vue from 'vue';
//@ts-ignore
import TextareaAutosize from 'vue-textarea-autosize';
import EasyRefresh from '@/shared/components/EasyRefresh/vue-easyrefresh/src/index';

import { initApplication } from "@/service/application/init";
import App from "@/root-components/ApplicationsApp.vue";

Vue.config.productionTip = false;
Vue.use(TextareaAutosize);
Vue.use(EasyRefresh);

const app = initApplication(App, "applications");

app.$mount('#app');

if (process.env.NODE_ENV !== 'production') {
  window.sessionFromNative(
    '{"backendUrl":"https://api.test.appercode.com/hrlink", "sessionId":"b1aac5d5-f809-4395-99b1-c7aaf379765c", "userId": 41323, "baseUrl":"https://api.test.appercode.com/","projectName":"hrlink","appPlatform":"Web","appVersion": "3.3.0","language": "ru", "userProfile": {"groupIds":["eadb87e0-538e-49d6-b985-40986f8e3e3b"]}}',
  );
}