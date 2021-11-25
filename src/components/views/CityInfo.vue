<template>
  <div class="city-info">
    <MDBRow class="">
      <MDBCol col="12" sm="12" md="6">
        <h1 class="city-title">{{ city.name }}</h1>
        <p class="date-time-info">
          {{ currentDate }}
          <strong class="current-time">{{ timestamp }}</strong>
        </p>
      </MDBCol>
      <MDBCol col="6" sm="6" md="3">
        <div class="temp-info">
          <p class="temp-value">
            {{ city.temp }} <span class="temp-unit">°</span>
          </p>
          <p class="temp-max-min">
            <span class="temp-max">{{ city.temp_max }}</span>
            /
            <span class="temp-min">{{ city.temp_min }}</span>
          </p>
        </div>
      </MDBCol>
      <MDBCol col="6" sm="6" md="3">
        <WeatherIcon class="WeatherIcon" />
      </MDBCol>
      <MDBCol col="6" sm="12">
        <div class="p-3"></div>
      </MDBCol>
      <MDBCol col="6">
        <div class="p-3"></div>
      </MDBCol>
    </MDBRow>
    <MDBRow class="tab-container">
      <MDBCol col="12">
        <AppTab :tabList="tabList">
          <template v-slot:tabPanel-1>
            <div class="item-wrapper">
              <div v-for="item in city.hourly" :key="item" class="hourly-item">
                <p>
                  {{ item.time }}
                </p>
                <div>
                  <WeatherIcon class="WeatherIcon-hourly" :icon="item.icon" />
                </div>
                <p>
                  {{ item.temp }}
                </p>
              </div>
            </div>
          </template>
          <template v-slot:tabPanel-2> Content 2 </template>
          <template v-slot:tabPanel-3> Content 3 </template>
        </AppTab>
      </MDBCol>
    </MDBRow>
  </div>
</template>

<script lang="ts">
import WeatherIcon from "@/components/widgets/WeatherIcon.vue";
import AppTab from "@/components/containers/tab/AppTab.vue";

import { MDBCol, MDBRow } from "mdb-vue-ui-kit";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CityInfo",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      activeTabId: "tb_hou",
      timestamp: "",
      currentDate: "",
      tabList: ["Hourly", "Daily", "Detail"],
      city: {
        name: "Berlin",
        hourly: [
          {
            time: "Now",
            temp: "12",
            icon: "clear-day",
          },
          {
            time: "2 PM",
            temp: "13",
            icon: "dust-day",
          },
          {
            time: "4 PM",
            temp: "13",
            icon: "fog-day",
          },
          {
            time: "6 PM",
            temp: "13",
            icon: "fog-night",
          },
          {
            time: "8 PM",
            temp: "13",
            icon: "overcast-night",
          },
          {
            time: "10 PM",
            temp: "13",
            icon: "partly-cloudy-night",
          },
        ],
        dailly: [
          {
            date: "",
            temp: "",
            temp_max: "",
            temp_min: "",
            icon: "",
          },
        ],
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
    MDBRow,
    MDBCol,
    AppTab,
  },
  directives: {},
  created(): void {
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
  props: {
    msg: String,
  },
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

.WeatherIcon-hourly {
  width: 60px;
  height: 60px;
}
.city-title {
  font-size: 7em;
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

.tab-container {
  position: absolute;
  bottom: 0px;
  left: 5%;
  width: 90%;
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

.hourly-item {
  color: #ffffff;
  font-size: 1em;
  text-align: -webkit-center !important;
  text-align: center;
  width: 20%;
  min-width: 200px;
  display: inline;
}

.item-wrapper {
  display: -webkit-inline-box;
  overflow: auto;
  max-width: 100%;
  width: 100%;
}

@media (max-width: 540px) {
  .city-title {
    font-size: 3em;
  }

  .date-time-info {
    font-size: 10pt;
  }

  .WeatherIcon {
    width: 100px;
    height: 100px;
  }

  .temp-info {
    font-size: 3em;
    line-height: 0.5em;
    position: relative;
    top: 25px;
  }

  .temp-info .temp-max-min {
    font-size: 10pt;
    left: 15px;
    color: #ffffff;
  }
}
@media (min-width: 541px) and (max-width: 1000px) {
  .city-title {
    font-size: 3.5em;
  }

  .date-time-info {
    font-size: 10pt;
  }

  .WeatherIcon {
    width: 150px;
    height: 150px;
  }
  .temp-info {
    top: 15px;
  }
}
</style>
