import Vue from 'vue';
import Vuex from 'vuex';

import state from './main/state';
import actions from './main/actions';
import mutations from './main/mutations';
import getters from './main/getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
});
