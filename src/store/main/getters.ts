import { GetterTree } from "vuex"
import { RootState } from "../types/RootState"

export const getters: GetterTree<RootState, RootState> = {
    backend(state) {
        return state.session?.projectName;
    }
}