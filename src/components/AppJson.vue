<template>
  <VueJsonPretty
    :data="data"
    :deep="1"
    :deep-collapse-children="true"
    :show-length="true"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useMutationObserver } from "@vueuse/core";
import VueJsonPretty from "vue-json-pretty";
import { JSONDataType } from "vue-json-pretty/types/utils";
import "vue-json-pretty/lib/styles.css";

interface Props {
  // json data to show
  data: JSONDataType;
}

defineProps<Props>();

// dirty hack to add carets to VueJsonPretty
// https://github.com/leezng/vue-json-pretty/issues/169
const vjp = ref(null);
const updateBrackets = () => {
  for (const element of document.querySelectorAll(".vjs-tree__brackets")) {
    const bracket = element as HTMLElement;
    const text = bracket.innerText.trim();
    const starts = text.startsWith("{") || text.startsWith("[");
    const ends = text.endsWith("}") || text.endsWith("]");
    bracket.dataset.debug = [text, starts, ends].join(" ");
    if (starts && ends) bracket.dataset.action = "expand";
    else if (starts) bracket.dataset.action = "collapse";
    else bracket.dataset.action = "";
  }
};
watch(vjp, updateBrackets);
useMutationObserver(vjp, updateBrackets, { subtree: true, childList: true });
</script>

<!-- override VueJsonPretty styles -->
<style lang="scss">
.vjs-tree {
  width: 100%;
  padding: 20px;
  background: $off-black;
  color: $white;
  border-radius: $rounded;
  font-size: 1rem;

  * {
    font-family: $mono;
  }
}

.vjs-tree__node:hover {
  background: #ffffff10;
}

.vjs-key {
  color: $light-gray;
  white-space: pre;
}

.vjs-tree__brackets {
  color: $gray;

  &:hover {
    color: $yellow;
  }
}

.vjs-comment {
  color: $gray;
}

.vjs-value__number {
  color: $blue-light;
}

.vjs-value__string {
  color: $purple-light;
}

.vjs-tree__indent.has-line {
  border: none;
  border-left: solid 1px #ffffff20 !important;
}

.vjs-tree__brackets:before {
  color: $dark-gray;
}

.vjs-tree__brackets:hover:before {
  color: $yellow;
}

.vjs-tree__brackets[data-action="collapse"]:before {
  content: "▾ ";
}

.vjs-tree__brackets[data-action="expand"]:before {
  content: "▸ ";
}
</style>
