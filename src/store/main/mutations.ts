import { MutationTree } from "vuex";
import { RootState } from "@/store/types/RootState";
import { Session } from "@/types/Session";
import { AxiosInstance } from "axios";

export const mutations: MutationTree<RootState> = {
  setSession(state, data: Session) {
    state.session = data;
  },
  setClient(state, client: AxiosInstance) {
    state.client = client;
  },
  setSpinner(state, value) {
    state.spinner = value;
  },
  setIsTokenUpdating(state, value: boolean) {
    state.isTokenUpdating = value;
  },
  setProfile(state, profile) {
    state.profile = profile;
  }
};
