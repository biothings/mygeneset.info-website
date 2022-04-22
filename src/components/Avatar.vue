<template>
  <!-- colored circle and user initials -->
  <LinkTo to="/user" class="avatar" v-tooltip="`Your user profile, ${name}`">
    <img v-if="avatar" :src="avatar" />
    <div v-else>
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
    // user's avatar
    avatar() {
      return this.$store.state.avatar || "";
    },
    // user's full name
    name() {
      return this.$store.state.name;
    },
    // user's initials
    userInitials() {
      return this.$store.state.name
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
  overflow: hidden;

  &:hover {
    background: $theme-light;
  }

  img {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
  }
}
</style>
