import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueToast from "vue-toast-notification";
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import "vue-toast-notification/dist/theme-sugar.css";

const app = createApp(App);

app.config.globalProperties.appConfig = {
  name: "customProperty",
};
app.use(VueToast);
app.use(router);
app.mount("#app");
