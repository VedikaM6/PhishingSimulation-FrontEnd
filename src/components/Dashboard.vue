<template>
  <!-- This div contains all the contents for the page -->
  <div class="page-container">
    <!------- NAVBAR SECTION --------->
    <div class="d-flex align-items-center navbar-container">
      <!-- Dashboard title -->
      <div class="flex-grow-1 dashboard-title ms-4">
        <h3>Vedika Corp Dashboard</h3>
      </div>

      <!-- Company icon -->
      <div class="me-4">
        <img src="../../res/vedika_global.jpg" alt="Vedika Corp" width="50" />
      </div>
    </div>

    <!------- GAUGES SECTION --------->
    <div class="rows-container flex-grow-1">
      <!-- Row 1 -->
      <div class="d-flex h-50 gauge-row">
        <!-- Gauge 1: -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3">

          </div>
        </div>

        <!-- Gauge 2: -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3">

          </div>
        </div>

        <!-- Gauge 3: -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3">

          </div>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="d-flex h-50 gauge-row">
        <!-- Gauge 1: -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3">

          </div>
        </div>

        <!-- Gauge 2: -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3">

          </div>
        </div>

        <!-- Gauge 3: -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {

  },
  data() {
    return {

    }
  },
  watch: {

  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
.dashboard-title {
  text-align: left;
  font-weight: bold;
  font-size: 16px;
}

.gauge-container {
  border: 1px solid black;
  flex-grow: 1;
  height: 100%;
}

.gauge-container>div {
  border: 1px solid red;
  height: 90%;
}

.page-container {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.page-container .navbar-container {
  flex: 0 1 auto;
  /* The above is shorthand for:
  flex-grow: 0,
  flex-shrink: 1,
  flex-basis: auto
  */
}

.page-container .rows-container {
  flex: 1 1 auto;
}
</style>