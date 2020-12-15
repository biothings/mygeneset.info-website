<template>
  <div class="pretty_row">
    <PrettyJsonIndent v-bind:depth="depth || 0" />
    <span class="pretty_key" v-if="rootKey">"{{ rootKey }}"</span>
    <span class="pretty_punc" v-if="rootKey">: </span>
    <span class="pretty_punc">{</span>
  </div>
  <template
    class="pretty_row"
    v-for="(value, key, index) in data"
    v-bind:key="key"
  >
    <PrettyJson
      v-if="typeof value === 'object'"
      v-bind:data="value"
      v-bind:rootKey="key"
      v-bind:depth="(depth || 0) + 1"
    />
    <div class="pretty_row" v-else>
      <PrettyJsonIndent v-bind:depth="(depth || 0) + 1" />
      <span class="pretty_key">"{{ key }}"</span>
      <span class="pretty_punc">: </span>
      <span class="pretty_value">{{ value }}</span>
      <span v-if="index < Object.keys(data).length - 1">,</span>
    </div>
  </template>
  <div class="pretty_row">
    <PrettyJsonIndent v-bind:depth="depth || 0" />
    <span class="pretty_punc">}</span>
    <span class="pretty_punc" v-if="depth">,</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrettyJsonIndent from "./PrettyJsonIndent.vue";

export default defineComponent({
  name: "PrettyJson",
  props: {
    data: Object,
    rootKey: String,
    depth: Number
  },
  components: { PrettyJsonIndent }
});
</script>

<style scope lang="scss">
.pretty_key {
  color: $yellow;
}
.pretty_value {
  color: $accent;
}
</style>
