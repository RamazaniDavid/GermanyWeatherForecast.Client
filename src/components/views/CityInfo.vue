<template>
  <div class="city-info">
    <MDBRow class="">
      <MDBCol col="12">
        <p class="city-title pointer" @click="showModal = true">
          <img
            class="city-select-img"
            src="@/assets/images/animated/location.webp"
          />{{ city.name }}
        </p>
        <p class="date-time-info">
          {{ currentDate }}
          <strong class="current-time"> {{ timestamp }}</strong>
        </p>
        <div class="system-switch">
          <img
            class="system-img-c"
            :class="{ 'system-img-active': metricSystem === true }"
            src="@/assets/images/animated/celsius.svg"
          /><MDBSwitch v-model="metricSystem" class="system-switch-btn" /><img
            :class="{ 'system-img-active': metricSystem !== true }"
            class="system-img-f"
            src="@/assets/images/animated/fahrenheit.svg"
          />
        </div>
      </MDBCol>
      <MDBCol col="6" sm="6" md="6">
        <div class="temp-info">
          <p class="temp-value">
            {{
              metricSystem === true
                ? city?.current?.tempMet
                : city?.current?.tempImp
            }}
            <span class="temp-unit">°</span>

            <span class="temp-max-min">
              <span class="temp-max">{{
                metricSystem === true
                  ? city?.current?.maxTempMet
                  : city?.current?.maxTempImp
              }}</span>
              /
              <span class="temp-min">{{
                metricSystem === true
                  ? city?.current?.minTempMet
                  : city?.current?.minTempImp
              }}</span>
            </span>
          </p>
        </div>
      </MDBCol>
      <MDBCol col="6" sm="6" md="6">
        <WeatherIcon class="WeatherIcon" :icon="city?.current?.weatherIcon" />
      </MDBCol>
    </MDBRow>
    <MDBRow class="tab-container">
      <MDBCol col="12">
        <AppTab :tabList="tabList">
          <template v-slot:tabPanel-1>
            <div class="item-wrapper">
              <div v-for="item in city.daily" :key="item" class="hourly-item">
                <p>
                  {{ item.dayName }}
                </p>
                <WeatherIcon
                  class="WeatherIcon-hourly"
                  :icon="item.weatherIcon ?? '01d'"
                />
                <p>
                  {{ metricSystem === true ? item.tempMet : item.tempImp }}°
                </p>
              </div>
            </div>
          </template>
          <template v-slot:tabPanel-2>
            <div class="item-wrapper">
              <div
                v-for="item in city.hourly?.slice(0, 8)"
                :key="item"
                class="hourly-item"
              >
                <p>
                  {{ item.time }}
                </p>
                <WeatherIcon
                  class="WeatherIcon-hourly"
                  :icon="item.weatherIcon"
                />
                <p>
                  {{ metricSystem === true ? item.tempMet : item.tempImp }}°
                </p>
              </div>
            </div></template
          >
          <template v-slot:tabPanel-3> Content 3 </template>
        </AppTab>
      </MDBCol>
    </MDBRow>
  </div>
  <MDBModal
    id="locationSelectorModal"
    tabindex="-1"
    labelledby="exampleModalLabel"
    size="lg"
    v-model="showModal"
  >
    <MDBModalHeader>
      <MDBModalTitle id="exampleModalLabel">
        <Input v-model:value="searchExpression" />
      </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <div class="modal-container">
        <MDBRow class="city-list" v-if="showSearchResult">
          <MDBCol
            col="4"
            sm="4"
            md="3"
            lg="2"
            class="city-item"
            v-for="(item, index) in suggestedCity"
            :key="index"
            @click="fillCity(item.name)"
          >
            <WeatherIcon :icon="item.weatherIcon" />
            <p>
              {{ item.name }}
            </p>
            <p>{{ metricSystem === true ? item.tempMet : item.tempImp }}°</p>
          </MDBCol>
        </MDBRow>
        <MDBRow class="city-list" v-if="showRecentSearched">
          <MDBCol
            col="4"
            sm="4"
            md="3"
            lg="2"
            class="city-item"
            v-for="(item, index) in recentSearched"
            :key="index"
            @click="fillCity(item.name)"
          >
            <WeatherIcon :icon="item.current?.weatherIcon" />
            <p>
              {{ item.name }}
            </p>
            <p>
              {{
                metricSystem === true
                  ? item.current?.tempMet
                  : item.current?.tempImp
              }}°
            </p>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBModalBody>
  </MDBModal>
</template>

<script lang="ts">
import WeatherIcon from "@/components/widgets/WeatherIcon.vue";
import AppTab from "@/components/containers/tab/AppTab.vue";
import Input from "@/components/inputs/Input.vue";

import { MDBCol, MDBRow } from "mdb-vue-ui-kit";
import { defineComponent, Ref } from "vue";

import weatherSrv from "@/core/services/weather.service";

import {
  MDBModal,
  MDBModalBody,
  MDBSwitch,
  MDBModalTitle,
  MDBModalHeader,
} from "mdb-vue-ui-kit";
import { ref } from "vue";

export default defineComponent({
  name: "CityInfo",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    var data: {
      showModal: Ref<boolean>;
      metricSystem: Ref<boolean>;
      searchExpression: Ref<string>;
      activeTabId: string;
      timestamp: string;
      currentDate: string;
      tabList: string[];
      city: any;
      germanCities: { name: string }[];
      suggestedCity: any[];
      recentSearched: Ref<any[]>;
    } = {
      showModal: ref(false),
      metricSystem: ref(true),
      searchExpression: ref(""),
      activeTabId: "tb_hou",
      timestamp: "",
      currentDate: "",
      tabList: ["Daily", "Hourly", "Detail"],
      city: {},
      germanCities: [],
      suggestedCity: [],
      recentSearched: ref([]),
    };
    return data;
  },
  computed: {
    showSearchResult() {
      return this.suggestedCity.length > 0;
    },
    showRecentSearched() {
      return this.searchExpression.length < 4;
    },
  },
  components: {
    WeatherIcon,
    MDBRow,
    MDBCol,
    AppTab,
    MDBModal,
    MDBSwitch,
    MDBModalBody,
    Input,
    MDBModalTitle,
    MDBModalHeader,
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
  mounted(): void {
    this.fillCity("Berlin");
    this.fetchCities();
  },
  watch: {
    searchExpression(newVal) {
      this.searchCity(newVal);
    },
  },
  methods: {
    fetchCities(): void {
      import("@/core/data/GermanCities.json").then((res) => {
        this.germanCities = res.cities;
      });
    },
    searchCity(expr: string): void {
      this.suggestedCity = [];
      if (expr.length < 4) return;
      let filter = this.germanCities
        .filter((city) => {
          return city.name.toLowerCase().includes(expr.toLowerCase());
        })
        .sort((a, b) => {
          return a.name.toLowerCase() === expr.toLowerCase()
            ? -1
            : b.name.toLowerCase() === expr.toLowerCase()
            ? 1
            : a.name.toLowerCase().startsWith(expr.toLowerCase())
            ? -1
            : b.name.toLowerCase().startsWith(expr.toLowerCase())
            ? 1
            : a.name > b.name
            ? -1
            : 1;
        });
      filter.forEach((ct) => {
        weatherSrv.currentInfo(ct.name, "").then((res) => {
          this.suggestedCity.push(res);
        });
      });
    },

    fillCity(cityName: string): void {
      weatherSrv
        .forcast(cityName, "")
        .then((res) => {
          this.city = res;
        })
        .catch((err) => {
          console.log(err);
        });
      this.searchExpression = "";
      this.suggestedCity = [];
      this.showModal = false;
      debugger;
      let viewedCity: { name: string; current: unknown }[] = JSON.parse(
        localStorage.getItem("viewedCity") ?? "[]"
      );
      this.recentSearched = viewedCity;
    },
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

.city-item {
  cursor: pointer;
  font-size: 8pt;
  padding: 3px;
  text-align: center;
  line-height: 10pt;
  border: solid 1px gray;
  border-radius: 10px;
  margin: 10px;
  height: 130px;
  -webkit-box-shadow: 3px 10px 16px 4px rgb(212 212 212 / 52%);
  box-shadow: 3px 10px 16px 4px rgb(212 212 212 / 52%);
}

.city-item .weather-icon {
  width: 64px;
  height: 64px;
  margin: 0px;
  padding: 0px;
  position: relative;
  left: calc(50% - 32px);
  top: 0px;
}

.city-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 375px);
  overflow-y: scroll;
  padding: 5px;
}

.city-title {
  font-size: 5em;
  font-weight: bold;
  text-align: left;
  color: white;
  border-bottom: solid;
  width: 35%;
  margin: 0px;
  margin-left: 50px;
  padding: 0px;
  padding-bottom: 10px;
  outline: none;
  line-height: 1em;

  inline-size: fit-content;
}

.city-select-img {
  position: absolute;
  left: 0px;
  top: 25px;
  width: 100px;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  cursor: pointer;
}

.temp-info {
  font-size: 7em;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  line-height: 0.5em;
  position: relative;
  top: 100px;
}

.temp-info .temp-max-min {
  font-size: 0.3em;
  font-weight: bold;
  color: #ffffff;

  left: -25px;
  position: relative;
}

.temp-info .temp-max-min .temp-min {
  color: #2b80ff;
}
.temp-info .temp-max-min .temp-max {
  color: #e6e6e6;
}

.system-switch {
  position: absolute;
  right: 75px;
  top: 10px;
  width: 100px;
  cursor: pointer;
  display: inline-flex;
}

.system-switch .form-switch {
  position: absolute;
  left: 60px;
}

.system-img-f {
  width: 64px;
  filter: invert(0) sepia(1) saturate(2) hue-rotate(180deg);
  position: absolute;
  top: -22px;
  left: 0px;
}

.system-img-c {
  width: 64px;
  filter: invert(0) sepia(1) saturate(2) hue-rotate(180deg);
  position: absolute;
  top: -22px;
  left: 85px;
}

.system-img-active {
  width: 72px;
  filter: invert(1) sepia(1) saturate(1) hue-rotate(180deg);
  top: -28px;
}

.WeatherIcon {
  width: 300px;
  height: 300px;
  position: relative;
  left: calc(50% - 150px);
}

.date-time-info {
  font-size: 2em;
  text-align: left;
  color: #ffffff;
  margin-left: 50px;
}

.tab-container {
  position: absolute;
  bottom: 0px;
  left: 5%;
  width: 90%;
  height: 180px;
}

.hourly-item {
  color: #ffffff;
  font-size: 1em;
  text-align: center;
  width: 20%;
  min-width: 130px;
}

.hourly-item p {
  margin: 0px;
  padding: 0px;
}

.hourly-item .WeatherIcon-hourly {
  position: relative;
  left: calc(50% - 30px);

  width: 60px;
  height: 60px;
}

.item-wrapper {
  display: -webkit-inline-box;
  overflow: auto;
  max-width: 100%;
  width: 100%;

  scrollbar-color: #0a4c95 #c2d2e4;
  scrollbar-width: thin;
  scroll-behavior: smooth;
}

.modal-container {
  height: calc(100vh - 350px);
  padding: 10px;
  border: solid 1px #343434;
  border-radius: 10px;
}

@media (max-width: 540px) {
  .city-title {
    font-size: 1.5em;
    margin-left: 15px;
  }

  .date-time-info {
    font-size: 10pt;
    margin-left: 15px;
  }

  .WeatherIcon {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 200px;
    left: calc(50% - 50px);
  }

  .city-select-img {
    width: 64px;
  }

  .temp-info {
    font-size: 3em;
    line-height: 0.5em;
    position: absolute;
    top: 140px;
    left: calc(50% - 50px);
  }

  .temp-info .temp-max-min {
    font-size: 10pt;
    left: 15px;
    color: #ffffff;
  }

  .tab-container {
    height: 180px;
  }

  .system-switch {
    right: 25px;
    top: 20px;
  }

  .system-switch img {
    width: 48px;
  }

  .system-img-f {
    top: -15px;
    left: 20px;
  }

  .system-img-c {
    top: -15px;
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
@media (min-width: 1001px) and (max-width: 1441px) {
  .city-title {
    font-size: 3.5em;
  }

  .WeatherIcon {
    width: 200px;
    height: 200px;
    top: -50px;
  }
  .temp-info {
    top: 35px;
  }
}
@media (min-width: 1442px) {
}
</style>
