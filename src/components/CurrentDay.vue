<template>
  <div class="current-day">
    <WeatherIcon class="WeatherIcon" />
    <!-- show current time   -->
    <strong class="current-time">{{ timestamp }}</strong>
  </div>
</template>

<script lang="ts">
import WeatherIcon from "@/components/WeatherIcon.vue";

export default {
  name: "CurrentDay",
  data() {
    return {
      timestamp: "",
    };
  },
  components: { WeatherIcon },
  directives: {},
  created(): void {
    this.getNow();
    setInterval(() => {
      this.getNow();
    }, 1000*60);
  },
  beforeUnmount(): void {
    clearInterval();
  },
  methods: {
    getNow(): void {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      this.timestamp = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    },
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.current-day {
  background-color: #ffffff1e;
}

.WeatherIcon {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 10px;
  left: 10px;
}

.current-time {
  position: absolute;
  top: 25px;
  left: 120px;
  font-size: 3em;
  font-weight: bold;
  color: #ffffff;
}
</style>
