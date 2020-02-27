<template>
  <div id="app">
    <Sorteador />
  </div>
</template>

<script>
import Sorteador from "./components/Sorteador.vue";

export default {
  name: "App",
  components: {
    Sorteador
  }
};
</script>

<style lang="scss">
@import "./assets/scss/custom.scss";
@import "./assets/scss/variables";
@import "bootstrap/scss/bootstrap";
@import "./assets/scss/bootswatch";
</style>
