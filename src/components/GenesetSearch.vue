<template>
  <div class="geneset_search">
    <Center :vertical="true" width="100%">
      <TextBox
        :placeholder="`Search ${subject} by keyword`"
        v-model="keywords"
      />
      <SpeciesSelect :placeholder="`Search ${subject} by species`" />
    </Center>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextBox from "@/components/TextBox.vue";
import Center from "@/components/Center.vue";
import SpeciesSelect from "@/components/SpeciesSelect.vue";

export default defineComponent({
  components: {
    TextBox,
    Center,
    SpeciesSelect
  },
  props: {
    subject: String
  },
  data() {
    return {
      keywords: ""
    };
  }
});
</script>

<style scoped lang="scss">
.geneset_search {
  margin: 0 auto;
}
</style>
