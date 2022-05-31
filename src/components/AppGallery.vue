<!--
  gallery of items (e.g. features, org logos, etc.)
-->

<template>
  <div class="gallery">
    <slot></slot>
  </div>
</template>

<style scope lang="scss">
$tablet: 600px;
$phone: 400px;

.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px 60px;
  justify-content: center;
  justify-items: center;

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
