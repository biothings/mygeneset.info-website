<template>
  <!-- colored circle and user initials -->
  <LinkTo
    to="/user"
    class="avatar"
    v-tooltip="`Your user profile, ${userName}`"
  >
    <div>
      {{ userInitials }}
    </div>
  </LinkTo>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkTo from "@/components/LinkTo.vue";

export default defineComponent({
  components: {
    LinkTo
  },
  computed: {
    // user's full name
    userName() {
      return this.$store.state.userName;
    },
    // user's initials
    userInitials() {
      return this.$store.state.userName
        .split(/\s/)
        .filter((w: string) => w)
        .map((w: string) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }
  }
});
</script>

<style scoped lang="scss">
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px !important;
  height: 40px !important;
  margin-left: 10px;
  border-radius: 100%;
  background: $theme;
  color: $white;
  font-weight: $medium;
  text-decoration: none;
  transition: background $fast;

  &:hover {
    background: $theme-light;
  }
}
</style>
