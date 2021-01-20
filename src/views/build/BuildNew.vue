<template>
  <Section>
    <h2>New Geneset</h2>
    <Center>
      <Clickable
        to="/new"
        icon="fas fa-tools"
        text="Start from Scratch"
        design="big"
      />
      <div>...or find an existing geneset and click "Duplicate"</div>
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
