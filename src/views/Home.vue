<template>
  <div class="bg-color"></div>
  <div class="container-overlay">
    <div class="data-box">
      <div class="bg-container"></div>
      <div class="view-container">
        <CityInfo />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CityInfo from "@/components/CityInfo.vue";
import TotalView from "@/components/TotalView.vue";

import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
  components: { CityInfo },
  directives: {},
  props: {},
});
</script>

<style lang="css" scoped>
.bg-color {
  background-image: url("../assets/images/backgrounds/cloudy-tunder.webp");
  background-size: cover;
  opacity: 0.3;
  filter: blur(1px);
  -webkit-filter: blur(1px);

  height: 100vh;
  width: 100vw;
}

.bg-container {
  background-image: url("../assets/images/backgrounds/cloudy-tunder.webp");
  opacity: 0.6;
  filter: blur(1px);
  -webkit-filter: blur(1px);
  height: 100%;
  width: 100%;
  background-size: cover;
  border-radius: 20px;
}
.container-overlay {
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: absolute;
}

.data-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 20px;
  -webkit-box-shadow: 0px 6px 9px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 6px 9px 0px rgba(0, 0, 0, 0.5);
  padding: 1px;
  background-color: rgba(128, 128, 128, 0.774);
}

@media (max-width: 700px) {
  .data-box {
    width: 80%;
  }
}

@media (min-width: 701px) and (max-width: 1110px) {
  .data-box {
    width: 75%;
  }
}

@media (min-width: 1111px) {
  .data-box {
    width: 70%;
  }
}
</style>
