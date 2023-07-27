<template>
  <div class="table" :style="{ 'grid-template-columns': columns }">
    <!-- Labels -->
    <slot
      v-for="field in fieldsList"
      :name="`${field}-column`"
      :field="field"
      :label="fields[field]?.label"
      :sortable="!!fields[field]?.sortable"
      :sort="setSort"
    >
      <div
        :key="field"
        class="table__cell table__cell_label"
        :class="{
          table__cell_label_sortable: fields[field].sortable,
          table__cell_label_sort_desc:
            sort?.field === field && sort?.direction === 1,
          table__cell_label_sort_asc:
            sort?.field === field && sort?.direction === 0,
        }"
        @click="() => setSort(field)"
      >
        <span>{{ fields[field]?.label || "" }}</span>

        <SortArrowIcon v-if="fields[field]?.sortable" />
      </div>
    </slot>

    <!-- Items -->
    <template v-for="(item, index) in data">
      <slot
        v-for="field in fieldsList"
        :name="field"
        :value="item[field]"
        :item="item"
        :index="index"
      >
        <Cell :key="`${item[field]}-${index}`">
          {{
            typeof fields[field]?.formatter === "function"
              ? fields[field].formatter(item[field], item, index)
              : item[field]
          }}
        </Cell>
      </slot>
    </template>

    <!-- No Data -->
    <div
      v-if="data.length === 0"
      class="table__cell"
      :style="{ 'grid-column': `1 / ${fieldsList.length + 1}` }"
    >
      Нет данных
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

// Components
import Cell from "./cell.vue";

// Icons
import SortArrowIcon from "@/components/icons/sort-arrow.vue";

const props = defineProps({
  sort: { type: Object, default: null },
  data: { type: Array, default: () => [] },
  fields: { type: Object, required: true },
});

const emit = defineEmits(["sort"]);

const fieldsList = computed(() => Object.keys(props.fields));
const columns = computed(() => {
  return Object.keys(props.fields)
    .map((field) => props.fields[field]?.width || "auto")
    .join(" ");
});

function setSort(field) {
  if (!props.fields[field]?.sortable) return;

  if (props.sort?.field === field) {
    emit("sort", field, Number(!props.sort.direction));
    return;
  }

  emit("sort", field, 0);
}
</script>

<style src="@/assets/css/components/table.css" />
