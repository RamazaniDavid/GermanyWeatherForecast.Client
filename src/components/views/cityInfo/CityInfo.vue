<template>
  <div class="city-info">
    <MDBRow class="">
      <MDBCol col="12">
        <p class="city-title pointer" @click="showModalHandler()">
          {{ city.name }}
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
      <MDBCol col="12" sm="12" md="12" lg="6">
        <div class="detail-info">
          <span>{{
            metricSystem === true
              ? city?.current?.tempMet
              : city?.current?.tempImp
          }}</span>
          <span class="temp-unit">°</span>

          <div class="details">
            <p class="max-min-container">
              <img
                class="detail-icon"
                src="@/assets/images/animated/thermometer.svg"
              />
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
            </p>
            <p class="humidity-container">
              <img
                class="detail-icon"
                src="@/assets/images/animated/humidity.svg"
              />
              <span class="humidity">{{ city?.current?.humidity }} %</span>
            </p>
            <p class="wind-container">
              <img
                class="detail-icon"
                src="@/assets/images/animated/wind.svg"
              />
              <span class="wind">{{
                metricSystem === true
                  ? city?.current?.windSpeedMet
                  : city?.current?.windSpeedImp
              }}</span
              >{{ metricSystem === true ? " m/s" : " mph" }}
            </p>
          </div>
        </div>
      </MDBCol>
      <MDBCol col="12" sm="12" md="12" lg="6">
        <WeatherIcon class="WeatherIcon" :icon="city?.current?.weatherIcon" />
      </MDBCol>
    </MDBRow>
    <MDBRow class="tab-container">
      <MDBCol col="12">
        <AppTab :tabList="tabList">
          <template v-slot:tabPanel-1>
            <div class="item-wrapper">
              <div v-for="item in city.daily" :key="item" class="tab-items">
                <p>
                  {{ item.dayName }}
                </p>
                <WeatherIcon
                  class="tab-items-weatherIcon"
                  :icon="item.weatherIcon ?? '01d'"
                />
                <p>
                  {{ metricSystem === true ? item.tempMet : item.tempImp }}°
                  <span
                    >(
                    {{
                      metricSystem === true ? item.minTempMet : item.minTempImp
                    }}/
                    {{
                      metricSystem === true ? item.maxTempMet : item.maxTempImp
                    }})</span
                  >
                </p>
                <p class="item-humidity-container">
                  <img
                    class="item-detail-icon"
                    src="@/assets/images/animated/humidity.svg"
                  />
                  <span class="item-humidity"
                    >{{ city?.current?.humidity }} %</span
                  >
                </p>
                <p class="item-wind-container">
                  <img
                    class="item-detail-icon"
                    src="@/assets/images/animated/wind.svg"
                  />
                  <span class="item-wind">{{
                    metricSystem === true
                      ? city?.current?.windSpeedMet
                      : city?.current?.windSpeedImp
                  }}</span
                  >{{ metricSystem === true ? " m/s" : " mph" }}
                </p>
              </div>
            </div>
          </template>
          <template v-slot:tabPanel-2>
            <div class="item-wrapper">
              <div
                v-for="item in city.hourly?.slice(0, 9)"
                :key="item"
                class="tab-items"
              >
                <p>
                  {{ item.time }}
                </p>
                <WeatherIcon
                  class="tab-items-weatherIcon"
                  :icon="item.weatherIcon ?? '01d'"
                />
                <p>
                  {{ metricSystem === true ? item.tempMet : item.tempImp }}°
                  <span
                    >(
                    {{
                      metricSystem === true ? item.minTempMet : item.minTempImp
                    }}/
                    {{
                      metricSystem === true ? item.maxTempMet : item.maxTempImp
                    }})</span
                  >
                </p>
                <p class="item-humidity-container">
                  <img
                    class="item-detail-icon"
                    src="@/assets/images/animated/humidity.svg"
                  />
                  <span class="item-humidity"
                    >{{ city?.current?.humidity }} %</span
                  >
                </p>
                <p class="item-wind-container">
                  <img
                    class="item-detail-icon"
                    src="@/assets/images/animated/wind.svg"
                  />
                  <span class="item-wind">{{
                    metricSystem === true
                      ? city?.current?.windSpeedMet
                      : city?.current?.windSpeedImp
                  }}</span
                  >{{ metricSystem === true ? " m/s" : " mph" }}
                </p>
              </div>
            </div>
          </template>
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
      <MDBModalTitle id="modalTitle" class="w-100-p">
        <Input
          v-model:value="searchExpression"
          placeholder="Search your location by name, or zip code"
          class="w-100-p"
        />
      </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <div class="modal-container">
        <MDBRow class="city-list" v-if="showSearchResult">
          <MDBCol
            col="12"
            sm="12"
            md="4"
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
            col="12"
            sm="12"
            md="4"
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

import Vue from "vue";

import { MDBCol, MDBRow } from "mdb-vue-ui-kit";
import { defineComponent, Ref } from "vue";

import weatherSrv from "@/core/data/services/weather.service";

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
      germanCities: string[];
      suggestedCity: any[];
      recentSearched: Ref<any[]>;
    } = {
      showModal: ref(false),
      metricSystem: ref(true),
      searchExpression: ref(""),
      activeTabId: "tb_hou",
      timestamp: "",
      currentDate: "",
      tabList: ["Daily", "Hourly"],
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
      // In Germany there are cities with 2 chars, so we need to start filter with 2 chars
      return this.searchExpression.length < 2;
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
    showModalHandler() {
      let viewedCity: { name: string; current: unknown }[] = JSON.parse(
        localStorage.getItem("viewedCity") ?? "[]"
      );

      this.searchExpression = "";
      this.suggestedCity = [];
      this.recentSearched = viewedCity.reverse();
      this.showModal = true;
    },
    fetchCities(): void {
      import("@/core/data/GermanCities.json").then((res) => {
        this.germanCities = res.cities.map((item) => {
          return item.trim();
        });
        console.log(this.germanCities);
      });
    },
    searchCity(expr: string): void {
      this.suggestedCity = [];
      // In Germany there are cities with 2 chars, so we need to start filter with 2 chars
      if (expr.length < 2) return;
      if (isNaN(parseInt(expr.substring(0, 1)))) {
        let filter = this.germanCities
          .filter((city) => {
            return city.toLowerCase().includes(expr.toLowerCase());
          })
          .sort((a, b) => {
            return a.toLowerCase() === expr.toLowerCase()
              ? -1
              : b.toLowerCase() === expr.toLowerCase()
              ? 1
              : a.toLowerCase().startsWith(expr.toLowerCase())
              ? -1
              : b.toLowerCase().startsWith(expr.toLowerCase())
              ? 1
              : a > b
              ? -1
              : 1;
          })
          .slice(0, 10);
        filter.forEach((ct) => {
          weatherSrv.currentInfo(ct, "").then((res) => {
            this.suggestedCity.push(res);
          });
        });
      } else {
        if (expr.length === 5 && !isNaN(parseInt(expr))) {
          weatherSrv
            .currentInfo("", expr)
            .then((res) => {
              this.suggestedCity.push(res);
            })
            .catch((e) => {
              this.$toast.open({
                message: e,
                type: "warning",
              });

              this.suggestedCity = [];
            });
        }
      }
    },

    fillCity(cityName: string): void {
      weatherSrv
        .forecast(cityName, "")
        .then((res) => {
          this.city = res;
        })
        .catch((err) => {
          console.log(err);
        });
      this.showModal = false;
      this.recentSearched = [];
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
@import url(./CityInfo.scss);
@import url(./CityInfo.res.scss);
</style>
