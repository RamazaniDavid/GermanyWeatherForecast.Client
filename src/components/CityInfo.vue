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
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      activeTabId: "tb_hou",
      timestamp: "",
      currentDate: "",
      city: {
        name: "Berlin",
        country: "",
        sunrise: "",
        sunset: "",
        temp: 10,
        temp_min: 2,
        temp_max: 16,
        pressure: "",
        humidity: "",
        wind_speed: "",
        wind_deg: "",
        weather: {
          description: "",
          icon: "",
        },
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
    getCurrentDate(): string {
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
  position: relative;
  top: -15px;
}

.city-title {
  font-size: 8em;
  font-weight: bold;
  text-align: left;
  color: #ffffff;
}

.temp-info {
  font-size: 4em;
  font-weight: bold;
  text-align: left;
  color: #ffffff;
  line-height: 0.5em;
  position: relative;
  top: 65px;
}

.temp-info .temp-max-min {
  font-size: 16pt;
  font-weight: bold;
  position: relative;
  left: 20px;
  color: #ffffff;
}

.temp-info .temp-max-min .temp-min {
  color: #2b80ff;
}
.temp-info .temp-max-min .temp-max {
  color: #e6e6e6;
}

.date-time-info {
  font-size: 2em;
  text-align: left;
  color: #ffffff;
}
</style>
