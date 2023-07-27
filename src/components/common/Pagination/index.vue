<template>
  <div class="pagination">
    <div
      v-for="pageLink of content"
      :class="{
        pagination__element: !isNaN(pageLink),
        pagination__element_active: pageLink == page,
        pagination__dots: isNaN(pageLink),
      }"
      @click="() => onLinkClick(pageLink)"
    >
      {{ pageLink || "..." }}
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

const emit = defineEmits(["change"]);

const props = defineProps({
  page: { type: Number, default: 1 },
  total: { type: Number, default: 1 },
});

const content = computed(() => {
  const update = [];
  const addFromTo = (from, to) => {
    for (let i = from; i <= to; i++) update.push(i);
  };

  if (props.total <= 8) {
    addFromTo(1, props.total);
  } else if (props.page <= 3) {
    addFromTo(1, 5);
    update.push(NaN, props.total);
  } else if (props.page >= props.total - 4) {
    update.push(1, NaN);
    addFromTo(props.total - 4, props.total);
  } else {
    update.push(
      1,
      NaN,
      props.page - 1,
      props.page,
      props.page + 1,
      NaN,
      props.total
    );
  }

  return update;
});

function onLinkClick(newPage) {
  if (isNaN(newPage)) return;

  emit("change", newPage);
}
</script>

<style src="@/assets/css/components/pagination.css" />
