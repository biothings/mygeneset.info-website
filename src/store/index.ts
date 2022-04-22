import { createStore } from "vuex";
import { getUser } from "./../api/login";

// global state type
export interface State {
  loggedIn: boolean;
  name: string;
  username: string;
  organization: string;
  avatar: string;
}

// global state store
export default createStore<State>({
  state: {
    loggedIn: false,
    name: "",
    username: "",
    organization: "",
    avatar: ""
  },
  mutations: {
    // update logged in state
    getUser(state, payload = {}) {
      state.loggedIn = !!payload?.name;
      state.name = payload?.name || "";
      state.username = payload?.username || "";
      state.organization = payload?.organization || "";
      state.avatar = payload?.avatar_url || "";
    }
  },
  actions: {
    // update logged in state
    async getUser({ commit }) {
      commit("getUser", await getUser());
    }
  },
  modules: {},
  plugins: []
});
