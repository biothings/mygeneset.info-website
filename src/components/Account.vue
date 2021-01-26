<template>
  <div class="account">
    <HeaderLink to="/login" text="Log In" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderLink from "@/components/HeaderLink.vue";

export default defineComponent({
  components: {
    HeaderLink
  }
});
</script>

<style scoped lang="scss">
.account {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: $phone) {
    justify-content: center;
    flex-direction: column;
    flex-basis: 100%;

    &[expanded="false"] {
      display: none;
    }

    & > * {
      width: 100%;
    }
  }
}
</style>
