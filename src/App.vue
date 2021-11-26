<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style lang="scss">
@import "~@/../mdb/scss/index.free.scss";
@import "~@/assets/css/app.scss";

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
