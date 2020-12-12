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
    <CodeBlock title="Edit me!">
      <template v-for="(slug, index) in request" v-bind:key="slug">
        <span v-if="index % 2 === 0">{{ slug }}</span>
        <input
          v-else
          v-bind:defaultValue="slug"
          @input="onInput"
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
import { nextTick } from "vue";
import { ref } from "vue";
import { defineComponent } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import CodeBlock from "@/components/CodeBlock.vue";

const selected = ref();

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
    CodeBlock
  },
  data: () => ({
    selected
  }),
  methods: {
    select: function(value: string) {
      selected.value = value;
      nextTick(this.fitAll);
    },
    onInput: function(event: Event) {
      const input = event.target as HTMLInputElement;
      this.sanitize(input);
    },
    sanitize: function(input: HTMLInputElement) {
      const oldValue = input.value;
      const newValue = oldValue.replace(/[^a-zA-Z0-9]+/g, "");
      if (oldValue !== newValue) {
        input.value = newValue;
      }
      this.fitWidth(input);
    },
    fitWidth: (input: HTMLInputElement) => {
      input.style.width = input.value.length + "ch";
    },
    fitAll: function() {
      const inputs = document.querySelectorAll("code input");
      for (const input of inputs) this.fitWidth(input as HTMLInputElement);
    }
  },
  computed: {
    request: function(): Request {
      return requests[(this.selected as unknown) as string];
    }
  },
  mounted: function() {
    this.select("byName");
  }
});
</script>

<style scoped lang="scss">
button {
  margin: 5px;
}
button[selected="true"] {
  background: $accent-light;
}
input {
  display: inline-block;
  min-width: 2rem;
  margin: 0 5px;
  padding: 0;
  color: $yellow;
  border-bottom: solid 2px $yellow;
}
</style>
