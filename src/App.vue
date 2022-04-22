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
  font-size: 1.3rem;
  margin: 30px 0;
  @include trim-v-margins;
}
h3 {
  text-align: center;
  font-weight: $medium;
  font-size: 1.2rem;
  margin: 20px 0;
  @include trim-v-margins;
}
h4 {
  text-align: left;
  font-weight: $medium;
  font-size: 1.1rem;
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
  color: $theme;
  transition: color $fast;
}
a:hover {
  color: $black;
}

// code block
code {
  padding: 2px 5px;
  border-radius: 5px;
  background: $off-black;
  white-space: pre;

  &,
  * {
    color: $white;
    font-family: $mono;
    font-style: normal;
  }
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
  box-sizing: border-box;
  background: none;
  border: none;
  font-size: 1rem;
}
input[type="checkbox"] {
  cursor: pointer;
}

// textarea
textarea {
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  background: none;
  color: $black;
}
textarea:not(:focus) {
  resize: none;
}

// placeholder for inputs/textareas/etc
::placeholder {
  opacity: 1;
  color: $gray;
}

// disabled buttons/inputs/etc
[disabled] {
  pointer-events: none;
  filter: saturate(0);
  opacity: 0.5;
}

// select
select {
  border: solid 2px $theme;
  border-radius: 5px;
  margin: 0;
  padding: 2px 5px;
  color: $black;
  font-size: 1rem;
  opacity: 1;
}

// label
label {
  cursor: pointer;
}

// list
ul {
  margin: 20px 0;
  line-height: 1.7;
  text-align: justify;
  padding-left: 30px;
  list-style-type: square;
}
li {
  padding-left: 10px;
}

// horizontal rule
hr {
  margin: 20px 0;
  height: 1px;
  background: $light-gray;
  border: none;
}

// checkbox and radio button
input[type="checkbox"],
input[type="radio"] {
  position: relative;
  appearance: none;
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  background: none;
  border: solid 2px $theme;
  cursor: pointer;

  &:checked {
    background: $theme;
  }

  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &[type="checkbox"] {
    border-radius: 5px;

    &:checked:after {
      width: 12px;
      height: 12px;
      background-image: url("./assets/check.svg");
    }
  }

  &[type="radio"] {
    border-radius: 100%;

    &:checked:after {
      width: 8px;
      height: 8px;
      background-image: url("./assets/radio.svg");
    }
  }
}

// font awesome icons
i + span {
  margin-left: 0.75em;
}

// tooltip
.tooltip {
  position: absolute;
  left: -999px;
  top: -999px;
  width: max-content;
  max-width: min(100%, 300px);
  padding: 8px 12px;
  background: $black;
  color: $white;
  border-radius: 5px;
  font-size: 0.9rem;
  opacity: 0;
  z-index: 999;
  pointer-events: none;
  transition: opacity $fast;

  &[data-show="true"] {
    opacity: 1;
  }
}

// util colors
.loading {
  color: $gray;
}
.error {
  color: $red;
}
</style>
