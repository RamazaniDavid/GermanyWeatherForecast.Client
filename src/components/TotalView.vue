<template>
  <div class="total-view"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TotalView",
  components: {},
  directives: {},
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.total-view {
  background-color: #ffffffec;
}
</style>
