<template>
  <div
    class="select"
    :class="{
      select_opened: opened && !disabled,
      select_disabled: disabled,
    }"
    @click.stop
  >
    <div class="select__field" @click="toggleOptions">
      <Input
        :value="opened && filterable ? filter : currentLabel"
        :placeholder="opened && filterable ? currentLabel : placeholder"
        :disabled="!filterable"
        @change="(v) => (filter = v)"
      />

      <ArrowIcon class="select__opener" />
    </div>

    <div class="select__dropdown">
      <slot
        v-for="(option, index) in filteredOptions"
        :key="option[field] || option || index"
        :index="index"
        :option="option"
        :selected="checkIsSelected(option)"
        :select="() => onSelect(option)"
        name="option"
      >
        <Option
          :key="option[field] || option || index"
          :selected="checkIsSelected(option)"
          @click="() => onSelect(option)"
        >
          {{ option }}
        </Option>
      </slot>

      <Option
        v-if="!filteredOptions?.length"
        disabled
        class="select__dropdown__nodata"
      >
        No options
      </Option>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, onMounted } from "vue";

// Components
import Input from "../Input";
import Option from "./option.vue";

// Icons
import ArrowIcon from "@/components/icons/arrow";

const emit = defineEmits(["change"]);

const props = defineProps({
  value: { required: true },
  disabled: { type: Boolean, default: false },
  filterable: { type: Boolean, default: false },
  placeholder: { type: String, default: "Select" },
  filter: { type: Function, required: false },
  field: { type: String, default: "value" },
  label: { type: String, default: "label" },
  options: { type: Array, default: () => [] },
});

const opened = ref(false);
const filter = ref("");

const currentLabel = computed(() => {
  if (!props.value) return "";

  return props.value[props.label] || props.value;
});

const filteredOptions = computed(() => {
  if (!props.filterable || !filter.value.length) return props.options;

  if (!Array.isArray(props.options)) return [];

  if (props?.filter) {
    return props.options.filter((option) => props.filter(filter.value, option));
  }

  const tester = new RegExp(`${filter.value}`.toLowerCase(), "gm");

  return props.options.filter((option) => {
    const v = option[props.field] || option;

    return tester.test(`${v}`.toLowerCase());
  });
});

function toggleOptions() {
  if (props.disabled) return;

  opened.value = !opened.value;
}

function onSelect(option) {
  if (checkIsEqualOptions(props.value, option)) {
    emit("change", null);
  } else {
    emit("change", option);
  }

  opened.value = false;
}

function checkIsSelected(option) {
  return checkIsEqualOptions(props.value, option);
}

function checkIsEqualOptions(a, b) {
  if (!a) return false;

  if (a[props.field]) {
    return a[props.field] === b[props.field];
  }

  return a === b;
}

onMounted(() => {
  window.addEventListener("click", (event) => {
    opened.value = false;
  });
});
</script>

<style src="@/assets/css/components/select.css" />
