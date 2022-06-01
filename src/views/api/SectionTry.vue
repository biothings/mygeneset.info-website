<template>
  <AppSection>
    <AppHeading level="2">Try It Out</AppHeading>

    <!-- list of demo request options -->
    <AppChecklist v-model="requests" :single="true" />

    <!-- request command code box -->
    <code ref="codeBlock" data-big="true">
      <span>{{ selected?.method }}</span>
      <span>&nbsp;</span>
      <span>{{ base }}</span>
      <span>{{ selected?.path }}</span>
      <template
        v-for="(field, index) in selected?.fields"
        :key="selected?.label + ' ' + index"
      >
        <template v-if="field.name">
          <span v-tippy="field.tooltip">{{ field.name }}</span>
          <span>=</span>
        </template>
        <AppCodeInput
          v-if="field.value"
          v-model="field.value"
          v-tippy="field.tooltip"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
        <span v-if="index < (selected?.fields?.length || 0) - 1">&</span>
      </template>
    </code>

    <!-- note -->
    <i>
      Most fields support
      <AppLink
        to="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html"
        >standard Elasticsearch query syntax</AppLink
      >, like <code>*</code> for wildcards
    </i>

    <!-- action buttons -->
    <AppFlex>
      <AppButton icon="copy" text="Copy Command" :copy="command" />
      <AppButton
        v-tippy="'Run request and get response'"
        icon="play"
        text="Run"
        design="big"
        @click="run"
      />
    </AppFlex>

    <!-- status -->
    <AppStatus v-if="loading" status="loading">Loading response</AppStatus>

    <!-- response -->
    <template v-if="response">
      <!-- response data -->
      <VueJsonPretty
        ref="vjp"
        :data="response"
        :deep="1"
        :deep-collapse-children="true"
        :show-length="true"
      />

      <!-- response buttons -->
      <AppFlex>
        <AppButton
          icon="copy"
          text="Copy Response"
          :copy="JSON.stringify(response || {}, null, 2)"
        />
        <AppButton
          v-tippy="'Download response as .json file'"
          icon="download"
          text="Download"
          design="big"
          :disabled="loading"
          @click="() => downloadJson(response || {}, 'response')"
        />
      </AppFlex>
    </template>
  </AppSection>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import AppChecklist from "@/components/AppChecklist.vue";
import AppCodeInput from "@/components/AppCodeInput.vue";
import AppStatus from "@/components/AppStatus.vue";
import { request } from "@/api";
import { downloadJson } from "@/util/download";
import { useMutationObserver } from "@vueuse/core";

// field within a request
interface Field {
  name: string;
  value: string;
  tooltip: string;
}

// a type of demo request
interface Request {
  label: string;
  checked: boolean;
  tooltip: string;
  method: string;
  path: string;
  fields?: Array<Field>;
}

// base request url
const base = "https://mygeneset.info/v1/";

// list of demo requests, with types, fields, and descriptions
const requests = ref<Array<Request>>([
  {
    label: "Get fields",
    checked: false,
    tooltip: "A list of all available fields in mygeneset.info",
    method: "GET",
    path: "metadata/fields",
  },
  {
    label: "Get metadata",
    checked: false,
    tooltip: "Various info about the mygeneset.info database itself",
    method: "GET",
    path: "metadata/",
  },
  {
    label: "Lookup by id",
    checked: false,
    tooltip:
      "How to lookup the info of a geneset when you know its mygenset.info id",
    method: "GET",
    path: "geneset/",
    fields: [
      {
        name: "",
        value: "WP661",
        tooltip: "mygenset.info id of geneset",
      },
    ],
  },
  {
    label: "Search by keyword",
    checked: true,
    tooltip: "How to search for gensets by keywords",
    method: "GET",
    path: "query/?",
    fields: [
      {
        name: "q",
        value: "glucose",
        tooltip: "What to search for",
      },
      {
        name: "fields",
        value: "taxid,genes.name",
        tooltip: "A list of fields to return from each geneset",
      },
      {
        name: "size",
        value: "10",
        tooltip: "How many results to return",
      },
    ],
  },
  {
    label: "Batch search",
    checked: false,
    tooltip: "How to search for a list of genesets",
    method: "POST",
    path: "query/?",
    fields: [
      {
        name: "q",
        value: "P13671,P00813,Q01740",
        tooltip: "A list of separate searches",
      },
      {
        name: "scopes",
        value: "taxid,genes.uniprot",
        tooltip: "A list of fields to search",
      },
      {
        name: "fields",
        value: "taxid,genes.name",
        tooltip: "A list of fields to return from each geneset",
      },
      {
        name: "size",
        value: "1",
        tooltip: "How many results to return (in this case, per search)",
      },
    ],
  },
]);

// request command/code
const command = ref("");

// selected demo request
const selected = computed(() =>
  requests.value.find((request) => request.checked)
);

// code block element
const codeBlock = ref<HTMLElement>();

// get code content of block, including children textboxes
const setCommand = async () => {
  await nextTick();

  let text = "";
  const children = codeBlock.value?.children || [];
  for (const child of children) {
    text +=
      (child as HTMLElement).innerText || (child as HTMLInputElement).value;
  }
  command.value = text;
};

// when selected request or field values change, re-get command text
watch(requests, setCommand, { deep: true, immediate: true });

// loading state
const loading = ref(false);

// response state
const response = ref<{}>();

// run request
const run = async () => {
  // reset response
  response.value = undefined;

  // status
  loading.value = true;

  const method = selected?.value?.method || "";
  const url = command.value.replace(method, "").trim();
  try {
    response.value = await request(url, { method });
  } catch (error) {
    console.error(error);
    response.value = undefined;
  }

  // status
  loading.value = false;
};

// when type of selected request changes, reset response result so there is
// never a mismatch between input and response
watch(requests, () => (response.value = undefined), {
  deep: true,
  immediate: true,
});

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
  color: $white;
  background: $off-black;

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
