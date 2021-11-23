<template>
  <div class="main-container">
    
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container {
  padding: 1em;
  background: #f0f0f0;
  min-height: 550px;
  border-radius: 20px;
  width: 500px;
  position: absolute;
  left: calc(50% - 250px);
  top: calc(50vh - 275px);
}
</style>
