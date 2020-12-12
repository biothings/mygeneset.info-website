<template>
  <Section>
    <h2 id="contact">Contact</h2>
    <div class="contact_grid">
      <Clickable
        to="mailto:biothings@googlegroups.com"
        icon="far fa-envelope"
        text="Email Us"
        design="slim"
      />
      <span
        >Write us at
        <LinkTo to="mailto:biothings@googlegroups.com"
          >biothings@googlegroups.com</LinkTo
        ></span
      >
      <Clickable
        to="https://github.com/biothings/mygeneset.info/"
        icon="fab fa-github"
        text="Bug Us"
        design="slim"
      />
      <span
        >Report bugs and request features on
        <LinkTo to="https://github.com/biothings/mygeneset.info"
          >GitHub</LinkTo
        ></span
      >
      <Clickable
        to="https://twitter.com/mygenesetinfo/"
        icon="fab fa-twitter"
        text="Tweet Us"
        design="slim"
      />
      <span
        >Ask us a question on
        <LinkTo to="https://twitter.com/mygenesetinfo/">Twitter</LinkTo></span
      >
      <Clickable
        to="https://biostars.org/"
        icon="far fa-comment"
        text="Tweet Us"
        design="slim"
      />
      <span
        >Post a question on
        <LinkTo to="https://www.biostars.org/">biostars.org</LinkTo>
        with the tag #mygeneset</span
      >
    </div>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import LinkTo from "@/components/LinkTo.vue";
import Clickable from "@/components/Clickable.vue";

export default defineComponent({
  components: {
    Section,
    LinkTo,
    Clickable
  }
});
</script>

<style scope lang="scss">
.contact_grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
  justify-items: stretch;
  align-items: center;

  & > * {
    margin: 0;
  }

  @media (max-width: $phone) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
