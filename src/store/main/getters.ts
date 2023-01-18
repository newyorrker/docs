import { GetterTree } from 'vuex';
import RootState from '@/types/RootState';
import Platform from '@/types/Platform';

const getters: GetterTree<RootState, RootState> = {
  platform: state => state.session?.appPlatform,
  isWeb: (_, getter) =>
    getter['platform'] !== Platform.Android &&
    getter['platform'] !== Platform.iOS,
  isMobile: (_, getter) => !getter['isWeb'],
  urlParam: state => (param: string) => {
    return state.urlParams?.[param];
  },
  backend: state => state.session?.backendUrl || `${state.session?.baseUrl}${state.session?.projectName}`,
  userId: state => state.session?.userId,
};

export default getters;
