<template>
  <!-- gallery of items (e.g. features, org logos, etc.) -->
  <div class="gallery">
    <slot></slot>
  </div>
</template>

<style scope lang="scss">
.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  justify-content: center;
  justify-items: center;
  margin: 40px 0;
  @include trim-v-margins;

  @media (max-width: $tablet) {
    & {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: $phone) {
    & {
      grid-template-columns: 1fr;
    }
  }
}
</style>
