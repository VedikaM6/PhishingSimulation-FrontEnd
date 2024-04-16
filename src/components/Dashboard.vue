<template>
  <!-- This div contains all the contents for the page -->
  <div class="page-container">
    <!------- NAVBAR SECTION --------->
    <div class="d-flex align-items-center navbar-container">
      <!-- Dashboard title -->
      <div class="flex-grow-1 dashboard-title ml-3 my-2">
        <h3 class="mb-0">Vedika Corp Dashboard</h3>
      </div>

      <!-- Company icon -->
      <!-- <div class="mr-3">
        <img src="../../res/vedika_global.jpg" alt="Vedika Corp" width="50" />
      </div> -->
    </div>

    <!------- GAUGES SECTION --------->
    <div class="rows-container flex-grow-1">
      <!-- Row 1 -->
      <div class="d-flex h-50 gauge-row">
        <!-- Gauge 1: UserCounts -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3">
            <h4 class="gauge-title mb-0">User Performance</h4>
            <p class="gauge-description">How many emails were properly identified as phishing by each user.</p>

            <span
              v-if="allGaugeDataMap.UserCounts && allGaugeDataMap.UserCounts.data && allGaugeDataMap.UserCounts.data.length > 0"
              class="gauge-content">
              <ul class="list-style-none pl-0">
                <li v-for="user in allGaugeDataMap.UserCounts.data" class="d-flex justify-content-between">
                  <!-- User name -->
                  <p class="ml-2">{{ user.userName }}</p>

                  <!-- User stats -->
                  <p class="ml-2">{{ user.numAttacksPassed + '/' + user.totalAttacks }}</p>
                </li>
              </ul>
            </span>
            <span v-else>
              ...
            </span>
          </div>
        </div>

        <!-- Gauge 2: -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3 h-75">
            <h4 class="gauge-title mb-0">Overall Team Performance</h4>
            <p class="gauge-description">How many emails were properly identified as phishing by all users.</p>

            <div class="h-100 d-flex align-items-center justify-content-center">
              <span v-if="allGaugeDataMap.TotalTeamPerformance && allGaugeDataMap.TotalTeamPerformance.data"
                class="gauge-content d-inline-block">
                <!-- Show percentage of attacks passed-->
                <h2>{{
                roundNum((allGaugeDataMap.TotalTeamPerformance.data.numAttacksPassed /
                  allGaugeDataMap.TotalTeamPerformance.data.totalAttacks) * 100)
              }}%</h2>

                <!-- Show counts of attacks passed-->
                <p class="mr-2">{{ allGaugeDataMap.TotalTeamPerformance.data.numAttacksPassed + '/' +
                allGaugeDataMap.TotalTeamPerformance.data.totalAttacks }} attacks passed</p>
              </span>
              <span v-else>
                ...
              </span>
            </div>
          </div>
        </div>

        <!-- Gauge 3: -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3">
            <h4 class="gauge-title mb-0">Email Statistics</h4>
            <p class="gauge-description">How many times each email template has been identified as phishing by all
              users.</p>

            <span
              v-if="allGaugeDataMap.EmailCounts && allGaugeDataMap.EmailCounts.data && allGaugeDataMap.EmailCounts.data.length > 0"
              class="gauge-content">
              <ul class="list-style-none pl-0">
                <li v-for="email in allGaugeDataMap.EmailCounts.data" class="d-flex justify-content-between">
                  <!-- Email name -->
                  <p class="ml-2">{{ email.emailName }}</p>

                  <!-- Email stats -->
                  <p class="ml-2">{{ email.numAttacksPassed + '/' + email.totalAttacks }}</p>
                </li>
              </ul>
            </span>
            <span v-else>
              ...
            </span>
          </div>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="d-flex h-50 gauge-row">
        <!-- Gauge 1: -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3">
            <h4 class="gauge-title mb-0">Team Performance Last Week</h4>
            <p class="gauge-description">The number of attacks passed per day in the past week.</p>

            <span
              v-if="allGaugeDataMap.TeamPerformanceLastWeek && allGaugeDataMap.TeamPerformanceLastWeek.data && allGaugeDataMap.TeamPerformanceLastWeek.data.length > 0"
              class="gauge-content">
              <ul class="list-style-none pl-0">
                <li v-for="teamPerf in allGaugeDataMap.TeamPerformanceLastWeek.data"
                  class="d-flex justify-content-between">
                  <!-- Attack date -->
                  <p class="ml-2">{{ convertTimeObjToDateStr(teamPerf.id) }}</p>

                  <!-- Team performance stat -->
                  <p class="ml-2">{{ teamPerf.numAttacksPassed + '/' + teamPerf.totalAttacks }}</p>
                </li>
              </ul>
            </span>
            <span v-else>
              ...
            </span>
          </div>
        </div>

        <!-- Gauge 2: -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3">
            <h4 class="gauge-title mb-0">Scheduled Attacks Next Week</h4>
            <p class="gauge-description">The number of attacks scheduled per day for the next week.</p>

            <span
              v-if="allGaugeDataMap.ScheduledAttacksNextWeek && allGaugeDataMap.ScheduledAttacksNextWeek.data && allGaugeDataMap.ScheduledAttacksNextWeek.data.length > 0"
              class="gauge-content">
              <ul class="list-style-none pl-0">
                <li v-for="schedAttack in allGaugeDataMap.ScheduledAttacksNextWeek.data"
                  class="d-flex justify-content-between">
                  <!-- Manth and day of scheduled attack -->
                  <p class="ml-2">{{ convertTimeObjToDateStr(schedAttack.id) }}</p>

                  <!-- Number of attacks to perform for each day -->
                  <p class="ml-2">{{ schedAttack.totalAttacks }}</p>
                </li>
              </ul>
            </span>
            <span v-else>
              ...
            </span>
          </div>
        </div>

        <!-- Gauge 3: -->
        <div class="gauge-container">
          <!-- Gauge content -->
          <div class="m-3">
            <h4 class="gauge-title mb-0">Scheduled Attacks For Users</h4>
            <p class="gauge-description">The number of future attacks scheduled for each user.</p>

            <span
              v-if="allGaugeDataMap.ScheduledAttacksForUsers && allGaugeDataMap.ScheduledAttacksForUsers.data && allGaugeDataMap.ScheduledAttacksForUsers.data.length > 0"
              class="gauge-content">
              <ul class="list-style-none pl-0">
                <li v-for="user in allGaugeDataMap.ScheduledAttacksForUsers.data"
                  class="d-flex justify-content-between">
                  <!-- User name -->
                  <p class="ml-2">{{ user.id }}</p>

                  <!-- User stats -->
                  <p class="ml-2">{{ user.totalAttacks }}</p>
                </li>
              </ul>
            </span>
            <span v-else>
              ...
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

let api = axios.create({
  baseURL: 'http://localhost:80'
})

export default {
  name: 'Dashboard',
  props: {

  },
  data() {
    return {
      refreshDataInterval: null,

      // this array contains the data for all the gauges
      allGaugeDataArr: [],

      // this object contains a property for each gauge type
      //allGaugeDataMap: {}

      shortMonthNames: [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sept", "Oct", "Nov", "Dec",
      ]
    }
  },
  created() {
    // load the data for the gauges
    this.getDashboardData();

    this.refreshDataInterval = setInterval(function () {
      // refresh the data for the gauges every 30 seconds
      this.getDashboardData();
    }, 30000);
  },
  watch: {

  },
  beforeUnmount() {
    clearInterval(this.refreshDataInterval)
  },
  computed: {
    /* This computed object contains a property for each gauge type. */
    allGaugeDataMap: function () {
      let obj = {};

      // loop through all gauges
      for (let i = 0; i < this.allGaugeDataArr.length; i++) {
        // add an entry for this gauge type
        obj[this.allGaugeDataArr[i].type] = this.allGaugeDataArr[i];
      }

      return obj;
    }
  },
  methods: {
    getDashboardData() {
      let config = {
        headers: {

        }
      }
      api.get("/dashboard/data", config)
        .then(resp => {
          // Handle the response
          // NOTE: This is only executed when the request was successful
          console.log("[getDashboardData] Got data!");
          let responseData = resp.data;

          // copy the data to 'allGaugeDataArr'
          this.allGaugeDataArr = responseData.allGaugeData;

        })
        .catch(e => {
          // NOTE: This is executed when an error occurs (non-200 response)
          if (e.response && e.response.data) {
            console.log(e.response.data);
          } else {
            console.log(e);
          }
        });
    },
    /* Round the given number to 2 decimal places */
    roundNum(n) {
      return Math.round((n * 100) / 100);
    },
    /* Convert the 'time object' (used for some gauge types) to a date string to display */
    convertTimeObjToDateStr(timeObj) {
      // NOTE: 'timeObj' is in the format: {year: 2024, month: 4, day: 12}
      return this.shortMonthNames[timeObj.month - 1] + " " + timeObj.day;
    }
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
  flex: 1;
  height: 100%;
  overflow-y: hidden;
  text-align: center;
  vertical-align: middle;
}

.gauge-container>div {
  vertical-align: middle;
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
  background: rgb(230, 232, 255);
  background: linear-gradient(83deg, rgba(230, 232, 255, 1) 0%, rgba(132, 188, 255, 1) 100%);
}

.page-container .rows-container {
  flex: 1 1 auto;
}

.gauge-title {
  font-weight: bold;
}

.list-style-none {
  list-style: none;
}

.gauge-row>.gauge-container {
  align-items: stretch;
}

.gauge-container {
  border: 2px solid rgb(175, 175, 255);
  background: rgb(230, 232, 255);
  background: linear-gradient(83deg, rgba(230, 232, 255, 1) 0%, rgba(225, 239, 255, 1) 2%);
}

.gauge-content {
  font-size: 1.1em;
}

.h-75 {
  height: 75% !important;
}

.gauge-description {
  font-size: 13px;
  color: #626262;
}
</style>