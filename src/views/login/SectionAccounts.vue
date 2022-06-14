<template>
  <AppSection>
    <AppHeading level="2" icon="sign-in-alt">Log in / Sign up</AppHeading>

    <!-- login buttons -->
    <AppFlex>
      <AppButton
        icon="github"
        text="With GitHub"
        fill="filled"
        size="big"
        @click="login('github')"
      />
      <AppButton
        icon="graduation-cap"
        text="With ORCID"
        fill="filled"
        size="big"
        @click="login('orcid')"
      />
    </AppFlex>
  </AppSection>
</template>

<script setup lang="ts">
import { login } from "@/api/login";
</script>
