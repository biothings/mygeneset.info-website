<template>
  <AppSection>
    <AppHeading level="2" icon="user">{{
      $store.state.loggedIn?.name
    }}</AppHeading>

    <div class="details">
      <!-- your genesets -->
      <div>
        <AppIcon icon="dna" class="icon fa-fw" />
        <span>Your Genesets</span>
      </div>
      <AppLink to="/build"
        >{{
          $store.state.loggedIn?.genesetCount?.toLocaleString() || "-"
        }}
        genesets</AppLink
      >

      <!-- service linked -->
      <div>
        <AppIcon icon="link" class="icon fa-fw" />
        <span>Linked with</span>
      </div>
      <div>{{ $store.state.loggedIn?.provider || "-" }}</div>

      <!-- username -->
      <div>
        <AppIcon icon="user" class="icon fa-fw" />
        <span>Username</span>
      </div>
      <div>{{ $store.state.loggedIn?.username || "-" }}</div>

      <!-- email -->
      <div>
        <AppIcon icon="envelope" class="icon fa-fw" />
        <span>Email</span>
      </div>
      <div>{{ $store.state.loggedIn?.email || "-" }}</div>

      <!-- organization -->
      <div>
        <AppIcon icon="school" class="icon fa-fw" />
        <span>Organization</span>
      </div>
      <div>{{ $store.state.loggedIn?.organization || "-" }}</div>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
$breakpoint: 400px;

.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  text-align: left;

  @media (max-width: $breakpoint) {
    grid-template-columns: 1fr;
  }
}

.icon {
  color: $dark-gray;
  margin-right: 1em;
}
</style>
