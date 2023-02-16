import Vue from 'vue';
//@ts-ignore
import TextareaAutosize from 'vue-textarea-autosize';
import EasyRefresh from '@/shared/components/EasyRefresh/vue-easyrefresh/src/index';

import { initApplication } from "@/service/application/init";

import App from "@/root-components/DocumentsApp.vue";

Vue.config.productionTip = false;
Vue.use(TextareaAutosize);
Vue.use(EasyRefresh);

const app = initApplication(App, "documents");

app.$mount('#app');

if (process.env.NODE_ENV !== 'production') {
  window.sessionFromNative(
    '{"backendUrl":"https://api.test.appercode.com/hrlink", "sessionId":"04afe871-892a-4ae8-867c-a5c8c17f5109", "userId": 41323, "baseUrl":"https://api.test.appercode.com/","projectName":"hrlink","appPlatform":"Web","appVersion": "3.3.0","language": "ru", "userProfile": {"groupIds":["eadb87e0-538e-49d6-b985-40986f8e3e3b"]}}',
  );
}