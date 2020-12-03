<template>
  <router-view />
</template>

<style lang="scss">
// global css

// all items
* {
  font-family: $sans;
  box-sizing: border-box;
}

// main containers
html,
body,
#app {
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
}

// headings
h1 {
  text-align: center;
  font-weight: $medium;
  font-size: 1.5rem;
  margin: 40px 0;
  @include trim-v-margins;
}
h2 {
  text-align: center;
  font-weight: $medium;
  font-size: 1.5rem;
  margin: 40px 0;
  @include trim-v-margins;
}
h3 {
  text-align: center;
  font-weight: $medium;
  font-size: 1.5rem;
  margin: 30px 0;
  @include trim-v-margins;
}
h4 {
  text-align: left;
  font-weight: $regular;
  font-size: 1.2rem;
  margin: 20px 0;
  @include trim-v-margins;
}

// paragraphs
p {
  margin: 20px 0;
  line-height: 1.7;
  text-align: justify;
}

// links
a {
  color: $accent-dark;
  transition: color $fast;
}
a:hover {
  color: $black;
}

// buttons
button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: none;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

// input
input {
  background: none;
  border: none;
  font-size: 1rem;
}

// horizontal rule
hr {
  margin: 20px 0;
  height: 1px;
  background: $light-gray;
  border: none;
}

// font awesome icons
i + span {
  margin-left: 10px;
}
</style>
