<template>
  <div class="gallery">
    <slot></slot>
  </div>
</template>

<style scope lang="scss">
.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
  justify-content: center;
  justify-items: center;
  margin: 40px 0;

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
