<template>
  <div class="weather-icon">
    <img src="../assets/images/animated/overcast-day.svg" alt="" />
  </div>
</template>

<script lang="ts">
export default {
  name: "WeatherIcon",
  components: {},
  directives: {},
  props: {
    state: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
