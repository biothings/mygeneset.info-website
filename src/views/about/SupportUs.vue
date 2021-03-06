<template>
  <Section>
    <h2 id="support">Support Us</h2>
    <p>
      The tools created by the BioThings collaboration are funded by grants from
      the
      <a href="https://www.genome.gov/"
        >National Human Genome Research Institute</a
      >
      (R01 HG010067), the
      <a href="https://www.nigms.nih.gov/"
        >National Institute of General Medical Sciences</a
      >
      (R01 GM083924), the
      <a href="https://ncats.nih.gov/translator"
        >National Center for Advancing Translational Sciences</a
      >
      (OT2TR003445), and the
      <a href="https://www.moore.org/">Gordon and Betty Moore Foundation</a>
      (GBMF 4552). Although the individual data sources included in these tools
      may be subject to restrictions, the tools themselves are free and we would
      like them to remain that way. If you found our tools useful, please help
      support us by spreading the word and demonstrating its value:
    </p>
    <Center class="buttons">
      <a
        href="https://twitter.com/mygenesetinfo?ref_src=twsrc%5Etfw"
        class="twitter-follow-button"
        data-size="large"
        data-show-count="false"
        >Follow @mygenesetinfo</a
      >
      <component
        :is="'script'"
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
        type="application/javascript"
      ></component>
      <a
        class="github-button"
        href="https://github.com/biothings"
        data-size="large"
        data-show-count="true"
        aria-label="Follow @biothings on GitHub"
        >Follow @biothings</a
      >
      <a
        class="github-button"
        href="https://github.com/biothings/mygeneset.info"
        data-size="large"
        data-show-count="true"
        aria-label="Star biothings/mygeneset.info on GitHub"
        >Star</a
      >
      <component
        :is="'script'"
        async
        defer
        src="https://buttons.github.io/buttons.js"
      ></component>
      <Clickable
        to="https://biothings.io/branding"
        text='"Powered by" Branding'
        design="slim"
      />
      <Clickable to="#cite" text="Cite Us" design="slim" />
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

<style scope lang="scss">
.buttons {
  & > span {
    height: 27px;
  }
}
</style>
