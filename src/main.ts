import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.config.globalProperties.appConfig = {
  name: "customProperty",
};

app.use(router);
app.mount("#app");
