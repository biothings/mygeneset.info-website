<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th v-for="(col, index) in cols" :key="index">
            <button :align="col.align || 'center'" @click="changeSort(index)">
              {{ col.name }}
              <i v-if="index !== sortCol" class="fas fa-sort"></i>
              <i
                v-if="index === sortCol"
                :class="`fas fa-sort-${sortUp ? 'up' : 'down'}`"
              ></i>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in _rows" :key="index">
          <td
            v-for="(cell, index) in row"
            :key="index"
            :align="cols[index]?.align || 'center'"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Col {
  name: string;
  align: string;
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
  data() {
    return {
      sortCol: -1,
      sortUp: false
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
    }
  },
  computed: {
    _rows: function(): Row[] {
      const rows = [...((this.rows || []) as Row[])];
      if (this.sortCol < 0) return rows;

      const func = (a: Row, b: Row) => {
        const valA = a[this.sortCol] || 0;
        const valB = b[this.sortCol] || 0;
        if (valA < valB === this.sortUp) return 1;
        else if (valA > valB === this.sortUp) return -1;
        else return 0;
      };

      return rows.sort(func);
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
