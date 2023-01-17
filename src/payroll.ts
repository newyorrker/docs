import store from "./store";
import "./styles/app.scss";

import { getSessionFromNative, initApp } from "@/helpers/InitHelper";
import PayrollApp from "@/apps/PayrollApp.vue";

const app = initApp(PayrollApp);

window.sessionFromNative = getSessionFromNative(store);
