import { Geneset } from "./../api/types";
import { createStore } from "vuex";
import { getUser } from "./../api/login";

// global state type
export interface State {
  loggedIn: boolean;
  name: string;
  username: string;
  email: string;
  organization: string;
  avatar: string;
  provider: string;
  genesets: Geneset[];
}

// global state store
export default createStore<State>({
  state: {
    loggedIn: false,
    name: "",
    username: "",
    email: "",
    organization: "",
    avatar: "",
    provider: "",
    genesets: []
  },
  mutations: {
    // update logged in state
    getUser(state, payload = {}) {
      state.loggedIn = !!payload?.name;
      state.name = payload?.name || "";
      state.username = payload?.username || "";
      state.email = payload?.email || "";
      state.organization = payload?.organization || "";
      state.avatar = payload?.avatar_url || "";
      state.provider = payload?.oauth_provider || "";
      state.genesets = payload?.genesets || [];
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
