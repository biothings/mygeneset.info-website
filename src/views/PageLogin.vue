<template>
  <SectionAccounts />
  <SectionGuest />
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import SectionAccounts from "./login/SectionAccounts.vue";
import SectionGuest from "./login/SectionGuest.vue";

const store = useStore();
const router = useRouter();

// if already logged in, redirect to user page
watch(
  () => store.state.loggedIn,
  (value) => {
    if (value) router.push("/user");
  },
  { deep: true, immediate: true }
);
</script>
