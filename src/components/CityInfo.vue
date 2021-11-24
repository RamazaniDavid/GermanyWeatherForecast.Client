<template>
  <div class="city-info">
    <div class="">
      <div col="6">
        <div class="">
          <h1 class="city-title">{{ city.name }}</h1>
          <p class="date-time-info">
            {{ currentDate }}
            <strong class="current-time">{{ timestamp }}</strong>
          </p>
        </div>
      </div>
      <div col="6">
        <div class="p-3">
          <WeatherIcon class="WeatherIcon" />
        </div>
      </div>
      <div col="6">
        <div class="p-3"></div>
      </div>
      <div col="6">
        <div class="p-3"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import WeatherIcon from "@/components/WeatherIcon.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "CityInfo",
  data() {
    return {
      timestamp: "",
      currentDate: "",
      city: {
        name: "Berlin",
        temp: 10,
        min: 2,
        max: 16,
      },
    };
  },
  components: {
    WeatherIcon,
  },
  directives: {},
  created(): void {
    debugger;
    this.getNow();
    this.currentDate = this.getCurrentDate();
    setInterval(() => {
      this.getNow();
    }, 1000);
  },
  beforeUnmount(): void {
    clearInterval();
  },
  methods: {
    getCurrentDate() {
      return new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    },
    getNow(): void {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      if (hours === 0 && minutes === 0) {
        this.currentDate = this.getCurrentDate();
      }
      this.timestamp = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    },
  },
  props: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.city-info {
  top: 0px;
  left: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 40px;
}

.WeatherIcon {
  width: 200px;
  height: 200px;
}

.city-title {
  font-size: 8em;
  font-weight: bold;
  text-align: left;
  color: #ffffff;
}

.date-time-info {
  font-size: 2em;
  text-align: left;
  color: #ffffff;
}
</style>
