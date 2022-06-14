<template>
  <AppSection>
    <AppHeading level="3" icon="download" link="download">Download</AppHeading>

    <!-- options -->
    <AppFlex>
      <AppFlex gap="small">
        Format:
        <AppSelect v-model="format" :options="formatOptions" />
        <AppCheckbox
          v-model="transpose"
          v-tippy="'Flip gene rows/columns'"
          text="Transpose"
          :disabled="format === 'json' ? true : undefined"
        />
        <AppCheckbox
          v-model="meta"
          v-tippy="'Include meta info about geneset'"
          text="Geneset meta"
        />
      </AppFlex>

      <AppFlex gap="small">
        Gene identifiers:
        <AppChecklist v-model="identifiers" name="gene-identifiers" />
      </AppFlex>
    </AppFlex>

    <!-- preview -->
    <AppCode flow="block" heading="Preview">
      {{ stringified }}
    </AppCode>

    <!-- action -->
    <AppButton
      icon="download"
      text="Download"
      fill="filled"
      size="big"
      @click="download"
    />
  </AppSection>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import AppChecklist from "@/components/AppChecklist.vue";
import AppSelect from "@/components/AppSelect.vue";
import AppCheckbox from "@/components/AppCheckbox.vue";
import AppCode from "@/components/AppCode.vue";
import { flattenGeneId, Gene } from "@/api/genes";
import { Geneset } from "@/api/genesets";
import {
  stringifyJson,
  stringifyCsv,
  stringifyTsv,
  stringifyGmx,
  downloadJson,
  downloadCsv,
  downloadTsv,
  downloadGmx,
  downloadGmt,
} from "@/util/download";
import { omit, pickBy, zip } from "lodash";

interface Props {
  // current geneset
  geneset: Geneset;
}

const props = defineProps<Props>();

// list of gene identifiers
type Identifier = { text: string; key: keyof Gene; checked: boolean };
const identifiers = ref<Array<Identifier>>([
  { text: "ID", key: "id", checked: true },
  { text: "Symbol", key: "symbol", checked: true },
  { text: "Name", key: "name", checked: true },
  { text: "Alias", key: "alias", checked: false },
  { text: "Ensembl", key: "ensemblgene", checked: false },
  { text: "Uniprot", key: "uniprot", checked: false },
]);

// selected gene identifiers
const selectedIdentifiers = computed(() =>
  identifiers.value.filter((id) => id.checked)
);

// file format options
type FormatOption = { text: string; key: string };
const formatOptions: Array<FormatOption> = [
  { key: "csv", text: "Comma-separated (.csv)" },
  { key: "tsv", text: "Tab-separated (.tsv)" },
  { key: "json", text: "JSON (.json)" },
  { key: "gmx", text: " Gene MatriX (.gmx / .gmt)" },
];

// selected file format
const format = ref(formatOptions[0].key);

// whether to include geneset meta or just genes
const meta = ref(false);

// whether to transpose csv/tsv
const transpose = ref(false);

// stringified geneset data
const stringified = ref("");

// func to transpose data if transpose selected, or no-op otherwise
type Table = Array<Array<string>>;
const transposeFunc = (data: Table): Table => {
  if (transpose.value) return zip(...data) as Table;
  else return data;
};

// format data as json
const formatJson = (): Record<string, unknown> => ({
  // all geneset meta
  ...(meta.value
    ? { ...omit(props.geneset, "genes"), count: props.geneset.genes.length }
    : {}),

  // format genes
  genes: props.geneset.genes.map((gene) =>
    pickBy(gene, (value, key) =>
      selectedIdentifiers.value.find((id) => id.key === key)
    )
  ),
});

// format data as csv/tsv
const formatCsv = (): Table => [
  // select geneset meta
  ...(meta.value
    ? transposeFunc([
        ["ID", "Name", "Description", "Count"],
        [
          props.geneset.id || "",
          props.geneset.name || "",
          props.geneset.description || "",
          String(props.geneset.genes.length) || "",
        ],
      ])
    : []),

  // spacer
  ...(meta.value ? [[""]] : []),

  // format genes
  ...transposeFunc([
    // labels
    selectedIdentifiers.value.map((id) => id.text),
    // values
    ...props.geneset.genes.map((gene) =>
      selectedIdentifiers.value.map((id) => flattenGeneId(gene[id.key]))
    ),
  ]),
];

// format data as gmx/gmt
const formatGmx = () =>
  transposeFunc([
    // select geneset meta
    ...(meta.value
      ? [
          [props.geneset.id],
          [props.geneset.name],
          [props.geneset.description],
          [String(props.geneset.genes.length)],
        ]
      : []),

    // spacer
    ...(meta.value ? [[""]] : []),

    // format genes
    ...props.geneset.genes
      .map((gene) =>
        selectedIdentifiers.value.map((id) => flattenGeneId(gene[id.key]))
      )
      .flat()
      .filter((gene) => gene)
      .map((gene) => [gene]),
  ]);

// format and stringify
const stringify = () => {
  if (format.value === "json") stringified.value = stringifyJson(formatJson());
  if (format.value === "csv") stringified.value = stringifyCsv(formatCsv());
  if (format.value === "tsv") stringified.value = stringifyTsv(formatCsv());
  if (format.value === "gmx") stringified.value = stringifyGmx(formatGmx());
};

// rerun stringify process when any affecting props change
watch(
  [props.geneset, selectedIdentifiers, format, transpose, meta],
  stringify,
  { deep: true, immediate: true }
);
onMounted(stringify);

// download stringified geneset data
const download = () => {
  const name = props.geneset?.id || "geneset";
  if (format.value === "json") return downloadJson(stringified.value, name);
  if (format.value === "csv") return downloadCsv(stringified.value, name);
  if (format.value === "tsv") return downloadTsv(stringified.value, name);
  if (format.value === "gmx" && !transpose.value)
    return downloadGmx(stringified.value, name);
  if (format.value === "gmx" && transpose.value)
    return downloadGmt(stringified.value, name);
};
</script>
