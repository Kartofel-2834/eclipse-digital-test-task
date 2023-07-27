<template>
  <main>
    <h1>Список валют</h1>
    <Input :value="search" placeholder="Поиск" @change="(v) => (search = v)" />

    <Table :data="currentPage" :fields="tableFields" />
    <Pagination :page="page" :total="totalPages" @change="(v) => (page = v)" />
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

// Store
import { useValutesStore } from "@/stores/valutes";

// Utils
import lower from "@/utils/lower";

// Components
import Input from "@/components/common/Input";
import Table from "@/components/common/Table/index.vue";
import Cell from "@/components/common/Table/cell.vue";
import Pagination from "@/components/common/Pagination";

const { ceil } = Math;

const valutes = useValutesStore();

const search = ref("");
const page = ref(1);
const pageLen = ref(10);

const data = computed(() => {
  if (!valutes?.data) return [];

  const tester = new RegExp(lower(search.value), "gm");
  const result = Object.keys(valutes.data).map(
    (valuteChar) => valutes.data[valuteChar]
  );

  return result.filter((valute) =>
    tester.test(lower(valute.Name) || tester.test(lower(valute.CharCode)))
  );
});

const currentPage = computed(() => {
  return data.value.slice(
    (page.value - 1) * pageLen.value,
    page.value * pageLen.value
  );
});

const totalPages = computed(() => {
  return ceil(data.value.length / pageLen.value);
});

const tableFields = ref({
  ID: { width: "min-content", label: "ID" },
  CharCode: { label: "Код" },
  Name: { label: "Название" },
  Value: { label: "Текущий курс" },
  Previous: { label: "Изменения" },
});
</script>

<style src="@/assets/css/pages/converter.css" />
