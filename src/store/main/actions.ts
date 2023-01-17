import { ActionTree } from "vuex";
import { RootState } from "@/store/types/RootState";
import { Session } from "@/types/Session";
import { changeProtocol } from "../../../../../common/helpers/helpers";
import { repositories } from "@/service/Repositories";

export const actions: ActionTree<RootState, RootState> = {
  setSession({ commit, state }, data: Session) {
    if (data.baseUrl) {
      data.baseUrl = changeProtocol(data.baseUrl);
    }
    if (data.userId) {
      data.userId = parseInt(data.userId.toString());
    }
    commit("setSession", data);
  },
  setClient({ commit }, client) {
    commit("setClient", client);
  },
  showSpinner({ commit }) {
    commit("setSpinner", true);
  },
  hideSpinner({ commit }) {
    commit("setSpinner", false);
  },
  setIsUpdatingToken({ commit }, value) {
    commit("setIsTokenUpdating", value);
  },
  async fetchProfile({ commit, state }) {
    const profile = await repositories.userRepository.ownProfile();
    commit("setProfile", profile);
  }
};
