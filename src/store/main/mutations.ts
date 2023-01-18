import { MutationTree } from 'vuex';
import RootState from '@/types/RootState';
import Session from '@/models/Session';
import Vue from 'vue';

const mutations: MutationTree<RootState> = {
  setSession(state, session: Session) {
    Vue.set(state, 'session', session);
  },
  setUrlParams(state, urlParams: { [k: string]: string }) {
    state.urlParams = urlParams;
  },
  setProfile(state, payload) {
    Vue.set(state, "userProfile", payload);
  }
};

export default mutations;
