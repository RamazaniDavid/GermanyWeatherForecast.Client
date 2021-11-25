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
    <MDBRow class="">
      <MDBCol col="12">
        <div class="p-3">
          <MDBTabs v-model="activeTabId">
            <!-- Tabs navs -->
            <MDBTabNav tabsClasses="" pills="true">
              <MDBTabItem tabId="tb_hou" href="tb_hou">Hourly</MDBTabItem>
              <MDBTabItem tabId="tb_dyl" href="tb_dyl">Daily</MDBTabItem>
              <MDBTabItem tabId="tb_inf" href="tb_inf">Detail</MDBTabItem>
            </MDBTabNav>
            <!-- Tabs navs -->
            <!-- Tabs content -->
            <MDBTabContent>
              <MDBTabPane tabId="tb_hou">Tab 1 content</MDBTabPane>
              <MDBTabPane tabId="tb_dyl">Tab 2 content</MDBTabPane>
              <MDBTabPane tabId="tb_inf">Tab 3 content</MDBTabPane>
            </MDBTabContent>
            <!-- Tabs content -->
          </MDBTabs>
        </div>
      </MDBCol>
    </MDBRow>
  </div>
</template>

<script lang="ts">
import WeatherIcon from "@/components/WeatherIcon.vue";
import {
  MDBTabs,
  MDBTabNav,
  MDBTabContent,
  MDBTabItem,
  MDBTabPane,
} from "mdb-vue-ui-kit";
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
    MDBRow,
    MDBCol,
    MDBTabs,
    MDBTabNav,
    MDBTabContent,
    MDBTabItem,
    MDBTabPane,
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

.nav-link {
  text-transform: none !important;
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
