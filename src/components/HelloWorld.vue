<template>
  <div>
    <b-tabs fill justified content-class="mt-3" nav-wrapper-class="w-30">
      <!--------- ATTACK SETTINGS ---------->
      <b-tab title="Attack Settings" active>
        <AttackSettings :email-templates="emailTemplates" :employee-list="employeeList" @createAttack="createNewAttack">

        </AttackSettings>
      </b-tab>


      <b-tab title="Previous Attacks">
        <PreviousAttacks :prev-attack-array="prevAttackArray">

        </PreviousAttacks>
      </b-tab>



      <b-tab title="Email Content">
        <EmailContent :email-templates="emailTemplates"></EmailContent>
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
      prevAttackArray: [
        { name: 'Attack 1', description: 'Content for Item 1', date: '01-01-2024', employees: [{ first_name: 'Dickerson', last_name: 'Macdonald', email: 'oldMcDonald@gmail.com' }, { first_name: 'Jami', last_name: 'Carney', email: 'JamiJami@gmail.com' }] },
        { name: 'Attack no. 2', description: 'Content for Item 2', date: '04-29-1990', employees: [{ first_name: 'Geneva', last_name: 'Wilson', email: 'Geneva@gmail.com' }] },
        { name: 'Attackkkkk', description: 'Content for Item 3', date: '06-04-1990', employees: [] }
      ],
      employeeList: [
        { isSelected: false, first_name: 'Dickerson', last_name: 'Macdonald', email: 'oldMcDonald@gmail.com' },
        { isSelected: false, first_name: 'Larsen', last_name: 'Shaw', email: 'LShaw@gmail.com' },
        { isSelected: false, first_name: 'Geneva', last_name: 'Wilson', email: 'Geneva@gmail.com' },
        { isSelected: false, first_name: 'Jami', last_name: 'Carney', email: 'JamiJami@gmail.com' }
      ],
      emailTemplates: [
        {
          name: 'account security email', subject: 'Urgent Action Required: Your Walmart Account Security Alert',
          body: 'Dear valued customer,\ntemp', type: 'Account Security Alerts', company: 'Walmart'
        },
        {
          name: 'deals email', subject: 'New Deals - Template 2 Attack Email',
          body: 'Dear valued customer,\nMore text\nMore and more text', type: 'Shopping Deals/Clearence Items', company: 'Winners'
        },
        {
          name: 'financial security email', subject: 'subject1 - email template', body: 'sdksadnlnclknakl', type: 'Financial', company: 'temp companyy'
        }
      ],
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
          console.log("[getAllEmails] Got users!");
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
