<template>
  <router-link to="/" class="logo" :big="big">
    <img src="@/assets/logo.svg" />
    <div class="title">My Geneset</div>
    <div v-if="big" class="slogan">
      Collect, save, and share genes
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    big: Boolean
  }
});
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $black;
  text-decoration: none;
  text-align: center;

  img {
    height: 40px;
    margin: 0 10px;
  }

  .title {
    font-size: 1.1rem;
    font-weight: $medium;
    text-transform: uppercase;
  }

  .slogan {
    margin-top: 5px;
  }

  @media (max-width: $tablet) {
    order: -1;
    flex-basis: 100%;
    margin-bottom: 20px;
  }

  &[big="true"] {
    flex-direction: column;
    flex-basis: 100%;
    order: 1;
    margin-top: 20px;
    margin-bottom: 60px;

    img {
      height: 100px;
      margin-bottom: 20px;
    }

    .title {
      font-size: 1.5rem;
    }

    @media (max-width: $phone) {
      order: -1;
      margin-top: 0;
      margin-bottom: 20px;
    }
  }
}
</style>
