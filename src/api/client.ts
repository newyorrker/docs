import Axios, { AxiosInstance } from "axios";
import store from "@/store";
import { callRelogin } from "@/helpers/Relogin";

let subscribers: any = [];

function addSubscriber(callback: any) {
  subscribers.push(callback);
}

function clearSubscribers() {
  subscribers = [];
}

function onTokenFetched() {
  subscribers.forEach((callback: any) => callback());
  subscribers = [];
}

const client: AxiosInstance = Axios.create({
  //timeout: 40000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

client.interceptors.request.use(
  config => {
    config.baseURL = "".concat(
      store.state.session?.baseUrl || "",
      store.state.session?.projectName || "",
      "/"
    );
    // eslint-disable-next-line no-prototype-builtins
    if (!config.headers.hasOwnProperty("X-Appercode-Session-Token")) {
      config.headers["X-Appercode-Session-Token"] =
        store.state.session?.sessionId;
    }
    config.headers["X-Appercode-Language"] = store.state.session?.language;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

client.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      const retryOriginalRequest = new Promise(resolve => {
        addSubscriber(() => {
          originalRequest.headers["X-Appercode-Session-Token"] =
            store.state.session?.sessionId;
          resolve((client as unknown as (data: any) => {})(originalRequest));
        });
      });

      if (!store.state.isTokenUpdating) {
        originalRequest._retry = true;

        callRelogin();

        store.commit("setIsTokenUpdating", true);

        let countdown = 30;
        const refreshTimeout = setInterval(() => {
          countdown--;
          console.log("waiting", countdown);
          if (countdown === 0) {
            store.dispatch("setIsUpdatingToken", false);
            store.dispatch("hideSpinner", false);
            clearInterval(refreshTimeout);
            clearSubscribers();
            // return Promise.reject("Auth error");
          } else {
            if (!store.state.isTokenUpdating) {
              originalRequest.headers["X-Appercode-Session-Token"] =
                store.state.session?.sessionId;
              clearInterval(refreshTimeout);
              onTokenFetched();
            }
          }
        }, 1000);
      }
      return retryOriginalRequest;
    } else {
      return Promise.reject(error);
    }
  }
);

export { client };
