<template>
  <Section>
    <Center width="200px">
      <Clickable
        to="/new"
        icon="fas fa-magic"
        text="New Geneset"
        design="big"
      />
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable
  }
});
</script>

<style scoped lang="scss">
div {
  width: 100%;
}
</style>
