import Vue, { VueConstructor } from 'vue';
import store from '@/service/store';

// @ts-ignore
import i18n from '@/service/locale/i18';
import Api from '@/service/network/api';
import { HrLinkRepository } from '@/service/repositories/HrLinkRepository';
import { ObjectRepository } from "../../../../../common/api/repositories/ObjectRepository";

export const initApplication = (App: VueConstructor, type: "documents" | "applications") => {
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
        async sessionFromNative(sessionData: string) {
            const parsedSessionData = JSON.parse(sessionData);
            this.api && this.api.setSession(parsedSessionData);
            this.$store.commit('setSession', parsedSessionData);
            await store.dispatch("fetchProfile");
            this.isSessionSet = true;

            Vue.prototype.$hrLinkRepository = new HrLinkRepository(type);
        },
        activateFromNative() {
            this.activate = !this.activate;
        },
    },
    });

    window.sessionFromNative = app.sessionFromNative;
    window.activateFromNative = app.activateFromNative;

    return app;
}