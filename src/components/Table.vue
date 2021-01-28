<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th v-for="(col, colIndex) in cols" :key="colIndex">
            <button
              v-if="col.sortable !== false && !col.action"
              :align="col.align || 'center'"
              @click="changeSort(col.key)"
            >
              {{ col.name }}
              <i
                v-if="col.key === sortKey"
                :class="`fas fa-sort-${sortUp ? 'up' : 'down'}`"
              ></i>
              <i v-else class="fas fa-sort"></i>
            </button>
            <div v-else :align="col.align || 'center'">
              {{ col.name }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in _rows" :key="rowIndex">
          <td
            v-for="(col, colIndex) in cols"
            :key="colIndex"
            :align="col.align || 'center'"
          >
            <Clickable
              v-if="col.action"
              :title="col.action"
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
            <span v-else>
              {{ row[col.key] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Center v-if="rows.length" class="pages">
    <Clickable
      icon="fas fa-chevron-left"
      @click="prevPage"
      design="plain"
      title="Previous page of table rows"
      :disabled="!canPrev"
    />
    <span>{{ startRow + 1 }} to {{ endRow }} of {{ rows.length }}</span>
    <Clickable
      icon="fas fa-chevron-right"
      @click="nextPage"
      design="plain"
      title="Next page of table rows"
      :disabled="!canNext"
    />
  </Center>
  <Center v-else>
    No Data
  </Center>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";

export interface Col {
  key: string;
  name?: string;
  align?: string;
  sortable?: boolean;
  action?: string;
  icon?: string;
}

type Cell = number | string | null | undefined;

interface Row {
  [index: string]: Cell;
}

export default defineComponent({
  props: {
    cols: Array,
    rows: Array
  },
  emits: ["action"],
  components: {
    Center,
    Clickable
  },
  data() {
    return {
      sortKey: "",
      sortUp: false,
      startRow: 0,
      perPage: 10
    };
  },
  methods: {
    changeSort(key: string) {
      if (this.sortKey === key) {
        if (this.sortUp) {
          this.sortUp = false;
          this.sortKey = "";
        } else {
          this.sortUp = true;
        }
      } else {
        this.sortKey = key;
        this.sortUp = false;
      }
    },
    prevPage() {
      if (this.canPrev) this.startRow -= this.perPage;
    },
    nextPage() {
      if (this.canNext) this.startRow += this.perPage;
    }
  },
  computed: {
    _rows(): Row[] {
      let rows = [...((this.rows || []) as Row[])];
      rows = rows.map((row, index) => ({ ...row, originalIndex: index }));

      const func = (a: Row, b: Row) => {
        const valA = a[this.sortKey] || 0;
        const valB = b[this.sortKey] || 0;
        if (valA < valB === this.sortUp) return 1;
        else if (valA > valB === this.sortUp) return -1;
        else return 0;
      };

      if (this.sortKey) rows.sort(func);

      rows = rows.slice(this.startRow, this.startRow + this.perPage);

      return rows;
    },
    canPrev(): boolean {
      return this.startRow - this.perPage >= 0;
    },
    canNext(): boolean {
      return this.startRow + this.perPage <= (this.rows || []).length - 1;
    },
    endRow(): number {
      return Math.min(this.startRow + this.perPage, (this.rows || []).length);
    }
  },
  watch: {
    rows: {
      handler(oldRows, newRows) {
        if (this.startRow >= newRows.length) this.startRow -= this.perPage;
        if (this.startRow < 0) this.startRow = 0;
      },
      deep: true
    }
  }
});
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  margin: 20px 0;
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
    justify-content: flex-start;
  }

  .fas {
    margin-left: 5px;
  }

  .fa-sort {
    color: $light-gray;
  }
}

@media (max-width: $phone) {
  .pages {
    span {
      width: 100%;
      order: 1;
    }
  }
}
</style>
