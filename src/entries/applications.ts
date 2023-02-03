import Vue from 'vue';
//@ts-ignore
import TextareaAutosize from 'vue-textarea-autosize';
import EasyRefresh from '@/shared/components/EasyRefresh/vue-easyrefresh/src/index';

import { initApplication } from "@/service/application/init";
import App from "@/root-components/ApplicationsApp.vue";

Vue.config.productionTip = false;
Vue.use(TextareaAutosize);
Vue.use(EasyRefresh);

const app = initApplication(App);

app.$mount('#app');

if (process.env.NODE_ENV !== 'production') {
  window.sessionFromNative(
    '{"backendUrl":"https://api.test.appercode.com/hrlink", "sessionId":"0ad2c75a-b9dd-46a2-a8b9-9a91bae83fdc", "userId": 41323, "baseUrl":"https://api.test.appercode.com/","projectName":"hrlink","appPlatform":"Web","appVersion": "3.3.0","language": "ru", "userProfile": {"groupIds":["eadb87e0-538e-49d6-b985-40986f8e3e3b"]}}',
  );
}