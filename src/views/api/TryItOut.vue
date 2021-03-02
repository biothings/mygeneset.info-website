<template>
  <Section>
    <h2>Try it Out</h2>
    <Center>
      <Clickable
        v-for="(request, key, index) in requests"
        :key="index"
        @click="selected = key"
        :text="key"
        :selected="selected === key"
        design="plain"
        v-tooltip="request.tooltip"
      />
    </Center>
    <CodeBlock ref="codeBlock" :ariaLabel="code">
      <span>{{ method }}</span>
      <span>&nbsp;</span>
      <span>{{ base }}</span>
      <span>{{ path }}</span>
      <template
        v-for="({ name, example, tooltip }, index) in fields"
        :key="selected + index"
      >
        <span v-if="name" v-tooltip="tooltip">{{ name }}</span>
        <span v-if="name">=</span>
        <CodeInput
          v-if="example"
          :defaultValue="example"
          :sanitize="sanitize"
          :onChange="setCode"
          v-tooltip="tooltip"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
        <span v-if="index < fields.length - 1">&</span>
      </template>
    </CodeBlock>
    <Center>
      <i>
        Most fields support
        <a
          href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html"
          >standard Elasticsearch query syntax</a
        >, like <code>*</code> for wildcards
      </i>
    </Center>
    <Center width="150px">
      <CopyButton :text="this.code" subject="request" />
      <Clickable
        :icon="loading ? 'fas fa-spinner fa-spin' : 'fas fa-play'"
        :text="loading ? 'Loading' : 'Run'"
        design="big"
        @click="run"
        :disabled="loading"
        v-tooltip="'Run request and get response'"
      />
    </Center>
    <CodeBlock v-if="!empty">
      <PrettyJson :data="response" />
    </CodeBlock>
    <Center v-if="!empty" width="150px">
      <CopyButton
        :text="JSON.stringify(this.response, null, 2)"
        subject="response"
      />
      <Clickable
        icon="fas fa-download"
        text="Download"
        design="big"
        @click="download"
        :disabled="loading"
        v-tooltip="'Download response as .json file'"
      />
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { nextTick } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import CodeBlock from "@/components/CodeBlock.vue";
import CodeInput from "@/components/CodeInput.vue";
import PrettyJson from "@/components/PrettyJson.vue";
import CopyButton from "@/components/CopyButton.vue";
import { downloadJson } from "@/util/download";
import { request } from "@/api";

interface Field {
  name: string;
  example: string;
  tooltip: string;
}

interface Request {
  method: string;
  path: string;
  fields?: Field[];
  tooltip: string;
}

interface Requests {
  [index: string]: Request;
}

interface CodeBlockInterface {
  getCode: () => string;
}

const base = "https://mygeneset.info/v1/";

const requests: Requests = {
  "Get fields": {
    method: "GET",
    path: "metadata/fields",
    tooltip: "A list of all available fields in mygeneset.info"
  },
  "Get metadata": {
    method: "GET",
    path: "metadata/",
    tooltip: "Various info about the mygeneset.info database itself"
  },
  "Lookup by id": {
    method: "GET",
    path: "geneset/",
    fields: [
      { name: "", example: "WP661", tooltip: "mygenset.info id of geneset" }
    ],
    tooltip:
      "How to lookup the info of a geneset when you know its mygenset.info id"
  },
  "Search by keyword": {
    method: "GET",
    path: "query/?",
    fields: [
      {
        name: "q",
        example: "glucose",
        tooltip: "A list of search terms"
      },
      {
        name: "fields",
        example: "taxid,genes.name",
        tooltip: "A list of fields to return from each geneset"
      },
      {
        name: "size",
        example: "10",
        tooltip: "How many results to return"
      }
    ],
    tooltip: "How to search for gensets by keywords"
  },
  "Batch search": {
    method: "POST",
    path: "query/?",
    fields: [
      {
        name: "q",
        example: "P13671,P00813,Q01740",
        tooltip: "A list of search terms"
      },
      {
        name: "scopes",
        example: "taxid,genes.uniprot",
        tooltip: "A list of fields to search"
      },
      {
        name: "fields",
        example: "taxid,genes.name",
        tooltip: "A list of fields to return from each geneset"
      },
      {
        name: "size",
        example: "1",
        tooltip: "How many results to return (in this case, per search term)"
      }
    ],
    tooltip: "How to search for a list of genesets"
  }
};

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable,
    CodeBlock,
    CodeInput,
    PrettyJson,
    CopyButton
  },
  data() {
    return {
      base,
      requests,
      selected: "Search by keyword",
      code: "",
      loading: false,
      response: {}
    };
  },
  methods: {
    sanitize(value: string) {
      return value;
    },
    setCode() {
      nextTick(() => {
        const codeBlock = this.$refs.codeBlock as CodeBlockInterface;
        this.code = codeBlock.getCode();
      });
    },
    run: async function() {
      this.loading = true;

      const code = this.code.replace(this.method, "").trim();

      try {
        this.response = (await request(code, this.method)) as {};
      } catch (error) {
        console.error(error);
      }

      this.loading = false;
    },
    download() {
      downloadJson(this.response, "response");
    }
  },
  computed: {
    method(): string {
      return this.requests[this.selected].method;
    },
    empty(): boolean {
      return Object.keys(this.response).length === 0;
    },
    path(): string {
      return this.requests[this.selected].path;
    },
    fields(): Field[] {
      return this.requests[this.selected].fields || [];
    }
  },
  mounted() {
    this.setCode();
  },
  watch: {
    selected() {
      this.setCode();
    }
  }
});
</script>
