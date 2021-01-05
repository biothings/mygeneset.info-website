<template>
  <main>
    <Section v-if="title && icon">
      <h1>
        <i :class="icon"></i>
        <span>{{ title }}</span>
      </h1>
    </Section>
    <slot></slot>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";

export default defineComponent({
  components: {
    Section
  },
  props: {
    title: String,
    icon: String
  }
});
</script>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  & > *:last-child {
    flex-grow: 1;
  }
}
</style>
