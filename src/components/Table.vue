<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th v-for="(col, index) in cols" :key="index">
            <button :align="col.align || 'center'">
              {{ col.name }}
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
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

export default defineComponent({
  props: {
    cols: Array,
    rows: Array
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
    min-width: 100%;
    max-width: 1000px;
  }

  th {
    button {
      width: 100%;
      padding: 0;
      font-weight: $semi-bold;
    }
  }

  th,
  td {
    padding: 3px;
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
}
</style>
