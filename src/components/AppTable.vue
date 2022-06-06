<!--
  generic table component
-->

<template>
  <div class="wrapper">
    <table
      class="table"
      :aria-colcount="_cols.length"
      :aria-rowcount="rows.length"
      :style="{ minWidth: minWidth + 'px' }"
    >
      <thead class="head">
        <tr class="row">
          <th
            v-for="(col, colIndex) in _cols"
            :key="colIndex"
            class="cell"
            :style="col.style"
          >
            {{ col.heading }}
          </th>
        </tr>
      </thead>
      <tbody class="body">
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
          <td
            v-for="(col, colIndex) in _cols"
            :key="colIndex"
            class="cell"
            :style="col.style"
          >
            <slot
              v-if="$slots[col.id]"
              :name="col.id"
              :row="row"
              :col="col"
              :cell="col.key ? row[col.key] : {}"
            />
            <template v-else>
              {{ row[col.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <AppFlex v-if="start >= 0 && perPage > 0 && total > 0" class="controls">
    <AppButton
      v-tippy="'Go to previous page'"
      design="plain"
      icon="angle-left"
      :disabled="start - perPage < 0"
      @click="prevPage"
    />
    <span
      >{{ (start + 1).toLocaleString() }} to
      {{ Math.min(start + perPage, total).toLocaleString() }} of
      {{ total.toLocaleString() }}</span
    >
    <AppButton
      v-tippy="'Go to next page'"
      design="plain"
      icon="angle-right"
      :disabled="start + perPage >= total"
      @click="nextPage"
    />
  </AppFlex>
</template>

<script setup lang="ts">
import { computed, StyleValue } from "vue";
import AppButton from "./AppButton.vue";

type Row = Record<string, unknown>;

interface Col {
  // unique id of column
  // used for identifying cols for sorting/filtering/etc and for slot names
  id: string;
  // key to access in row object as cell value
  key: string;
  // text to show as column heading
  heading: string;
  // width of column
  // use units of e.g. 100px or 1fr (see CSS fr)
  width?: string;
  // alignment of column content
  align?: "left" | "center" | "right";
}

interface Props {
  // rows of data
  rows: Array<Row>;
  // column specifications
  cols: Array<Col>;
  // starting item index
  start?: number;
  // items per page
  perPage?: number;
  // total number of items
  total?: number;
}

const props = withDefaults(defineProps<Props>(), {
  start: -1,
  perPage: 0,
  total: 0,
});

interface Emits {
  // page navigation
  (event: "update:start", start: number): void;
}

const emit = defineEmits<Emits>();

// pagination nav
const prevPage = () =>
  emit("update:start", Math.max(0, props.start - props.perPage));
const nextPage = () =>
  emit("update:start", Math.min(props.total, props.start + props.perPage));

// processed cols prop
const _cols = computed(() =>
  props.cols.map((col) => {
    const style: StyleValue = {};

    // defaults
    const { width = "100px", align = "left" } = col;

    // width
    style.width = width;

    // align
    const flexMap = { left: "flex-start", center: "center", right: "flex-end" };
    style.justifyContent = flexMap[align];
    style.textAlign = align;

    return { ...col, style };
  })
);

// min width of table
const minWidth = computed(() =>
  _cols.value
    .map((_col) => parseInt(String(_col.style.width)))
    .reduce((total, value) => total + value, 0)
);
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  overflow: auto;
}

.table {
  border-collapse: collapse;
  width: 100%;
}

.head {
  font-weight: $medium;
}

.body {
}

.row {
}

.cell {
  max-width: 800px;
  padding: 5px 10px;
}
</style>
