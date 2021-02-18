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
      />
    </Center>
    <CodeBlock ref="codeBlock" :ariaLabel="code">
      <span>{{ base }}</span>
      <span>{{ path }}</span>
      <template
        v-for="({ name, example, tooltip }, index) in fields"
        :key="name"
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
  path: string;
  fields?: Field[];
}

interface Requests {
  [index: string]: Request;
}

interface CodeBlockInterface {
  getCode: () => string;
}

const base = "https://mygeneset.info/v1/";

const requests: Requests = {
  "Get metadata": {
    path: "metadata/"
  },
  "Lookup by id": {
    path: "geneset/",
    fields: [
      { name: "", example: "WP661", tooltip: "mygenset.info id of geneset" }
    ]
  },
  "Search by keyword": {
    path: "query/?",
    fields: [
      {
        name: "q",
        example: "glucose",
        tooltip:
          "Search term to exact-match. Accepts any Elasticsearch query syntax, e.g. * for wildcard."
      },
      {
        name: "fields",
        example: "genes.name",
        tooltip:
          "Fields to return from each geneset. Accepts any Elasticsearch query syntax, e.g. * for wildcard."
      },
      {
        name: "size",
        example: "10",
        tooltip: "How many results to return"
      }
    ]
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
      try {
        this.response = (await request(this.code)) as {};
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
