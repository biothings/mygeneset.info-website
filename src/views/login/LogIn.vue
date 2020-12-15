<template>
  <Section>
    <Center class="login" v-bind:vertical="true">
      <Clickable
        v-if="!withEmail"
        icon="fas fa-graduation-cap"
        text="With ORCID"
        design="big"
      />
      <Clickable
        v-if="!withEmail"
        icon="fab fa-github"
        text="With GitHub"
        design="big"
      />
      <Clickable
        v-if="!withEmail"
        icon="far fa-envelope"
        text="With Email"
        design="big"
        @click="toggleWithEmail"
      />
      <hr v-if="!withEmail" />
      <Clickable
        v-if="!withEmail"
        to="/guest"
        icon="fas fa-ghost"
        text="Use as Guest"
        design="big"
      />
      <Clickable
        v-if="withEmail"
        icon="fas fa-arrow-left"
        text="Log in a different way"
        design="plain"
        @click="toggleWithEmail"
      />
      <TextBox v-if="withEmail" type="email" name="email" placeholder="email" />
      <TextBox
        v-if="withEmail"
        type="password"
        name="password"
        placeholder="password"
      />
      <Clickable
        v-if="withEmail"
        icon="fas fa-sign-in-alt"
        text="Log In"
        design="big"
      />
      <LinkTo v-if="withEmail" to="/password-reset">Forgot Password</LinkTo>
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import TextBox from "@/components/TextBox.vue";
import LinkTo from "@/components/LinkTo.vue";

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable,
    TextBox,
    LinkTo
  },
  data: () => ({
    withEmail: false
  }),
  methods: {
    toggleWithEmail: function() {
      this.withEmail = !this.withEmail;
    }
  }
});
</script>

<style scoped lang="scss">
.login {
  text-align: center;

  & > * {
    width: 250px;
    max-width: 100%;
  }
}
</style>
