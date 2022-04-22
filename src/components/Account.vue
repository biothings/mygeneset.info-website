<template>
  <!-- log in/out  and avatar in header -->
  <div class="account">
    <HeaderLink
      v-if="loggedIn"
      text="Log Out"
      to="https://mygeneset.info/logout"
    />
    <Avatar v-if="loggedIn" />
    <HeaderLink v-else to="/login" text="Log In" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderLink from "@/components/HeaderLink.vue";
import Avatar from "@/components/Avatar.vue";

export default defineComponent({
  components: {
    HeaderLink,
    Avatar
  },
  computed: {
    // is user logged in
    loggedIn() {
      return this.$store.state.loggedIn;
    }
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
