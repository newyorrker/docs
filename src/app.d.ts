import { Repositories } from "@/api/Repositories";
import { Store } from "vuex";
import { RootState } from "@/store/types/RootState";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $repositories: Repositories;
    $store: Store<RootState>;
  }
}

declare global {
  interface Window {
    sessionFromNative: any;
    webkit: any;
    session: any;
  }
}
