<template>
  <footer>
    <QuickLinks />
    <InfoLinks />
    <Copyright />
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QuickLinks from "@/components/QuickLinks.vue";
import InfoLinks from "@/components/InfoLinks.vue";
import Copyright from "@/components/Copyright.vue";

export default defineComponent({
  props: {
    big: Boolean
  },
  components: {
    QuickLinks,
    InfoLinks,
    Copyright
  }
});
</script>

<style scoped lang="scss">
footer {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  background: $theme-pale;

  & > * {
    flex-basis: 0;
    flex-grow: 1;
  }

  @media (max-width: $phone) {
    flex-direction: column;

    & > * {
      text-align: center;
      margin: 5px 0;
      @include trim-v-margins;
    }
  }
}
</style>
