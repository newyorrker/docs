import { ActionTree } from 'vuex';
import RootState from '@/types/RootState';
import Api from '@/service/network/api';

const actions: ActionTree<RootState, RootState> = {
    async fetchProfile({ commit, state }) {

        const api = Api.getInstance();
        const profile = await api.ownProfile();
        commit("setProfile", profile);
    }
};

export default actions;
