<template>
  <Section>
    <h2>Try it Out</h2>
    <Center>
      <Clickable
        v-bind:selected="selected === 'byId'"
        @click="select('byId')"
        text="Lookup by id"
        design="plain"
      />
      <Clickable
        v-bind:selected="selected === 'byName'"
        @click="select('byName')"
        text="Search by name"
        design="plain"
      />
      <Clickable
        v-bind:selected="selected === 'getMeta'"
        @click="select('getMeta')"
        text="Get metadata"
        design="plain"
      />
    </Center>
    <CodeBlock ref="codeBlock" title="Edit me!" v-bind:ariaLabel="code">
      <template v-for="(slug, index) in request" v-bind:key="slug">
        <span v-if="index % 2 === 0">{{ slug }}</span>
        <CodeInput
          v-else
          v-bind:defaultValue="slug"
          v-bind:sanitize="sanitize"
          v-bind:aria-label="'Request field ' + (index + 1)"
          v-bind:onChange="setCode"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </template>
    </CodeBlock>
    <Center>
      <Clickable
        v-bind:icon="loading ? 'fas fa-spinner fa-spin' : 'fas fa-play'"
        v-bind:text="loading ? 'Loading' : 'Run'"
        design="big"
        @click="run"
        v-bind:disabled="loading"
      />
    </Center>
    <CodeBlock>
      <PrettyJson v-bind:data="response" />
    </CodeBlock>
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
import { sleep } from "@/util/debug";
import { dummyJson } from "@/util/debug";

interface Request {
  [index: number]: string;
}

interface Requests {
  [index: string]: Request;
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
  data: () => ({
    selected: "byName",
    code: "",
    loading: false,
    response: {}
  }),
  methods: {
    select: function(value: string) {
      this.selected = value;
    },
    sanitize: function(value: string) {
      return value.replace(/[^a-zA-Z0-9]+/g, "");
    },
    setCode: function() {
      nextTick(() => {
        const codeBlock = this.$refs.codeBlock as any;
        this.code = codeBlock.getText();
      });
    },
    run: async function() {
      console.log(this.code);
      this.loading = true;
      await sleep(2000);
      this.loading = false;
      this.response = dummyJson();
    }
  },
  computed: {
    request: function(): Request {
      return requests[(this.selected as unknown) as string];
    }
  },
  mounted: function() {
    this.setCode();
  }
});
</script>

<style scoped lang="scss">
button {
  color: $black !important;
  margin: 5px;
}
button[selected="true"] {
  background: $accent-light;
}
</style>
