<template>
  <main>
    <slot></slot>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  & > *:last-child {
    flex-grow: 1;
  }
}
</style>
