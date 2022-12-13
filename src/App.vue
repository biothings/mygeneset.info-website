<template>
  <TheHeader />
  <main>
    <router-view />
    <AppBanner />
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "@/store";
import "normalize.css";
import "@/global/icons";
import "@/global/styles.scss"; // keep these last so they take priority
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import AppBanner from "./components/AppBanner.vue";

const store = useStore();

onMounted(() => {
  // get metadata
  store.dispatch("getMetadata");
  // get whether user logged in when redirected from login/logout
  store.dispatch("getUser");
});
</script>
