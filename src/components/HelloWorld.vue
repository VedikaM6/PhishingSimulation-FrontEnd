<template>
  <div>
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
  </div>

</template>

<script>
import AttackSettings from "./AttackSettings.vue";
import PreviousAttacks from "./PreviousAttacks.vue";
import EmailContent from "./EmailContent.vue";
import axios from 'axios';

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
}

.left-container {
  width: calc(50% - 10px);
  margin: 10px;
}

.w-20 {
  width: 20%;
}

.w-40 {
  width: 40%;
}
</style>
