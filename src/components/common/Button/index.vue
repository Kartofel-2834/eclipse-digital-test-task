<template>
  <button
    class="button"
    :disabled="disabled"
    :class="{
      button_filled: filled,
      button_rounded: rounded,
      button_reverse: reverse,
    }"
  >
    <slot />
  </button>
</template>

<script setup>
import { defineProps, useSlots } from "vue";

const slots = useSlots();
const props = defineProps({
  icon: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  filled: { type: Boolean, default: false },
  reverse: { type: Boolean, default: false },
});
</script>

<style src="@/assets/css/components/button.css" />
