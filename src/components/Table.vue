<template>
  <!-- sortable, paginated table -->
  <div class="table">
    <!-- heading above table -->
    <div class="heading"><slot></slot></div>

    <!-- container allowing horizontal scrolling -->
    <div class="scroll">
      <table>
        <!-- head -->
        <thead>
          <tr>
            <th v-for="(col, colIndex) in cols" :key="colIndex">
              <!-- sort button -->
              <button
                v-if="col.sortable !== false && !col.action"
                :align="col.align || 'left'"
                @click="changeSort(col.name)"
              >
                {{ col.name }}
                <i
                  v-if="col.name === sortCol"
                  :class="`fas fa-sort-${sortUp ? 'up' : 'down'}`"
                ></i>
                <i v-else class="fas fa-sort"></i>
              </button>

              <!-- raw value -->
              <div v-else :align="col.align || 'left'">
                {{ col.name }}
              </div>
            </th>
          </tr>
        </thead>

        <!-- body -->
        <tbody>
          <tr v-for="(row, rowIndex) in _rows" :key="rowIndex">
            <template v-for="(col, colIndex) in cols" :key="colIndex">
              <!-- action button -->
              <td v-if="col.action" :align="col.align || 'left'">
                <Clickable
                  v-tooltip="col.action"
                  :icon="col.icon"
                  @click="
                    $emit('action', {
                      rowIndex,
                      colIndex,
                      originalIndex: row.originalIndex,
                      row,
                      cell: row[col.key]
                    })
                  "
                  design="plain"
                />
              </td>

              <!-- custom html -->
              <td
                v-else-if="col.format"
                :align="col.align || 'left'"
                v-html="col.format(row[col.key], row)"
              ></td>

              <!-- raw value -->
              <td v-else :align="col.align || 'left'">
                {{ row[col.key] }}
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- pagination controls -->
    <Center v-if="rows.length" class="pages">
      <Clickable
        icon="fas fa-chevron-left"
        @click="prevPage"
        design="plain"
        :disabled="!canPrev"
        v-tooltip="'Previous page of table rows'"
      />
      <span>{{ startRow + 1 }} to {{ endRow }} of {{ rows.length }}</span>
      <Clickable
        icon="fas fa-chevron-right"
        @click="nextPage"
        design="plain"
        :disabled="!canNext"
        v-tooltip="'Next page of table rows'"
      />
    </Center>

    <!-- empty -->
    <Center v-else>
      No Results
    </Center>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";

export interface Col {
  // key to access in each row object for col
  key: string;
  // header text and unique id for col
  name?: string;
  // alignment for col, left | center | right
  align?: string;
  // is col sortable
  sortable?: boolean;
  // action to emit when clicking on cell in col
  action?: string;
  // icon to show in button for action
  icon?: string;
  // how to format cell. gets cell value and row object. return html string.
  format?: Function;
}

interface Row {
  // eslint-disable-next-line
  [index: string]: any;
}

export default defineComponent({
  props: {
    // columns
    cols: Array,
    // rows of data
    rows: Array
  },
  emits: ["action"],
  components: {
    Center,
    Clickable
  },
  data() {
    return {
      // current sort column by name
      sortCol: "",
      // is column sort ascending or descending
      sortUp: false,
      // first row to show on page
      startRow: 0,
      // rows to show per page
      perPage: 10
    };
  },
  methods: {
    // when sort button clicked
    changeSort(name: string) {
      if (this.sortCol === name) {
        if (this.sortUp) {
          this.sortUp = false;
          this.sortCol = "";
        } else {
          this.sortUp = true;
        }
      } else {
        this.sortCol = name;
        this.sortUp = false;
      }
    },
    // when prev page button clicked
    prevPage() {
      if (this.canPrev) this.startRow -= this.perPage;
    },
    // when next page button clicked
    nextPage() {
      if (this.canNext) this.startRow += this.perPage;
    }
  },
  computed: {
    // display copy of row data, sorted and paginated
    _rows(): Row[] {
      // get key of sort column
      const sortKey: string =
        (((this.cols as []).find((col: Col) => col.name === this.sortCol) ||
          {}) as Col)?.key || "";

      // copy row data and track original indices for performing actions on rows
      let rows = [...((this.rows || []) as Row[])];
      rows = rows.map((row, index) => ({ ...row, originalIndex: index }));

      // sort
      if (sortKey)
        rows.sort((a: Row, b: Row) => {
          const valA = a[sortKey] || 0;
          const valB = b[sortKey] || 0;
          if (valA < valB === this.sortUp) return 1;
          else if (valA > valB === this.sortUp) return -1;
          else return 0;
        });

      // paginate
      rows = rows.slice(this.startRow, this.startRow + this.perPage);

      return rows;
    },
    // is there a prev page to go to
    canPrev(): boolean {
      return this.startRow - this.perPage >= 0;
    },
    // is there a next page to go to
    canNext(): boolean {
      return this.startRow + this.perPage <= (this.rows || []).length - 1;
    },
    // last row to display on page
    endRow(): number {
      return Math.min(this.startRow + this.perPage, (this.rows || []).length);
    }
  },
  watch: {
    // when table row data changes, go to first page
    rows: {
      handler() {
        this.startRow = 0;
      },
      deep: true
    }
  }
});
</script>

<style scoped lang="scss">
.table {
  margin: 20px 0;

  .heading {
    margin-bottom: 10px;
    text-align: center;
    font-weight: $medium;
  }

  .scroll {
    width: 100%;
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      tr {
        border-bottom: solid 2px $light-gray;
      }
    }

    th > * {
      width: 100%;
      padding: 5px;
      font-weight: $semi-bold;
      white-space: nowrap;
    }

    td {
      padding: 5px;
      overflow-wrap: break-word;
    }

    [align="left"] {
      text-align: left;
      justify-content: flex-start;
    }

    [align="right"] {
      text-align: right;
      justify-content: flex-end;
    }

    [align="center"] {
      text-align: center;
      justify-content: center;
    }

    .fas {
      margin-left: 5px;
    }

    .fa-sort {
      color: $light-gray;
    }
  }

  .pages {
    margin-top: 10px;
  }

  @media (max-width: $phone) {
    .pages {
      span {
        width: 100%;
        order: 1;
      }
    }
  }
}
</style>
