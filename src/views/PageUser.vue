<template>
  <SectionProfile />
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import SectionProfile from "./user/SectionProfile.vue";

const store = useStore();
const router = useRouter();

// if not logged in, redirect to login page
watch(
  () => store.state.loggedIn,
  (value) => {
    if (!value) router.push("/login");
  },
  { deep: true, immediate: true }
);
</script>
