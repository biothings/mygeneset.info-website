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
    <CodeBlock title="Edit me!" ariaLabel="Request string">
      <template v-for="(slug, index) in request" v-bind:key="slug">
        <span v-if="index % 2 === 0">{{ slug }}</span>
        <CodeInput
          v-else
          v-bind:defaultValue="slug"
          v-bind:sanitize="sanitize"
          v-bind:aria-label="'Request field ' + (index + 1)"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </template>
    </CodeBlock>
  </Section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import CodeBlock from "@/components/CodeBlock.vue";
import CodeInput from "@/components/CodeInput.vue";

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
    CodeInput
  },
  data: () => ({
    selected: "byName"
  }),
  methods: {
    select: function(value: string) {
      this.selected = value;
    },
    sanitize: function(event: Event) {
      const input = event.target as HTMLInputElement;
      return input.value.replace(/[^a-zA-Z0-9]+/g, "");
    }
  },
  computed: {
    request: function(): Request {
      return requests[(this.selected as unknown) as string];
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
  background: $accent-light;
}
</style>
