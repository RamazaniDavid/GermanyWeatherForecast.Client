<template>
  <div class="city-info">
    <MDBRow class="">
      <MDBCol col="6">
        <div class="">
          <h1 class="city-title">{{ city.name }}</h1>
          <p class="date-time-info">
            {{ currentDate }}
            <strong class="current-time">{{ timestamp }}</strong>
          </p>
        </div>
      </MDBCol>
      <MDBCol col="6">
        <div class="p-3">
          <WeatherIcon class="WeatherIcon" />
        </div>
      </MDBCol>
      <MDBCol col="6">
        <div class="p-3"></div>
      </MDBCol>
      <MDBCol col="6">
        <div class="p-3"></div>
      </MDBCol>
    </MDBRow>
    <MDBRow class="">
      <MDBCol col="12">
        <div class="p-3">
          <MDBTabs v-model="activeTabId3">
            <!-- Tabs navs -->
            <MDBTabNav justify tabsClasses="mb-3">
              <MDBTabItem tabId="ex3-1" href="ex3-1">Link</MDBTabItem>
              <MDBTabItem tabId="ex3-2" href="ex3-2"
                >Very very very very long link</MDBTabItem
              >
              <MDBTabItem tabId="ex3-3" href="ex3-3">Another link</MDBTabItem>
            </MDBTabNav>
            <!-- Tabs navs -->
            <!-- Tabs content -->
            <MDBTabContent>
              <MDBTabPane tabId="ex3-1">Tab 1 content</MDBTabPane>
              <MDBTabPane tabId="ex3-2">Tab 2 content</MDBTabPane>
              <MDBTabPane tabId="ex3-3">Tab 3 content</MDBTabPane>
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
      timestamp: "",
      currentDate: "",
      city: {
        name: "Berlin",
        country: "",
        sunrise: "",
        sunset: "",
        temp: "",
        temp_min: "",
        temp_max: "",
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
