<template>
  <Section>
    <Center class="signup" :vertical="true">
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
        @click="withEmail = !withEmail"
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
        @click="withEmail = !withEmail"
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
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import TextBox from "@/components/TextBox.vue";

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable,
    TextBox
  },
  data: () => ({
    withEmail: false
  })
});
</script>

<style scoped lang="scss">
.signup {
  width: 250px;
}
</style>
