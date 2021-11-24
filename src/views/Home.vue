<template>
  <div class="bg-container"></div>
  <div class="container-overlay">
    <div class="data-box">
      <CurrentDay class="CurrentDay" />
      <TotalInfo class="TotalInfo" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CurrentDay from "@/components/CurrentDay.vue"; 
import TotalInfo from "@/components/TotalInfo.vue"; 

@Options({
  components: {
    CurrentDay,
    TotalInfo,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.bg-container {
  background-image: url("../assets/images/background.jpg");

  filter: blur(4px);
  -webkit-filter: blur(4px);
  height: 100vh;
  width: 100vw;
  background-size: cover;
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
  background-color: rgba(255, 255, 255, 0.205);
  border-radius: 20px;
}

@media (max-width: 700px) {
  .CurrentDay {
    width: 100%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    height: 350px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.699);
  }
  .TotalInfo {
    width: 100%;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    height: 550px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.699);
  }
}

@media (min-width: 701px) and (max-width: 1110px) {
  .CurrentDay {
    height: 100%;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    width: 300px;
  }
  .TotalInfo {
    height: 100%;
    position: absolute;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    width: calc(100% - 301px);
    top: 0px;
    left: 300px;
  }
}

@media (min-width: 1111px) {
  .CurrentDay {
    height: 100%;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    width: 33%;
  } .TotalInfo {
    height: 100%;
    position: absolute;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    width: 67%;
    top: 0px;
    left: 33%;
  }
}
</style>
