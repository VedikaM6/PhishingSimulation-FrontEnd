<template>
  <div>

    <!---------- Navigation Bar ----------->
    <!-- NAVBAR -->
    <div>
      <!-- Navbar items container -->
      <div class="custom-nav d-flex">
        <!-- Company name -->
        <div class="custom-nav-item company-name pl-2 pr-3">
          <span class="d-inline-block mt-2">Vedika Corp</span>
        </div>

        <!-- Attack Settings link -->
        <div
          :class="['custom-nav-item', 'px-2', 'selectable-item', { 'selected-item': currentView === 'AttackSettings' }]"
          @click="currentView = 'AttackSettings'">
          <span class="d-inline-block">Attack Settings</span>
        </div>

        <div class="navbar-item-divider">|</div>

        <!-- Previous Attack link -->
        <div
          :class="['custom-nav-item', 'px-2', 'selectable-item', { 'selected-item': currentView === 'PreviousAttacks' }]"
          @click="currentView = 'PreviousAttacks'">
          <span class="d-inline-block">Attack History</span>
        </div>

        <div class="navbar-item-divider">|</div>

        <!-- Email Contents link -->
        <div
          :class="['custom-nav-item', 'px-2', 'selectable-item', { 'selected-item': currentView === 'EmailContents' }]"
          @click="currentView = 'EmailContents'">
          <span class="d-inline-block">Email Templates</span>
        </div>

        <div class="navbar-item-divider">|</div>

        <!-- Dashboard link -->
        <div class="custom-nav-item px-2 selectable-item">
          <!-- <RouterLink to="/dashboard" class="d-inline-block dashboard-link">Dashboard</RouterLink> -->
          <a href="http://localhost:8080/#/dashboard" target="_blank"
            class="d-inline-block dashboard-link">Dashboard&nbsp;</a>
          <external-link-icon size="1x" class="dash-icon"></external-link-icon>
        </div>

        <div class="ml-auto mr-3">
          <user-icon size="1.5x" class="user-icon"></user-icon>
        </div>
      </div>
    </div>

    <!-- Page contents  -->
    <div class="mt-3 mx-3">
      <!-- ATTACK SETTINGS  -->
      <div v-if="currentView === 'AttackSettings'">
        <AttackSettings :email-templates="emailTemplates" :employee-list="employeeList" @createAttack="createNewAttack"
          @createEmployee="createNewEmployee" @createAttackNow="createAttackNow">

        </AttackSettings>
      </div>

      <!-- PREVIOUS ATTACK  -->
      <div v-else-if="currentView === 'PreviousAttacks'">
        <PreviousAttacks :prev-attack-array="prevAttackArray">

        </PreviousAttacks>
      </div>

      <!-- EMAIL CONTENTS  -->
      <div v-else-if="currentView === 'EmailContents'">
        <EmailContent :email-templates="emailTemplates" @createNewEmailTemplate="createNewEmailTemplate"></EmailContent>
      </div>
    </div>




    <!-- <div class="mb-4 ms-auto me-4" style="width: fit-content">
      <RouterLink to="/dashboard" class="btn btn-primary">Dashboard</RouterLink>
    </div> -->

    <div>

    </div>
  </div>

</template>

<script>
import AttackSettings from "./AttackSettings.vue";
import PreviousAttacks from "./PreviousAttacks.vue";
import EmailContent from "./EmailContent.vue";
import axios from 'axios';
import { RouterView } from "vue-router";
import { UserIcon, ExternalLinkIcon } from 'vue-feather-icons'

let api = axios.create({
  baseURL: 'http://localhost:80'
})

export default {
  name: 'HelloWorld',
  components: {
    AttackSettings,
    PreviousAttacks,
    EmailContent,
    UserIcon,
    ExternalLinkIcon
  },
  data() {
    return {
      name: 'BootstrapVue',
      show: true,
      prevAttackArray: [],
      employeeList: [],
      emailTemplates: [],

      // Alert that is displayed when attack creation or email template creation was successful
      displayAlert: false,
      alertText: '',

      currentView: "AttackSettings"
    }
  },
  created() {
    // load all data from the backend
    this.getAllEmails();
    this.getAllUsers();
    this.getAllPastAttacks();
  },
  methods: {
    toggleAttackVisibility() {
      this.isVisibleAttack = !this.isVisibleAttack;
    },
    toggleEmailVisibility() {
      this.isVisibleEmail = !this.isVisibleEmail;
    },

    // Methods to get all emails templates from 
    getAllEmails() {
      let config = {
        headers: {

        }
      }
      api.get("/emails", config)
        .then(resp => {
          // Handle the response
          // NOTE: This is only executed when the request was successful
          // Storing the responseData of all the emails into the 'emailTemplate'
          console.log("[getAllEmails] Got emails!");
          let responseData = resp.data;
          this.emailTemplates = responseData.emails;

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
    getAllUsers() {
      let config = {
        headers: {

        }
      }
      api.get("/users", config)
        .then(resp => {
          // Handle the response
          // NOTE: This is only executed when the request was successful
          // Storing the responseData of all the emails into the 'emailTemplate'
          console.log("[getAllUsers] Got users!");
          let responseData = resp.data;
          let usersList = responseData.users;

          for (let i = 0; i < usersList.length; i++) {
            // Initialize the isSelected property
            usersList[i].isSelected = false;
          }

          this.employeeList = usersList;
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
    getAllPastAttacks() {
      let config = {
        headers: {

        }
      }
      api.get("/attacks/history", config)
        .then(resp => {
          // Handle the response
          // NOTE: This is only executed when the request was successful
          // Storing the responseData of all the emails into the 'emailTemplate'
          console.log("[getAllEmails] Got previous attacks!");
          let responseData = resp.data;
          this.prevAttackArray = responseData.previousAttacks;
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
    // Function that calls the '/attack/now' endpoint
    createAttackNow(newAttackNowObj) {
      let config = {
        headers: {}
      }
      api.post("/attacks/now", newAttackNowObj, config)
        .then(resp => {
          // Handle the response
          // NOTE: This is only executed when the request was successful
          // Storing the responseData of all the emails into the 'emailTemplate'
          console.log("[getAllEmails] Successfully created new attack!");

          // Call function to get list of all attacks after successfully creating one
          this.getAllPastAttacks();
        })
        .catch(e => {
          // NOTE: This is executed when an error occurs (non-200 response)
          if (e.response && e.response.data) {
            console.log(e.response.data);
          } else {
            console.log(e);
          }
        });

      // Display the successful alert to let user know their attack was created
      this.alertText = 'Attack was successfully created';
      this.displayFloatingAlert();
    },
    // Function that handles future attacks 
    createNewAttack(newAttackObj) {
      let config = {
        headers: {}
      }
      api.put("/attacks/future", newAttackObj, config)
        .then(resp => {
          // Handle the response
          // NOTE: This is only executed when the request was successful
          // Storing the responseData of all the emails into the 'emailTemplate'
          console.log("[getAllEmails] Successfully created new attack!");
        })
        .catch(e => {
          // NOTE: This is executed when an error occurs (non-200 response)
          if (e.response && e.response.data) {
            console.log(e.response.data);
          } else {
            console.log(e);
          }
        });

      // Display the successful alert to let user know their scheduled attack was created
      this.alertText = 'Attack was successfully scheduled';
      this.displayFloatingAlert();
    },
    createNewEmployee(newEmployeeObj) {
      let config = {
        headers: {}
      }
      api.put("/user", newEmployeeObj, config)
        .then(resp => {
          // Handle the response
          // NOTE: This is only executed when the request was successful
          // Adding a new employee to the list of employees 
          console.log("[createNewEmployee] Successfully created new employee!");

          // Call the function to update the list of employees after adding a new one successfully
          this.getAllUsers();
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
    createNewEmailTemplate(newEmailTemplateObj) {
      let config = {
        headers: {}
      }
      api.put("/emails", newEmailTemplateObj, config)
        .then(resp => {
          // Handle the response
          // NOTE: This is only executed when the request was successful
          // Adding a new email template 
          console.log("[createNewEmailTemplate] Successfully created new email template!");

          // After successfully creating a new template, we call '' to get all templates and update the existing list
          this.getAllEmails();
        })
        .catch(e => {
          // NOTE: This is executed when an error occurs (non-200 response)
          if (e.response && e.response.data) {
            console.log(e.response.data);
          } else {
            console.log(e);
          }
        });

      // Display the successful alert to let user know email template was successfully created
      this.alertText = 'Email template was successfully created';
      this.displayFloatingAlert();
    },
    // Display the floating alert to let user's know if their attack was created successfully OR email template was created successfully
    displayFloatingAlert() {
      this.displayAlert = true;
      setTimeout(() => {
        // After 5 sec alert should not be displayed, and alert text will be empty
        this.displayAlert = false;
        this.alertText = '';
      }, 5000);
    }

  }
}
</script>

<style>
/* Navbar styling */
.custom-nav {
  height: 45px;
  background-color: #877cff;
  align-items: center;
}

.custom-nav-item {
  color: white;
  font-weight: 600;
  font-size: 1.4em;
  cursor: default;
}

.custom-nav-item.company-name {
  background-color: #4d3cff;
  height: 100%;
}

.custom-nav-item.selectable-item {
  cursor: pointer;
  font-weight: 500;
  font-size: 1.1em;
  height: 100%;
  display: flex;
  align-items: center;
}

.selectable-item:hover {
  background-color: #6e60ff;
}

.selected-item {
  background-color: #6e60ff;
}

.dashboard-link {
  text-decoration: none;
  color: white;
}

.dashboard-link:hover {
  text-decoration: none;
  color: white;
}

/* ------------------- */

.prevAttackDate {
  color: C0C0C0;
}

.right-container {
  display: flex;
  flex-wrap: wrap;
}

.right-container>* {
  flex: 1 1 50%;
}

.left-container {
  display: flex;
  flex-wrap: wrap;
  width: calc(50% - 10px);
  margin: 10px;
}

.floatingAlert {
  margin-left: auto;
  margin-right: 0%;
  width: 30%;
  text-align: center;
}

.user-icon {
  color: white;
  cursor: pointer;
}

.dash-icon {
  color: white;
}

.navbar-item-divider {
  font-size: 1.5em;
  color: white;
}
</style>
