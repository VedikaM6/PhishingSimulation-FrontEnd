<template>
  <div class="mt-5 mx-4">

    <!---------- Navigation Bar ----------->
    <div>
    </div>






    <div class="mb-4 ms-auto me-4" style="width: fit-content">
      <RouterLink to="/dashboard" class="btn btn-primary">Dashboard</RouterLink>
    </div>

    <b-tabs fill justified content-class="mt-3" nav-wrapper-class="w-30">
      <!--------- ATTACK SETTINGS ---------->
      <b-tab title="Attack Settings" active>
        <AttackSettings :email-templates="emailTemplates" :employee-list="employeeList" @createAttack="createNewAttack"
          @createEmployee="createNewEmployee" @createAttackNow="createAttackNow">

        </AttackSettings>
      </b-tab>


      <b-tab title="Previous Attacks">
        <PreviousAttacks :prev-attack-array="prevAttackArray">

        </PreviousAttacks>
      </b-tab>



      <b-tab title="Email Content">
        <EmailContent :email-templates="emailTemplates" @createNewEmailTemplate="createNewEmailTemplate"></EmailContent>
      </b-tab>
    </b-tabs>

    <div>
      <!-- This is where we show the floating alerts -->
      <b-alert v-model="displayAlert" fade class="floatingAlert">
        {{ alertText }}
      </b-alert>
    </div>
  </div>

</template>

<script>
import AttackSettings from "./AttackSettings.vue";
import PreviousAttacks from "./PreviousAttacks.vue";
import EmailContent from "./EmailContent.vue";
import axios from 'axios';
import { RouterView } from "vue-router";

let api = axios.create({
  baseURL: 'http://localhost:80'
})

export default {
  name: 'HelloWorld',
  components: {
    AttackSettings,
    PreviousAttacks,
    EmailContent
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
      alertText: ''
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
</style>
