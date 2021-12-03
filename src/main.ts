import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueToast from "vue-toast-notification";

import "@/core/common/array-extends.js";
import "vue-toast-notification/dist/theme-sugar.css";

const app = createApp(App);

app.use(VueToast);
app.use(router);
app.mount("#app");
