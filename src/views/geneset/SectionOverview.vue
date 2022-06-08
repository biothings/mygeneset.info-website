<template>
  <AppSection>
    <AppHeading level="2" icon="briefcase" class="wrap">
      <template v-if="$route.params.id">{{ $route.params.id }}</template>
      <template v-if="fresh">New Geneset</template>
    </AppHeading>

    <!-- icons that identify the type of geneset -->
    <AppFlex class="tags">
      <div v-if="fresh">
        <AppIcon icon="wand-magic-sparkles" />
        New
      </div>

      <div v-else-if="editable">
        <AppIcon icon="pencil" />
        Editable
      </div>

      <div v-else>
        <AppIcon icon="eye" />
        Read-only
      </div>

      <div v-if="geneset.isPublic">
        <AppIcon icon="globe" class="icon" />
        Public
      </div>

      <div v-else>
        <AppIcon icon="key" class="icon" />
        Private
      </div>

      <div v-if="geneset.source">
        <AppIcon icon="box" class="icon" />
        Curated
      </div>

      <div v-else-if="geneset.author">
        <AppIcon icon="user" class="icon" />
        User
      </div>

      <div v-else>
        <AppIcon icon="user-secret" class="icon" />
        Anonymous
      </div>
    </AppFlex>
  </AppSection>
</template>

<script setup lang="ts">
import { Geneset } from "@/api/genesets";

interface Props {
  // current geneset
  geneset: Geneset;
  // whether geneset is editable
  editable: boolean;
  // whether geneset is new
  fresh: boolean;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.tags {
  font-style: italic;
  color: $gray;

  svg {
    margin-right: 5px;
  }
}
</style>
