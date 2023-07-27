<template>
  <main>
    <h1>Конвертер валют</h1>

    <div class="converter">
      <div class="converter__side converter__side_left">
        <Input
          type="number"
          :value="from"
          :precision="4"
          :min="0"
          @change="(v) => (from = v)"
        />

        <Select
          :value="fromValute"
          :options="valutesTags"
          :filter="valutesFilter"
          filterable
          @change="(v) => (fromValute = v)"
        />
      </div>

      <TranslateIcon class="converter__translate" @click="translate" />

      <div class="converter__side converter__side_left">
        <Input
          type="number"
          disabled
          :value="to"
          :precision="4"
          :min="0"
          class="converter__left"
        />

        <Select
          :value="toValute"
          :options="valutesTags"
          :filter="valutesFilter"
          filterable
          @change="(v) => (toValute = v)"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

// Store
import { useValutesStore } from "@/stores/valutes";

// Utils
import convertValute from "@/utils/convertValute";
import lower from "@/utils/lower";

// Components
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";

// Icons
import TranslateIcon from "@/components/icons/translate";

const valutes = useValutesStore();

const fromValute = ref("USD");
const from = ref("0");

const toValute = ref("EUR");
const to = computed(() => {
  if (!valutes?.data) return "0";

  const { Value: fromPrice } = valutes.data[fromValute.value];
  const { Value: toPrice } = valutes.data[toValute.value];

  return `${convertValute(Number(from.value), fromPrice, toPrice)}`;
});

const valutesTags = computed(() =>
  !valutes.data ? [] : Object.keys(valutes.data)
);

function valutesFilter(filter, valute) {
  if (!valutes.data) return false;

  const info = valutes.data[valute];
  const tester = new RegExp(lower(filter), "gm");

  return tester.test(lower(valute)) || tester.test(lower(info.Name));
}

function translate() {
  [fromValute.value, toValute.value] = [toValute.value, fromValute.value];
}
</script>

<style src="@/assets/css/pages/converter.css" />
