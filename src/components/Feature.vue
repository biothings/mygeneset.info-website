<template>
  <div class="feature">
    <i v-bind:class="icon" />
    <span>{{ title }}</span>
    <span>{{ description }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    icon: String,
    title: String,
    description: String
  }
});
</script>

<style scoped lang="scss">
.feature {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  text-decoration: none;

  i {
    color: $accent-dark;
    font-size: 3rem;
    margin-bottom: 20px;
  }

  span:first-of-type {
    font-weight: $medium;
    margin-bottom: 5px;
  }
}
</style>
