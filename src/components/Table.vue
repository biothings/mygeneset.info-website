<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th v-for="(col, colIndex) in cols" :key="colIndex">
            <button
              v-if="!col?.action"
              :align="col.align || 'center'"
              @click="changeSort(colIndex)"
            >
              {{ col.name }}
              <i v-if="colIndex !== sortCol" class="fas fa-sort"></i>
              <i
                v-if="colIndex === sortCol"
                :class="`fas fa-sort-${sortUp ? 'up' : 'down'}`"
              ></i>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in _rows" :key="rowIndex">
          <td
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            :align="cols[colIndex]?.align || 'center'"
          >
            <Clickable
              v-if="cols[colIndex]?.action"
              :title="cols[colIndex]?.action"
              :icon="cols[colIndex]?.icon"
              @click="$emit('action', { rowIndex, colIndex, cell })"
              design="plain"
            />
            <span v-else>
              {{ cell }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Center>
    <Clickable
      icon="fas fa-chevron-left"
      @click="prevPage"
      design="plain"
      title="Previous page of table rows"
      :disabled="!canPrev"
    />
    <span>
      {{ startRow + 1 }} to {{ endRow }} of
      {{ rows.length }}
    </span>
    <Clickable
      icon="fas fa-chevron-right"
      @click="nextPage"
      design="plain"
      title="Next page of table rows"
      :disabled="!canNext"
    />
  </Center>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Center from "@/components/Center.vue";
import Clickable from "@/components/Clickable.vue";

interface Col {
  name?: string;
  align?: string;
  component?: string;
}

type Cell = number | string | null | undefined;

interface Row {
  [index: number]: Cell;
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
      sortCol: -1,
      sortUp: false,
      startRow: 0,
      perPage: 10
    };
  },
  methods: {
    changeSort(col: number) {
      if (this.sortCol === col) {
        if (this.sortUp) {
          this.sortUp = false;
          this.sortCol = -1;
        } else {
          this.sortUp = true;
        }
      } else {
        this.sortCol = col;
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
    _rows: function(): Row[] {
      let rows = [...((this.rows || []) as Row[])];

      const func = (a: Row, b: Row) => {
        const valA = a[this.sortCol] || 0;
        const valB = b[this.sortCol] || 0;
        if (valA < valB === this.sortUp) return 1;
        else if (valA > valB === this.sortUp) return -1;
        else return 0;
      };

      if (this.sortCol >= 0) rows.sort(func);

      rows = rows.slice(this.startRow, this.startRow + this.perPage);

      return rows;
    },
    canPrev: function(): boolean {
      return this.startRow - this.perPage >= 0;
    },
    canNext: function(): boolean {
      return this.startRow + this.perPage <= (this.rows || []).length - 1;
    },
    endRow: function(): number {
      return Math.min(this.startRow + this.perPage, (this.rows || []).length);
    }
  }
});
</script>

<style scoped lang="scss">
.table {
  max-width: 100%;
  margin: 20px 0;
  overflow-x: auto;

  table {
    border-collapse: collapse;
  }

  thead {
    tr {
      border-bottom: solid 2px $light-gray;
    }
  }

  th {
    button {
      width: 100%;
      padding: 5px;
      font-weight: $semi-bold;
      white-space: nowrap;
    }
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
</style>
