<template>
  <!-- user details -->
  <Section v-if="$store.state.loggedIn">
    <h2>{{ $store.state.name }}</h2>

    <div class="details">
      <i class="fas fa-link fa-fw"></i>
      <span>Linked with</span>
      <span>{{ $store.state.provider }}</span>

      <i class="far fa-user fa-fw"></i>
      <span>Username</span>
      <span>{{ $store.state.username }}</span>

      <i class="far fa-envelope fa-fw"></i>
      <span>Email</span>
      <span>{{ $store.state.email }}</span>

      <i class="fas fa-school fa-fw"></i>
      <span>Organization</span>
      <span>{{ $store.state.organization }}</span>
    </div>
  </Section>

  <!-- link to log in page -->
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
import Clickable from "@/components/Clickable.vue";

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable
  }
});
</script>

<style scoped lang="scss">
.details {
  display: grid;
  grid-template-columns: 20px 1fr 2fr;
  grid-gap: 10px;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: $phone) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
