<template>
  <div
    class="pretty_row"
    v-bind:expanded="expanded"
    @click="expanded = !expanded"
  >
    <PrettyJsonIndent v-bind:depth="depth || 0" />
    <span class="pretty_key" v-if="rootKey && !parentIsArray"
      >"{{ rootKey }}"</span
    >
    <span class="pretty_punc" v-if="rootKey && !parentIsArray">: </span>
    <span class="pretty_punc">{{ isArray ? "[" : "{" }}</span>
    <span class="pretty_punc" v-if="!expanded">...</span>
    <span class="pretty_punc" v-if="!expanded">{{ isArray ? "]" : "}" }}</span>
    <span class="pretty_punc" v-if="!expanded && depth && !isLast">,</span>
  </div>
  <template v-if="expanded">
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
        v-bind:isLast="
          isArray
            ? key === data.length - 1
            : index === Object.keys(data).length - 1
        "
        v-bind:parentIsArray="isArray"
      />
      <div class="pretty_row" v-else>
        <PrettyJsonIndent v-bind:depth="(depth || 0) + 1" />
        <span class="pretty_key" v-if="!isArray">"{{ key }}"</span>
        <span class="pretty_punc" v-if="!isArray">: </span>
        <span class="pretty_value">{{
          typeof value === "string" ? '"' + value + '"' : value
        }}</span>
        <span
          v-if="
            isArray
              ? key < data.length - 1
              : index < Object.keys(data).length - 1
          "
          >,</span
        >
      </div>
    </template>
  </template>
  <div class="pretty_row" v-if="expanded">
    <PrettyJsonIndent v-bind:depth="depth || 0" />
    <span class="pretty_punc">{{ isArray ? "]" : "}" }}</span>
    <span class="pretty_punc" v-if="depth && !isLast">,</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrettyJsonIndent from "./PrettyJsonIndent.vue";

export default defineComponent({
  name: "PrettyJson",
  props: {
    data: Object,
    rootKey: [String, Number],
    depth: Number,
    isLast: Boolean,
    parentIsArray: Boolean
  },
  data: function() {
    return {
      expanded: true
    };
  },
  computed: {
    isArray: function(): boolean {
      return Array.isArray(this.data);
    }
  },
  components: { PrettyJsonIndent }
});
</script>

<style scope lang="scss">
.pretty_row {
  white-space: nowrap;

  &[expanded]:hover {
    cursor: pointer;
    background: $dark-gray;
  }
}
.pretty_key {
  color: $yellow;
}
.pretty_value {
  color: $accent;
}
</style>
