import store from "./store";
import "./styles/app.scss";

import {getSessionFromNative, initApp} from "@/helpers/InitHelper";
import VacationApp from "@/apps/VacationApp.vue";

const app = initApp(VacationApp);

window.sessionFromNative = getSessionFromNative(store);
