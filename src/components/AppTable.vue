<!--
  generic (controlled) table component
-->

<template>
  <div class="wrapper">
    <table
      class="table"
      :aria-colcount="_cols.length"
      :aria-rowcount="rows.length"
      :style="{ minWidth: minWidth + 'px' }"
    >
      <!-- head -->
      <thead class="head">
        <tr class="row">
          <th
            v-for="(col, colIndex) in _cols"
            :key="colIndex"
            class="cell"
            :style="col.style"
          >
            <!-- heading content -->
            {{ col.heading }}

            <!-- sort button -->
            <button
              v-if="col.sortable"
              class="sort"
              :data-active="sort?.col === col.id"
              @click="changeSort(col.id)"
            >
              <AppIcon
                v-if="sort?.col === col.id && sort?.dir === 'up'"
                icon="sort-up"
              />
              <AppIcon
                v-else-if="sort?.col === col.id && sort?.dir === 'down'"
                icon="sort-down"
              />
              <AppIcon v-else icon="sort" />
            </button>
          </th>
        </tr>
      </thead>

      <!-- body -->
      <tbody class="body">
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
          <td
            v-for="(col, colIndex) in _cols"
            :key="colIndex"
            class="cell"
            :style="col.style"
          >
            <!-- named slot for custom formatting -->
            <slot
              v-if="$slots[col.id]"
              :name="col.id"
              :row="row"
              :col="col"
              :cell="col.key ? row[col.key] : {}"
            />

            <!-- show nothing if no key specified -->
            <template v-else-if="!col.key"></template>

            <!-- default formatting for array -->
            <template v-else-if="Array.isArray(row[col.key])">
              {{ row[col.key].join(", ") || "-" }}
            </template>

            <!-- default formatting for number -->
            <template v-else-if="typeof row[col.key] === 'number'">
              {{ row[col.key].toLocaleString() || "-" }}
            </template>

            <!-- otherwise just display raw value -->
            <template v-else>
              {{ row[col.key] || "-" }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- slot for table status -->
    <div v-if="$slots.default" class="slot">
      <slot />
    </div>
  </div>

  <!-- controls -->
  <AppFlex v-if="start >= 0 && perPage > 0 && total > 0" class="controls">
    <AppButton
      v-tippy="'Go to previous page'"
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
      icon="angle-right"
      :disabled="start + perPage >= total"
      @click="nextPage"
    />
  </AppFlex>
</template>

<script setup lang="ts">
import { computed, StyleValue } from "vue";
import AppButton from "./AppButton.vue";

// eslint-disable-next-line
export type Row = Record<string, any>;

export interface Col {
  // unique id of column
  // used for identifying cols for sorting/filtering/etc and for slot names
  id: string;
  // key to access in row object as cell value
  key?: string;
  // text to show as column heading
  heading?: string;
  // width of column
  // use units of e.g. 100px or 1fr (see CSS fr)
  width?: string;
  // alignment of column content
  align?: "left" | "center" | "right";
  // whether column is sortable
  sortable?: boolean;
}

export type Sort = {
  col: string;
  dir: "up" | "down" | "";
} | null;

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
  // current sort
  sort?: Sort;
}

const props = withDefaults(defineProps<Props>(), {
  start: -1,
  perPage: 0,
  total: 0,
  sort: null,
});

interface Emits {
  // page navigation
  (event: "update:start", start: number): void;
  // sort state
  (event: "update:sort", sort: Sort): void;
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

// change sort
const changeSort = (id: string) => {
  let sort: Sort;

  if (props.sort?.col === id) {
    if (props.sort?.dir === "down") sort = { col: id, dir: "up" };
    else sort = null;
  } else sort = { col: id, dir: "down" };

  emit("update:sort", sort);
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  overflow: auto;
}

.slot {
  max-width: 100vw;
}

.table {
  border-collapse: collapse;
  width: 100%;
  height: 100%;
}

.tr {
  height: 100%;
}

.head .cell {
  font-weight: $medium;
}

.cell {
  max-width: 800px;
  height: 100%;
  border-bottom: solid 1px $off-white;
  padding: 5px 10px;
}

.sort {
  background: none;
  border: none;
  padding: 5px;
  color: $gray;
  vertical-align: middle;
  transition: color $fast;

  &[data-active="true"] {
    color: $black;
  }
}
</style>
