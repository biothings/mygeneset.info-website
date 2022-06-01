import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { Geneset } from "@/api/types";
import { getMetadata, MetadataResult } from "@/api/metadata";
import { getUser } from "@/api/login";

// global state type
export interface State {
  loggedIn: {
    name: string;
    username: string;
    email: string;
    organization: string;
    avatar: string;
    provider: string;
    genesets: Array<Geneset>;
  } | null;
  metadata: MetadataResult | null;
}

// global state store
export default createStore<State>({
  // default/starting global state
  state: {
    loggedIn: null,
    metadata: null,
  },
  mutations: {
    // update metadata info
    getMetadata(state, payload: Awaited<ReturnType<typeof getMetadata>>) {
      state.metadata = payload;
    },
    // update logged in state
    getUser(state, payload: Awaited<ReturnType<typeof getUser>>) {
      state.loggedIn = payload?.name
        ? {
            name: payload?.name || "",
            username: payload?.username || "",
            email: payload?.email || "",
            organization: payload?.organization || "",
            avatar: payload?.avatar_url || "",
            provider: payload?.oauth_provider || "",
            genesets: payload?.genesets || [],
          }
        : null;
    },
  },
  actions: {
    // update metadata info
    async getMetadata({ commit }) {
      commit("getMetadata", await getMetadata());
    },
    // update logged in state
    async getUser({ commit }) {
      commit("getUser", await getUser());
    },
  },
  modules: {},
  plugins: [],
});

// https://vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
export const key: InjectionKey<Store<State>> = Symbol();
export const useStore = () => baseUseStore(key);
