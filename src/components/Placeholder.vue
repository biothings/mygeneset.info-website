<template>
  <!-- placeholder rectangle. to eventually be deleted. -->
  <p class="placeholder">
    <span>
      <slot></slot>
    </span>
  </p>
</template>

<style scope lang="scss">
.placeholder {
  height: 200px;
  background: $light-gray;
  text-align: center;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
