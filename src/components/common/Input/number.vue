<template>
  <input
    :value="value"
    :disabled="disabled"
    :placeholder="placeholder"
    class="input"
    @input="(e) => onChange(e.target.value)"
    @keydown="onKeydown"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Utils
import roundTo from "@/utils/roundTo";

const emit = defineEmits(["change"]);

const props = defineProps({
  value: { type: String, default: "" },
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  disabled: { type: Boolean, default: false },
  step: { type: Number, default: 1 },
  precision: { type: Number, default: 2 },
  placeholder: { type: String, default: "" },
});

const allowedKeys = new Set(["Backspace", "ArrowLeft", "ArrowRight"]);
const specialKeys = {
  ArrowUp: up,
  ArrowDown: down,
};

function onChange(currentValue) {
  const isNegative = currentValue.match(/-/g)?.length === 1;
  let update = roundTo(
    Number(
      currentValue
        .split(".")
        .map((s) => s.replaceAll(/[^0-9]/g, ""))
        .join(".")
    ),
    props.precision
  );

  update = update * (isNegative ? -1 : 1);
  update = update > props.max ? props.max : update;
  update = update < props.min ? props.min : update;

  emit("change", `${update}`);
}

function onKeydown(event) {
  if (event.ctrlKey) return;

  const { value: currentValue, selectionStart } = event.target;
  const { key } = event;

  let precision = currentValue.split(".");
  precision = precision?.length > 1 ? precision.pop() : null;

  if (allowedKeys.has(key)) return;

  if (specialKeys[key]) return specialKeys[key](event);

  const n = Number(props.value) || 0;

  if (/[0-9]/g.test(key) && n < props.max && n >= props.min) {
    if (!precision || selectionStart <= currentValue.indexOf(".")) return;
    if (precision?.length < props.precision) return;
  }

  switch (key) {
    case ".":
      if (!currentValue.includes(".")) return;
      break;
    case "-":
      if (!/^0+$/.test(props.value)) return;
      break;
  }

  event.preventDefault();
}

function up() {
  let update = Number(props.value) || 0;
  update = update + (props.step || 1);

  if (update > props.max) return;

  emit("change", `${roundTo(update, props.precision)}`);
}

function down() {
  let update = isNaN(props.value) ? 0 : Number(props.value);
  update = update - (props.step || 1);

  if (update < props.min) return;

  emit("change", `${roundTo(update, props.precision)}`);
}
</script>
