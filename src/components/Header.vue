<template>
  <!-- header at top of every page -->
  <header :big="big">
    <!-- cool visualization -->
    <HexField />

    <!-- expand button on mobile screens -->
    <button @click="expanded = !expanded">
      <i v-if="expanded" class="fas fa-angle-double-up"></i>
      <i v-else class="fas fa-bars"></i>
      <span v-if="expanded">Collapse</span>
      <span v-else>Menu</span>
    </button>

    <!-- left -->
    <Nav :expanded="expanded" />

    <!-- center -->
    <Logo :big="big" />

    <!-- right -->
    <Account :expanded="expanded" />
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
    // is big version (for use on home page)
    big: Boolean
  },
  components: {
    HexField,
    Nav,
    Logo,
    Account
  },
  data() {
    return {
      // is nave menu expanded
      expanded: false
    };
  },
  mounted() {
    // get whether user logged in when redirected from login/logout
    this.$store.dispatch("getUser");
  }
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
  background: $theme-pale;
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
