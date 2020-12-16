<template>
  <header v-bind:big="big">
    <HexField />
    <button @click="expanded = !expanded">
      <i v-if="expanded" class="fas fa-angle-double-up"></i>
      <i v-else class="fas fa-bars"></i>
      <span v-if="expanded">Collapse</span>
      <span v-else>Menu</span>
    </button>
    <Nav v-bind:expanded="expanded" />
    <Logo v-bind:big="big" />
    <Account v-bind:expanded="expanded" />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HexField from "@/components/HexField.vue";
import Nav from "@/components/Nav.vue";
import Logo from "@/components/Logo.vue";
import Account from "@/components/Account.vue";

export default defineComponent({
  props: {
    big: Boolean
  },
  components: {
    HexField,
    Nav,
    Logo,
    Account
  },
  data: () => ({
    expanded: false
  })
});
</script>

<style scoped lang="scss">
header {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  background: $accent-light;
  overflow: hidden;

  & > * {
    flex-basis: 0;
    flex-grow: 1;
    z-index: 1;
  }
}

button {
  display: none;
  padding: 10px;
  flex-basis: 100%;

  @media (max-width: $phone) {
    & {
      display: flex;
    }
  }
}
</style>
