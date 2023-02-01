import Vue, { VNode } from "vue";
import { HrLinkRepositoryInterface } from "@/service/repositories/HrLinkRepository";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

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