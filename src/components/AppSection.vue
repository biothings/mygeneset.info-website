<!--
  section that spans width of screen and holds page content  
-->

<template>
  <section><slot /></section>
</template>

<style scoped lang="scss">
section {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  padding: 50px max(40px, calc((100% - $section) / 2));
  text-align: center;
  transition: background $fast;

  &:nth-child(even) {
    background: $off-white;
  }

  &:nth-child(odd) {
    background: $white;
  }

  &:last-child {
    flex-grow: 1;
  }
}
</style>
