<template>
  <Section>
    <h2 id="team">Team</h2>
    <p>
      My Geneset was made by the
      <LinkTo to="https://biothings.io/">BioThings collaboration</LinkTo>, a
      cross-organization group that builds
      <LinkTo to="https://www.go-fair.org/fair-principles/">FAIR</LinkTo> tools
      for biomedical knowledge. This specific tool was made possible thanks to
      these contributors.
    </p>
    <Gallery>
      <Portrait
        link="https://vincentrubinetti.com"
        image="images/vince.jpg"
        name="Vincent Rubinetti"
        role="Frontend Developer"
      />
      <Portrait
        link="https://vincentrubinetti.com"
        image="images/vince.jpg"
        name="Vincent Rubinetti"
        role="Frontend Developer"
      />
      <Portrait
        link="https://vincentrubinetti.com"
        image="images/vince.jpg"
        name="Vincent Rubinetti"
        role="Frontend Developer"
      />
      <Portrait
        link="https://vincentrubinetti.com"
        image="images/vince.jpg"
        name="Vincent Rubinetti"
        role="Frontend Developer"
      />
      <Portrait
        link="https://vincentrubinetti.com"
        image="images/vince.jpg"
        name="Vincent Rubinetti"
        role="Frontend Developer"
      />
      <Portrait
        link="https://vincentrubinetti.com"
        image="images/vince.jpg"
        name="Vincent Rubinetti"
        role="Frontend Developer"
      />
    </Gallery>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import LinkTo from "@/components/LinkTo.vue";
import Gallery from "@/components/Gallery.vue";
import Portrait from "@/components/Portrait.vue";

export default defineComponent({
  components: {
    Section,
    LinkTo,
    Gallery,
    Portrait
  }
});
</script>
