<template>
  <Section>
    <h2 id="team">Team</h2>
    <p>
      MyGeneset was made by the
      <LinkTo to="https://biothings.io/">BioThings collaboration</LinkTo>, a
      cross-organization group that builds
      <LinkTo to="https://www.go-fair.org/fair-principles/">FAIR</LinkTo> tools
      for biomedical knowledge. This specific tool was made possible thanks to
      these contributors.
    </p>
    <Gallery>
      <Portrait
        name="Chunlei Wu"
        role="Principal Investigator"
        link="https://wulab.io/the-team-chunlei-wu"
        :image="chunlei"
      />
      <Portrait
        name="Casey Greene"
        role="Principal Investigator"
        link="https://greenelab.com/members/casey-greene.html"
        :image="casey"
      />
      <Portrait
        name="Ricardo Avila"
        role="Research Programmer"
        link="https://wulab.io/the-team-ricardo-avila"
        :image="ricardo"
      />
      <Portrait
        name="Dongbo Hu"
        role="Backend Developer"
        link="https://github.com/dongbohu"
        :image="dongbo"
      />
      <Portrait
        name="Xinghua (Jerry) Zhou"
        role="Research Programmer"
        link="https://wulab.io/the-team-jerry-zhou"
        :image="jerry"
      />
      <Portrait
        name="Vincent Rubinetti"
        role="Frontend Developer"
        link="https://greenelab.com/members/vincent-rubinetti.html"
        :image="vince"
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

import chunlei from "@/assets/team/chunlei.jpg";
import casey from "@/assets/team/casey.jpg";
import ricardo from "@/assets/team/ricardo.jpg";
import dongbo from "@/assets/team/dongbo.jpg";
import jerry from "@/assets/team/jerry.jpg";
import vince from "@/assets/team/vince.jpg";

export default defineComponent({
  components: {
    Section,
    LinkTo,
    Gallery,
    Portrait
  },
  data() {
    return {
      chunlei,
      casey,
      ricardo,
      dongbo,
      jerry,
      vince
    };
  }
});
</script>
