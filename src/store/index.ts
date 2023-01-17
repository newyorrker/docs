import { createStore } from "vuex";
import { state } from "@/store/main/state";
import { mutations } from "@/store/main/mutations";
import { actions } from "@/store/main/actions";
import { getters }from "@/store/main/getters";

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {}
});
