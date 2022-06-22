import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
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
    genesetCount: number;
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
            genesetCount: payload?.genesetCount || 0,
          }
        : null;
    },
  },
  actions: {
    // update metadata info
    async getMetadata({ commit }) {
      try {
        commit("getMetadata", await getMetadata());
      } catch (error) {
        console.error(error);
      }
    },
    // update logged in state
    async getUser({ commit }) {
      try {
        commit("getUser", await getUser());
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
  plugins: [],
});

// https://vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
export const key: InjectionKey<Store<State>> = Symbol();
export const useStore = () => baseUseStore(key);
