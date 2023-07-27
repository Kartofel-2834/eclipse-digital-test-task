import { ref } from "vue";
import { defineStore } from "pinia";

// Utils
import { api } from "@/utils/api";

export const useValutesStore = defineStore("valutes", () => {
  const data = ref(null);

  async function fetch() {
    const { data: response } = await api.getValutes();

    if (!response || !response?.Valute) return;

    data.value = response.Valute;
  }

  if (!Array.isArray(data.value)) fetch();

  return {
    data,
    fetch,
  };
});
