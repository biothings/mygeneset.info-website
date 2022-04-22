<template>
  <!-- download setion -->
  <Section>
    <!-- format options -->
    <Center v-if="expanded" class="controls">
      <span>Identifiers:</span>
      <Checklist v-model="identifiers" />
      <br />
      <span>Format:</span>
      <select v-model="format">
        <option
          v-for="(format, index) in formats"
          :key="index"
          :value="format.key"
          >{{ format.label }}</option
        >
      </select>
      <span>Transpose:</span>
      <input
        type="checkbox"
        v-model="transpose"
        :disabled="!(format === 'csv' || format === 'tsv' || format === 'gmx')"
      />
    </Center>

    <!-- preview -->
    <CodeBlock v-if="expanded" heading="Preview">
      {{ preview }}
    </CodeBlock>

    <!-- buttons -->
    <Center :vertical="true" width="200px">
      <Clickable
        :text="expanded ? 'Hide Options' : 'Options'"
        icon="fas fa-cog"
        design="plain"
        @click="expanded = !expanded"
      />
      <Clickable
        text="Download"
        icon="fas fa-download"
        design="big"
        @click="download"
      />
    </Center>
  </Section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Section from "@/components/Section.vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";
import Checklist from "@/components/Checklist.vue";
import CodeBlock from "@/components/CodeBlock.vue";
import { Gene, Geneset } from "@/api/types";
import {
  stringifyJson,
  stringifyCsv,
  stringifyTsv,
  stringifyGmx,
  downloadJson,
  downloadCsv,
  downloadTsv,
  downloadGmx
} from "@/util/download";
import { cloneDeep, zip } from "lodash";

const identifiers = [
  { label: "Name", key: "name", checked: false },
  { label: "Alias", key: "alias", checked: false },
  { label: "Symbol", key: "symbol", checked: true },
  { label: "Entrez", key: "ncbigene", checked: false },
  { label: "Ensembl", key: "ensemblgene", checked: false },
  { label: "Uniprot", key: "uniprot", checked: false }
];

const formats = [
  { label: "JSON (.json)", key: "json" },
  { label: "Comma-separated (.csv)", key: "csv" },
  { label: "Tab-separated (.tsv)", key: "tsv" },
  { label: " Gene MatriX (.gmx / .gmt)", key: "gmx" }
];

export default defineComponent({
  components: {
    Section,
    Center,
    Clickable,
    Checklist,
    CodeBlock
  },
  props: {
    // current geneset
    geneset: Object as PropType<Geneset>
  },
  data() {
    return {
      // options expanded state
      expanded: false,
      // list of gene identifiers
      identifiers,
      // file formats
      formats,
      // selected file format
      format: "csv",
      // whether to transpose csv/tsv
      transpose: false
    };
  },
  computed: {
    // formatted geneset, in selected format and w/ only selected identifiers
    // eslint-disable-next-line
    formatted(): any {
      // important items
      const geneset = cloneDeep(this.geneset || {});
      const genes = cloneDeep(geneset.genes || []) as Gene[];
      delete geneset.genes;
      const identifiers = this.identifiers.filter(id => id.checked);

      // format as json
      if (this.format === "json") {
        const newGenes = [];

        for (const gene of genes)
          for (const key of Object.keys(gene)) {
            if (identifiers.find(id => id.key === key))
              newGenes.push({ [key]: gene[key] });
          }
        return { ...geneset, genes: newGenes };
      }

      // format as csv or tsv
      if (this.format === "csv" || this.format === "tsv") {
        let rows = [];

        for (const { label, key } of identifiers) {
          const newGenes = genes
            .map(gene => gene[key])
            .flat()
            .filter(gene => gene);
          rows.push([label, ...newGenes]);
        }

        if (!this.transpose) rows = zip(...rows);

        rows = [
          ["Title", geneset._id || ""],
          ["Description", geneset.description || ""],
          ...rows
        ];

        return rows;
      }

      // format as gmx
      if (this.format === "gmx") {
        let cols: string[] = [];
        cols.push(geneset._id || "");
        cols.push(geneset.description || "");

        for (const { key } of identifiers) {
          cols = [
            ...cols,
            ...genes
              .map(gene => gene[key])
              .flat()
              .filter(gene => gene)
          ];
        }

        if (!this.transpose) return zip([...cols]);
        else return [cols];
      }

      return {};
    },
    // stringified preview of formatted geneset
    preview(): string {
      if (this.format === "json") return stringifyJson(this.formatted);
      if (this.format === "csv") return stringifyCsv(this.formatted);
      if (this.format === "tsv") return stringifyTsv(this.formatted);
      if (this.format === "gmx") return stringifyGmx(this.formatted);
      return "";
    }
  },
  methods: {
    // download formatted geneset
    download() {
      const name = this.geneset?._id || "geneset";
      if (this.format === "json") return downloadJson(this.formatted, name);
      if (this.format === "csv") return downloadCsv(this.formatted, name);
      if (this.format === "tsv") return downloadTsv(this.formatted, name);
      if (this.format === "gmx")
        return downloadGmx(this.formatted, name, this.transpose);
    }
  }
});
</script>
