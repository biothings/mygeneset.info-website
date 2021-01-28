<template>
  <Section>
    <HeroComponent icon="fas fa-dna">
      <template v-slot:ATop>Status: UP</template>
      <template v-slot:ABottom
        ><LinkTo to="https://stats.uptimerobot.com/7y2AFWAE/142169"
          >see status/uptime details</LinkTo
        ></template
      >
      <template v-slot:BTop>100%</template>
      <template v-slot:BBottom>uptime in last 24 hours</template>
    </HeroComponent>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import LinkTo from "@/components/LinkTo.vue";
import HeroComponent from "@/components/Hero.vue";

export default defineComponent({
  components: {
    Section,
    LinkTo,
    HeroComponent
  }
});
</script>
