<template>
  <Section>
    <h2 id="news">What's New</h2>
    <Center>
      <a
        class="twitter-timeline"
        data-width="600"
        data-height="400"
        href="https://twitter.com/mygenesetinfo?ref_src=twsrc%5Etfw"
        >Tweets by mygenesetinfo</a
      >
    </Center>
    <component
      :is="'script'"
      async
      src="https://platform.twitter.com/widgets.js"
      charset="utf-8"
    ></component>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";

export default defineComponent({
  components: {
    Section,
    Center
  }
});
</script>
