<!--
  header at top of every page
-->

<template>
  <header class="header" :data-home="home">
    <!-- cool visualization -->
    <TheHexField v-if="home" />

    <!-- expand button on mobile screens -->
    <button class="button" @click="expanded = !expanded">
      <AppIcon :icon="expanded ? 'times' : 'bars'" />
    </button>

    <!-- left section (nav bar) -->
    <nav class="nav" :data-expanded="expanded">
      <AppLink class="link" to="/browse">Browse</AppLink>
      <AppLink class="link" to="/build">Build</AppLink>
      <AppLink class="link" to="/api">API</AppLink>
      <AppLink class="link" to="/about">About</AppLink>
      <AppLink class="link" to="https://biothings.io">BioThings</AppLink>
    </nav>

    <!-- center section (logo)-->
    <router-link to="/" class="center">
      <TheLogo class="logo" />
      <h1 class="title">MyGeneset</h1>
      <div v-if="home" class="slogan">Collect, save, and share genes</div>
    </router-link>

    <!-- right section (account stuff) -->
    <div class="account" :data-expanded="expanded">
      <template v-if="loggedIn">
        <AppLink class="link" @click.prevent="logout">Log Out</AppLink>
        <AppLink
          v-tippy="`Your user profile, ${name}`"
          class="avatar"
          to="/user"
        >
          <img v-if="avatar" :src="avatar" />
          <div v-else>
            {{ userInitials }}
          </div>
        </AppLink>
      </template>
      <template v-else>
        <AppLink class="link" to="/login">Log In</AppLink>
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import TheHexField from "@/components/TheHexField.vue";
import { logout } from "@/api/login";
import AppIcon from "./AppIcon.vue";
import TheLogo from "@/assets/TheLogo.vue";

const route = useRoute();
const store = useStore();

// is menu expanded (in mobile mode)
const expanded = ref(false);

// are we on home page
const home = computed(() => route.name === "Home");
// are we logged in
const loggedIn = computed(() => store.state.loggedIn);
// user's avatar
const avatar = computed(() => store.state.loggedIn?.avatar || "");
// user's full name
const name = computed(() => store.state.loggedIn?.name);
// user's initials
const userInitials = computed(() =>
  store.state.loggedIn?.name
    .split(/\s/)
    .filter((w: string) => w)
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
);
</script>

<style scoped lang="scss">
$breakpoint: 600px;

.header {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: $theme-pale;
  text-align: center;
  overflow: hidden;

  & > * {
    flex-basis: 0;
    flex-grow: 1;
    z-index: 1;
  }
}

.button {
  display: none;
  justify-content: center;
  align-items: center;
}

.nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}

.link {
  position: relative;
  padding: 5px;
  color: $black !important;
  text-decoration: none;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: $black;
    opacity: 0;
    transition: opacity $fast;
  }

  &:hover:after {
    opacity: 1;
  }
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: $black;
  text-decoration: none;
}

.logo {
  height: 40px;
}

.title {
  font-size: 1.1rem;
  font-weight: $medium;
  text-transform: uppercase;
}

.slogan {
  display: none;
}

.account {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px !important;
  height: 40px !important;
  margin-left: 10px;
  border-radius: 100%;
  background: $theme;
  color: $white;
  font-weight: $medium;
  text-decoration: none;
  transition: background $fast;
  overflow: hidden;

  &:hover {
    background: $theme-light;
  }

  img {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
  }
}

@media not all and (max-width: $breakpoint) {
  .header[data-home="true"] {
    align-items: flex-start;
    flex-wrap: wrap;

    .center {
      flex-direction: column;
      flex-basis: 100%;
      order: 1;
      margin-bottom: 20px;
    }

    .logo {
      height: 100px;
    }

    .title {
      font-size: 1.4rem;
    }

    .slogan {
      display: block;
    }
  }
}

@media (max-width: $breakpoint) {
  .header {
    flex-direction: column;
    padding: 10px;
  }

  .button {
    display: flex;
    position: absolute;
    right: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
  }

  .nav {
    align-items: stretch;
    flex-direction: column;
  }

  .nav[data-expanded="false"] {
    display: none;
  }

  .account[data-expanded="false"] {
    display: none;
  }

  .center {
    // align-self: flex-start;
    order: -1;
  }
}
</style>
