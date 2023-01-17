import store from "./store";
import "./styles/app.scss";

import {getSessionFromNative, initApp} from "@/helpers/InitHelper";
import App from "./App.vue";

const app = initApp(App);

window.sessionFromNative = getSessionFromNative(store);


if (process.env.NODE_ENV !== 'production') {
    window.sessionFromNative(
        '{"backendUrl":"https://api.test.appercode.com/ugmkrk", "sessionId":"e4318f7b-b194-4450-a51a-62d566750f6a", "userId": 139, "baseUrl":"https://api.test.appercode.com/","projectName":"ugmkrk","appPlatform":"Android","appVersion": "3.3.0","language": "ru", "userProfile": {"groupIds":["eadb87e0-538e-49d6-b985-40986f8e3e3b"]}}',
    );
}