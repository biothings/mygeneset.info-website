import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

// global state type
export interface State {
  loggedIn: boolean;
  userName: string;
  email: string;
  account: string;
  apiToken: string;
}

// local storage for persistence
const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage
});

// global state store
export default createStore<State>({
  state: {
    loggedIn: false,
    userName: "",
    email: "",
    account: "",
    apiToken: ""
  },
  mutations: {
    // dummy log in
    logIn(state) {
      state.loggedIn = true;
      state.userName = "Casey Greene";
      state.email = "casey@greenelab.com";
      state.account = "GitHub";
      state.apiToken = "02j831lkdjf01j3fj013jf";
    },
    // dummy log out
    logOut(state) {
      state.loggedIn = false;
      state.userName = "";
      state.email = "";
      state.account = "";
      state.apiToken = "";
    }
  },
  actions: {
    // dummy log in
    logIn({ commit }) {
      commit("logIn");
    },
    // dummy log out
    logOut({ commit }) {
      commit("logOut");
    }
  },
  modules: {},
  plugins: [vuexLocal.plugin]
});
