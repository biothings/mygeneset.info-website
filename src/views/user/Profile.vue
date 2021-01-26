<template>
  <Section v-if="loggedIn">
    <h2>{{ userName }}</h2>
    <div class="details">
      <div>
        <i class="far fa-envelope"></i>
        <span>Email</span>
      </div>
      <div>{{ email }} (linked with {{ account }})</div>
      <div>
        <i class="fas fa-dna"></i>
        <span>Your Genesets</span>
      </div>
      <LinkTo to="/build">
        {{ genesets.toLocaleString() }} genesets with
        {{ genes.toLocaleString() }} genes
      </LinkTo>
      <div>
        <i class="fas fa-database"></i>
        <span>API Token</span>
      </div>
      <div>{{ apiToken }}</div>
    </div>
  </Section>
  <Section v-else>
    <Center width="250px">
      <Clickable
        to="/login"
        icon="fas fa-sign-in-alt"
        text="Log In"
        design="big"
      />
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import LinkTo from "@/components/LinkTo.vue";
import Clickable from "@/components/Clickable.vue";

export default defineComponent({
  components: {
    Section,
    Center,
    LinkTo,
    Clickable
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    userName() {
      return this.$store.state.userName;
    },
    email() {
      return this.$store.state.email;
    },
    account() {
      return this.$store.state.account;
    },
    apiToken() {
      return this.$store.state.apiToken;
    },
    genesets() {
      return 45;
    },
    genes() {
      return 10283;
    }
  }
});
</script>

<style scoped lang="scss">
.details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: $phone) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
