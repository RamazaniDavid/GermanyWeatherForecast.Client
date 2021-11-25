<template>
  <div class="weather-icon">
    <img src="../assets/images/animated/overcast-day.svg" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "WeatherIcon",
  components: {},
  directives: {},
  props: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
