<template>
  <input
    class="text_box"
    v-model="message"
    v-bind:placeholder="placeholder"
    v-bind:name="name"
    v-bind:type="type || 'text'"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    placeholder: String,
    name: String,
    type: String
  }
});
</script>

<style scope lang="scss">
.text_box {
  height: 30px;
  padding: 0 10px;
  background: $white;
  border: solid $light-gray 2px;
  border-radius: 5px;
  transition: border-color $fast;

  &:hover,
  &:focus {
    border-color: $black;
  }
}
</style>
