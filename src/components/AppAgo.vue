<!-- 
  show date/time in relative format
-->

<template>
  <span v-tippy="precise">{{ relative }}</span>
</template>

<script lang="ts">
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { computed } from "vue";

// create ago parser
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
</script>

<script setup lang="ts">
interface Props {
  // date object
  date: Date;
}

const props = defineProps<Props>();

// get display times
const precise = computed(() => props.date.toLocaleString());
const relative = computed(() => timeAgo.format(props.date));
</script>
