<template>
  <Section>
    <h1 id="whos-using">Who's using My Geneset</h1>
    <Gallery>
      <LinkTo to="https://greenelab.com/"
        ><img src="https://greenelab.com//icons/share-thumbnail.jpg"
      /></LinkTo>
      <LinkTo to="https://greenelab.com/"
        ><img src="https://greenelab.com//icons/share-thumbnail.jpg"
      /></LinkTo>
      <LinkTo to="https://greenelab.com/"
        ><img src="https://greenelab.com//icons/share-thumbnail.jpg"
      /></LinkTo>
      <LinkTo to="https://greenelab.com/"
        ><img src="https://greenelab.com//icons/share-thumbnail.jpg"
      /></LinkTo>
      <LinkTo to="https://greenelab.com/"
        ><img src="https://greenelab.com//icons/share-thumbnail.jpg"
      /></LinkTo>
      <LinkTo to="https://greenelab.com/"
        ><img src="https://greenelab.com//icons/share-thumbnail.jpg"
      /></LinkTo>
    </Gallery>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Gallery from "@/components/Gallery.vue";
import LinkTo from "@/components/LinkTo.vue";

export default defineComponent({
  components: {
    Section,
    Gallery,
    LinkTo
  }
});
</script>

<style scoped lang="scss">
img {
  height: 150px;
  opacity: 0.5;
  filter: saturate(0);
  transition: opacity $fast, filter $fast;

  &:hover {
    opacity: 1;
    filter: saturate(1);
  }
}
</style>
