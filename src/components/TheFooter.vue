<!--
  footer at bottom of every page
-->

<template>
  <footer class="footer">
    <!-- left section (social links) -->
    <div class="left">
      <AppLink class="link" to="https://github.com/biothings/mygeneset.info/">
        <AppIcon icon="github" />
      </AppLink>
      <AppLink class="link" to="https://twitter.com/mygenesetinfo">
        <AppIcon icon="twitter" />
      </AppLink>
      <AppLink class="link" to="https://mygeneset.info/about#contact">
        <AppIcon icon="envelope" />
      </AppLink>
    </div>

    <!-- middle section (links) -->
    <div class="center">
      <AppLink to="/about#terms">Terms of Use</AppLink> |
      <AppLink to="/about#cite">How to Cite</AppLink>
    </div>

    <!-- right section (copyright) -->
    <div class="right">&copy; {{ new Date().getFullYear() }} BioThings</div>
  </footer>
</template>

<style scoped lang="scss">
$breakpoint: 400px;

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: $theme-pale;

  & > * {
    flex-basis: 0;
    flex-grow: 1;
  }
}

.link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.left {
  display: flex;
  align-items: center;
  gap: 5px;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}

@media (max-width: $breakpoint) {
  .footer {
    flex-direction: column;
  }

  .center,
  .right {
    text-align: center;
  }
}
</style>
