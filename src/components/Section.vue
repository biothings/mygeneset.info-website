<template>
  <!-- page section, with alternating bg colors -->
  <section>
    <div class="section">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  &:nth-child(odd) {
    background: $off-white;
  }
}
.section {
  box-sizing: border-box;
  max-width: $tablet;
  margin: 0 auto;
  padding: 40px;
}
</style>
