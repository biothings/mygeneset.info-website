<template>
  <div ref="tableContainer"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

const columns = ["animal", "color", "number"];
const data = [
  ["cat", "red", 4],
  ["cat", "blue", 12],
  ["dog", "red", 5],
  ["dog", "green", 8],
  ["mouse", "green", 0],
  ["mouse", "blue", 9]
];

export default defineComponent({
  beforeUpdate: function() {
    console.log("hi");
    new Grid({
      columns,
      data
    }).render(this.$refs.tableContainer as Element);
  }
});
</script>

<style scoped lang="scss"></style>
