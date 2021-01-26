import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

export interface State {
  loggedIn: boolean;
  userName: string;
  email: string;
  account: string;
  apiToken: string;
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage
});

export default createStore<State>({
  state: {
    loggedIn: false,
    userName: "",
    email: "",
    account: "",
    apiToken: ""
  },
  mutations: {
    logIn(state) {
      state.loggedIn = true;
      state.userName = "Casey Greene";
      state.email = "casey@greenelab.com";
      state.account = "GitHub";
      state.apiToken = "02j831lkdjf01j3fj013jf";
    },
    logOut(state) {
      state.loggedIn = false;
      state.userName = "";
      state.email = "";
      state.account = "";
      state.apiToken = "";
    }
  },
  actions: {
    logIn({ commit }) {
      commit("logIn");
    },
    logOut({ commit }) {
      commit("logOut");
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
});
