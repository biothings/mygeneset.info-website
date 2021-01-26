<template>
  <LinkTo to="/user" class="avatar">
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
  width: 40px;
  height: 40px;
  margin-left: 10px;
  border-radius: 100%;
  background: $theme;
  color: $white;
  font-weight: $medium;
  text-decoration: none;
}
</style>
