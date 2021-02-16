<template>
  <div class="geneset_search">
    <Center :vertical="true" width="100%">
      <TextBox
        :placeholder="`Search ${subject} by keyword`"
        v-model="keywords"
        v-debounce="search"
      />
      <SpeciesSelect
        :placeholder="`Search ${subject} by species`"
        v-model="species"
      />
    </Center>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextBox from "@/components/TextBox.vue";
import Center from "@/components/Center.vue";
import SpeciesSelect from "@/components/SpeciesSelect.vue";
import { search } from "@/api/mygenset";

export default defineComponent({
  components: {
    TextBox,
    Center,
    SpeciesSelect
  },
  props: {
    subject: String
  },
  emits: ["results"],
  data() {
    return {
      keywords: "",
      species: []
    };
  },
  methods: {
    async search() {
      const results = await search(this.keywords, this.species);
      this.$emit("results", { results });
    }
  },
  mounted() {
    this.search();
  }
});
</script>

<style scoped lang="scss">
.geneset_search {
  margin: 0 auto;
}
</style>
