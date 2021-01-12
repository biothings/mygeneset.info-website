<template>
  <Section>
    <h2 id="cite">How to Cite</h2>
    <p class="citation">
      <b
        >High-performance web services for querying gene and variant annotation </b
      ><br />
      Xin J, Mark A, Afrasiabi C, Tsueng G, Juchler M, Gopal N, Stupp GS, Putman
      TE, Ainscough BJ, Griffith OL, Torkamani A, Whetzel PL, Mungall CJ, Mooney
      SD, Su AI, Wu C<br />
      Genome Biology &ndash; 2016
    </p>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";

export default defineComponent({
  components: {
    Section
  }
});
</script>

<style scoped lang="scss">
.citation {
  padding: 20px;
  border: dashed 2px $gray;
}
</style>
