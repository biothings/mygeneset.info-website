// https://stackoverflow.com/questions/64412243/vue-js-3-and-typescript-property-store-does-not-exist-on-type-componentpub
// https://next.vuex.vuejs.org/guide/typescript-support.html#typing-store-property-in-vue-component

import { Store } from "@/store";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store;
  }
}
