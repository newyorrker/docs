import store from "./store";
import "./styles/app.scss";

import {getSessionFromNative, initApp} from "@/helpers/InitHelper";
import TimesheetApp from "@/apps/TimesheetApp.vue";

const app = initApp(TimesheetApp);

window.sessionFromNative = getSessionFromNative(store);
