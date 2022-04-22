<template>
  <!-- recursive, indented, collapsible JSON display -->

  <!-- root level -->
  <div class="row" :expanded="expanded" @click="expanded = !expanded">
    <PrettyJsonIndent :depth="depth || 0" />
    <span class="key" v-if="rootKey && !parentIsArray">"{{ rootKey }}"</span>
    <span class="pretty_punc" v-if="rootKey && !parentIsArray">: </span>
    <span class="pretty_punc">{{ isArray ? "[" : "{" }}</span>
    <span class="pretty_punc" v-if="!expanded">...</span>
    <span class="pretty_punc" v-if="!expanded">{{ isArray ? "]" : "}" }}</span>
    <span class="pretty_punc" v-if="!expanded && depth && !isLast">,</span>
  </div>

  <!-- child levels -->
  <template v-if="expanded">
    <template class="row" v-for="(value, key, index) in data" :key="key">
      <!-- child is another object-->
      <PrettyJson
        v-if="typeof value === 'object'"
        :data="value"
        :rootKey="key"
        :depth="(depth || 0) + 1"
        :isLast="
          isArray
            ? key === data.length - 1
            : index === Object.keys(data).length - 1
        "
        :parentIsArray="isArray"
      />

      <!-- child is a primitive -->
      <div v-else class="row">
        <PrettyJsonIndent :depth="(depth || 0) + 1" />
        <span class="key" v-if="!isArray">"{{ key }}"</span>
        <span class="pretty_punc" v-if="!isArray">: </span>
        <span class="value">
          {{ typeof value === "string" ? '"' + value + '"' : String(value) }}
        </span>
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

  <!-- root close if expanded -->
  <div class="row" v-if="expanded">
    <PrettyJsonIndent :depth="depth || 0" />
    <span class="pretty_punc">{{ isArray ? "]" : "}" }}</span>
    <span class="pretty_punc" v-if="depth && !isLast">,</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrettyJsonIndent from "@/components/PrettyJsonIndent.vue";

export default defineComponent({
  name: "PrettyJson",
  props: {
    // JSON data
    data: Object,
    // key name at root level
    rootKey: [String, Number],
    // current depth/level
    depth: Number,
    // is last in iterable
    isLast: Boolean,
    // is parent an array
    parentIsArray: Boolean
  },
  data() {
    return {
      // expanded state of current level
      expanded: true
    };
  },
  computed: {
    // is current level an array
    isArray(): boolean {
      return Array.isArray(this.data);
    }
  },
  components: {
    PrettyJsonIndent
  }
});
</script>

<style scope lang="scss">
.row {
  white-space: nowrap;

  &[expanded]:hover {
    cursor: pointer;
    background: $dark-gray;
  }
}
.key {
  color: $yellow;
}
.value {
  color: $theme-light;
}
</style>
