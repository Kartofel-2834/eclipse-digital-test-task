import { createApp } from "vue";
import { createPinia } from "pinia";

import appPage from "./app.vue";
import router from "./router";

const pinia = createPinia();
const app = createApp(appPage);

app.use(router);
app.use(pinia);

app.mount("#app");
