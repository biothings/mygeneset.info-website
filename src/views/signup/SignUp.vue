<template>
  <Section>
    <h1 id="signup">Sign Up</h1>
    <Center class="signup" v-bind:vertical="true">
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
        text="Sign up a different way"
        design="plain"
        @click="toggleWithEmail"
      />
      <TextBox
        v-if="withEmail"
        name="first name"
        placeholder="First/given name"
      />
      <TextBox
        v-if="withEmail"
        name="last name"
        placeholder="Last/family name"
      />
      <TextBox v-if="withEmail" type="email" name="email" placeholder="Email" />
      <TextBox
        v-if="withEmail"
        type="password"
        name="password"
        placeholder="Password"
      />
      <TextBox
        v-if="withEmail"
        type="password"
        name="re-enter password"
        placeholder="Re-enter password"
      />
      <Clickable
        v-if="withEmail"
        icon="far fa-user-circle"
        text="Sign Up"
        design="big"
      />
    </Center>
  </Section>
</template>

<script lang="ts">
import { ref } from "vue";
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import TextBox from "@/components/TextBox.vue";

const withEmail = ref(false);

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable,
    TextBox
  },
  data: () => ({
    withEmail
  }),
  methods: {
    toggleWithEmail: () => (withEmail.value = !withEmail.value)
  }
});
</script>

<style scoped lang="scss">
.signup {
  text-align: center;

  & > * {
    width: 250px;
    max-width: 100%;
  }
}
</style>
