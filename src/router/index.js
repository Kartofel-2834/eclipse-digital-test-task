import { createRouter, createWebHistory } from "vue-router";

// Pages
import Converter from "@/pages/converter";
import ValutesList from "@/pages/valute";

const routes = [
  {
    path: "/",
    name: "Converter",
    component: Converter,
  },
  {
    path: "/valute",
    name: "Valutes",
    component: ValutesList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
