<template>
  <NumberInput
    v-if="type === 'number'"
    :value="value"
    :min="min"
    :max="max"
    :placeholder="placeholder"
    :disabled="disabled"
    :precision="precision"
    :step="step"
    @change="(v) => emit('change', v)"
  />

  <input
    v-else
    :value="value"
    :type="type"
    :disabled="disabled"
    :placeholder="placeholder"
    class="input"
    @input="(e) => emit('change', e.target.value)"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

// Components
import NumberInput from "./number.vue";

const emit = defineEmits(["change"]);

const props = defineProps({
  // Base
  value: { type: String, default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  disabled: { type: Boolean, default: false },

  // Number
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  precision: { type: Number, default: 2 },
  step: { type: Number, default: 1 },
});
</script>

<style src="@/assets/css/components/input.css" />
