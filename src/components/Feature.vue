<template>
  <div class="feature">
    <div class="feature_icon"><i :class="icon" /></div>
    <div class="feature_title">{{ title }}</div>
    <div class="feature_description">{{ description }}</div>
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
  margin: 20px 0;
  text-align: center;
  text-decoration: none;

  & > * {
    display: flex;
  }

  .feature_icon {
    color: $theme;
    font-size: 3rem;
    margin-bottom: 20px;
  }

  .feature_title {
    font-weight: $medium;
    margin-bottom: 5px;
  }
}
</style>
