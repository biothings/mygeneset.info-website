<template>
  <Section>
    <h2>Try it Out</h2>
    <Center>
      <Clickable
        :selected="selected === 'byId'"
        @click="selected = 'byId'"
        text="Lookup by id"
        design="plain"
      />
      <Clickable
        :selected="selected === 'byName'"
        @click="selected = 'byName'"
        text="Search by name"
        design="plain"
      />
      <Clickable
        :selected="selected === 'getMeta'"
        @click="selected = 'getMeta'"
        text="Get metadata"
        design="plain"
      />
    </Center>
    <CodeBlock ref="codeBlock" :ariaLabel="code">
      <template v-for="(slug, index) in request" :key="slug">
        <span v-if="index % 2 === 0">{{ slug }}</span>
        <CodeInput
          v-else
          :defaultValue="slug"
          :sanitize="sanitize"
          :aria-label="'Request field ' + (index + 1)"
          :onChange="setCode"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </template>
    </CodeBlock>
    <Center width="150px">
      <Clickable
        :icon="copied ? 'fas fa-check' : 'fas fa-copy'"
        :text="copied ? 'Copied!' : 'Copy'"
        design="big"
        @click="copy"
        v-tooltip="'Copy request code to clipboard'"
      />
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
    <Center v-if="!empty" width="200px">
      <Clickable
        icon="fas fa-download"
        text="Download"
        design="big"
        @click="download"
        :disabled="loading"
        v-tooltip="'Download the response as JSON'"
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
import { downloadJson } from "@/util/download";
import { sleep } from "@/util/debug";
import { dummyJson } from "@/util/debug";

interface Request {
  [index: number]: string;
}

interface Requests {
  [index: string]: Request;
}

interface CodeBlockInterface {
  getCode: () => string;
}

const requests: Requests = {
  byId: ["https://mygeneset.info/v1/", "019823"],
  byName: [
    "https://mygeneset.info/v1/query?q=",
    "P24941",
    "&species=",
    "homosapiens"
  ],
  getMeta: ["https://mygeneset.info/v1/metadata/", "019823"]
};

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable,
    CodeBlock,
    CodeInput,
    PrettyJson
  },
  data() {
    return {
      selected: "byName",
      code: "",
      copied: false,
      loading: false,
      response: {}
    };
  },
  methods: {
    sanitize(value: string) {
      return value.replace(/[^a-zA-Z0-9]+/g, "");
    },
    setCode() {
      nextTick(() => {
        const codeBlock = this.$refs.codeBlock as CodeBlockInterface;
        this.code = codeBlock.getCode();
      });
    },
    async copy() {
      console.log(this.code);
      await window.navigator.clipboard.writeText(this.code);
      this.copied = true;
      window.setTimeout(() => (this.copied = false), 1000);
    },
    run: async function() {
      console.log(this.code);
      this.loading = true;
      await sleep(500);
      this.loading = false;
      this.response = dummyJson();
    },
    download() {
      downloadJson(this.response, "response");
    }
  },
  computed: {
    request(): Request {
      return requests[(this.selected as unknown) as string];
    },
    empty(): boolean {
      return Object.keys(this.response).length === 0;
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

<style scoped lang="scss">
button {
  color: $black !important;
  margin: 5px;
}
button[selected="true"] {
  background: $theme-pale;
}
</style>
