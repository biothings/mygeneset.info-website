<template>
  <AppSection>
    <AppHeading level="2" link="try">Try It Out</AppHeading>

    <!-- list of demo request options -->
    <AppFlex gap="small">
      <AppChecklist v-model="requests" :single="true" name="request-types" />
    </AppFlex>

    <!-- request command code box -->
    <AppCode
      ref="codeBlock"
      flow="block"
      heading="Edit me!"
      @text="(value) => (command = value)"
    >
      <!-- static text -->
      <span>{{ selected?.method }}</span>
      <span>&nbsp;</span>
      <span>{{ base }}</span>
      <span>{{ selected?.path }}</span>

      <!-- editable fields -->
      <template
        v-for="(field, index) in selected?.fields"
        :key="selected?.text + ' ' + index"
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
    </AppCode>

    <!-- note -->
    <i>
      Most fields support
      <AppLink
        to="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html"
        >standard Elasticsearch query syntax</AppLink
      >, like <AppCode>*</AppCode> for wildcards
    </i>

    <!-- action buttons -->
    <AppFlex>
      <AppButton
        icon="copy"
        text="Copy Command"
        :copy="command"
        fill="filled"
        size="big"
      />
      <AppButton
        v-tippy="'Run request and get response'"
        icon="play"
        text="Run"
        fill="filled"
        size="big"
        @click="run"
      />
    </AppFlex>

    <!-- status -->
    <AppStatus v-if="loading" status="loading">Loading response</AppStatus>

    <!-- response -->
    <template v-if="response">
      <!-- response data -->
      <AppJson :data="response" />

      <!-- response buttons -->
      <AppFlex>
        <AppButton
          icon="copy"
          text="Copy Response"
          fill="filled"
          size="big"
          :copy="JSON.stringify(response || {}, null, 2)"
        />
        <AppButton
          v-tippy="'Download response as .json file'"
          icon="download"
          text="Download"
          fill="filled"
          size="big"
          :disabled="loading"
          @click="() => downloadJson(stringifyJson(response || {}), 'response')"
        />
      </AppFlex>
    </template>
  </AppSection>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import AppChecklist from "@/components/AppChecklist.vue";
import AppCodeInput from "@/components/AppCodeInput.vue";
import AppStatus from "@/components/AppStatus.vue";
import AppCode from "@/components/AppCode.vue";
import AppJson from "@/components/AppJson.vue";
import { isStale, request } from "@/api";
import { downloadJson, stringifyJson } from "@/util/download";

// field within a request
interface Field {
  name: string;
  value: string;
  tooltip: string;
}

// a type of demo request
interface Request {
  text: string;
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
    text: "Get fields",
    checked: false,
    tooltip: "A list of all available fields in mygeneset.info",
    method: "GET",
    path: "metadata/fields",
  },
  {
    text: "Get metadata",
    checked: false,
    tooltip: "Various info about the mygeneset.info database itself",
    method: "GET",
    path: "metadata/",
  },
  {
    text: "Lookup by id",
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
    text: "Search by keyword",
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
    text: "Batch search",
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

// loading state
const loading = ref(false);

// response state
const response = ref();

// run request
const run = async () => {
  // reset response
  response.value = undefined;

  // status
  loading.value = true;

  const method = selected?.value?.method || "";
  const url = command.value.replace(method, "").trim();
  const type = "tryItNow";
  try {
    response.value = await request(url, type, { method });
  } catch (error) {
    console.error(error);

    if (isStale(error)) return;

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
</script>
