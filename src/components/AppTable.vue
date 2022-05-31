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
</template>

<script setup lang="ts">
import { computed, StyleValue } from "vue";

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
}

const props = defineProps<Props>();

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
  padding: 5px 10px;
}
</style>
