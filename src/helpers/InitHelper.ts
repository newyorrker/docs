import { Component, createApp } from "vue";
import store from "@/store";
import { repositories } from "../../../magnit/src/service/Repositories";
import { Store } from "vuex";

export const initApp = (component: Component) => {
  const app = createApp(component).use(store);

  app.config.globalProperties.$repositories = repositories;

  app.mount("#app");

  return app;
};

export const getSessionFromNative = (store: Store<any>) => async (
  sessionData: string
): Promise<void> => {
  try {
    sessionData = JSON.parse(sessionData);

    store.dispatch("setSession", sessionData);

    if (!store.state.isTokenUpdating) {
      try {
        await store.dispatch("fetchProfile");
      } catch (e) {
        alert("Не удалось выполнить загрузку профиля");
        store.dispatch("hideSpinner"); // in other cases spinner will be handled in the apps
      }
    } else {
      store.commit("setIsTokenUpdating", false);
    }
  } catch (e) {
    alert("Неверный формат json");
  }
};
