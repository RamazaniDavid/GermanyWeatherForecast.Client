<template>
  <div class="weather-icon">
    <img :src="require('@/assets/images/animated/' + icon + '.svg')" alt="" />
  </div>
</template>

<script lang="ts">
export default {
  name: "WeatherIcon",
  components: {},
  directives: {},
  methods: {},
  props: {
    icon: {
      type: String,
      required: false,
      default: () => "clear-day",
    },
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
