<template>
  <div>

    <!-- Tab Description for users -->
    <h5>Schedule phishing attacks</h5>
    <h6 class="section-description">
      Fill in the form below to send carefully crafted phishing emails to your users now or some
      time in the future. You can also add new users to the list below.
    </h6>
    <hr class="my-3">

    <div class="mb-8 page-container mx-auto">
      <div class="mx-2 px-2">
        <!-- Attack name -->
        <div class="d-flex mb-3">
          <label class="mr-2 align-self-center w-30">Attack Name: </label>
          <b-form-input type="text" v-model="name"></b-form-input>
        </div>

        <!-- Attack Description -->
        <div class="d-flex mb-3">
          <label class="mr-2 align-self-center w-30">Attack Description: </label>
          <b-form-textarea type="text" v-model="description"></b-form-textarea>
        </div>

        <!-- Table that lists out all the employees from the db -->

        <p class="d-flex">Select at Least 1 Employee: </p>
        <!-- Button that opens up a modal to add new employees -->
        <div class="d-flex">
          <b-button block v-b-modal.modal-1 variant="primary">Add Employee</b-button>
          <b-modal ref="addNewEmployeeModal" id="modal-1" hide-footer>
            <template #modal-header="{ close }">
              <h5 class="mb-0">Add Employee</h5>
            </template>

            <div class="d-flex mb-3">
              <label class="mr-2 align-self-center w-40">Employee Name: </label>
              <b-form-input type="text" class="mx-3" v-model="newEmployeeName"></b-form-input></br>
            </div>
            <div class="d-flex mb-3">
              <label class="mr-2 align-self-center w-40">Employee Email: </label>
              <b-form-input type="text" class="mx-3" v-model="newEmployeeEmail"></b-form-input>
            </div>
            <div class="d-flex justify-content-end">
              <b-button class="mt-3 mr-2" @click="addNewEmployee" variant="primary">Add Employee</b-button>
              <b-button class="mt-3" @click="hideModal">Cancel</b-button>
            </div>

            <!-- Toast for errors -->
            <b-toast id="new-employee-error-toast" :title="newEmployeeToast.title" auto-hide-delay="5000"
              :variant="newEmployeeToast.variant">
              {{ newEmployeeToast.content }}
            </b-toast>

          </b-modal>
        </div>
        <div>
          <b-table noCollapse striped hover :items="localEmployeeList" :fields="['isSelected', 'name', 'email']"
            class="text-align-center">
            <template #cell(isSelected)="data">
              <b-form-checkbox v-model="data.item.isSelected" class="text-align-center"></b-form-checkbox>
            </template>
          </b-table>

        </div>




        <!-- Email Templates to choose from -->
        <div class="d-flex mb-3">
          <label class="mr-2 align-self-center w-30">Email Template: </label>
          <b-form-select v-model="newTemplateTypeSelected" :options="emailTemplates" value-field="_id" text-field="name"
            class="form-select"></b-form-select></br>
        </div>

        <!-- Attack now or later radio button -->
        <div class="d-flex mb-3">
          <div class="d-flex mb-3 w-30"> Attack When: </div>
          <div class="d-flex mb-3">
            <b-form-radio class="mx-3" v-model="attackNowOrLaterRadio" value="attackNow"></b-form-radio>
            <label class="mr-2 align-self-center"> Attack Now </label>
            <b-form-radio class="mx-3" v-model="attackNowOrLaterRadio" value="attackLater"></b-form-radio>
            <label class="mr-2 align-self-center"> Attack Later </label>
          </div>
        </div>

        <!-- Attack date -->
        <div v-if="attackNowOrLaterRadio.includes('attackLater')">
          <div class="d-flex mb-3">
            <label class="mr-2 align-self-center w-30">Attack Date: </label>
            <b-form-datepicker v-model="attackLaterDate"></b-form-datepicker>
          </div>

          <!-- Attack time -->
          <div class="d-flex mb-3">
            <label class="mr-2 align-self-center w-30">Attack Time: </label>
            <b-form-timepicker v-model="attackLaterTime" locale="en"></b-form-timepicker>
          </div>

          <!-- 'Schedule Attack' button apears when user selects to attack later radio button -->
          <b-button @click="scheduleFutureAttack" variant="primary" class="w-100">Schedule Attack</b-button>
        </div>
        <div v-else>
          <!-- 'Attack Now' button is displayed when user selects to attack now radio button -->
          <b-button @click="scheduleAttackNow" variant="primary" class="w-100">Attack Now</b-button>
        </div></br>

        <!-- Toast for errors -->
        <b-toast id="attack-error-toast" :title="attackSettingsToast.title" auto-hide-delay="5000"
          :variant="attackSettingsToast.variant">
          {{ attackSettingsToast.content }}
        </b-toast>
      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: 'AttackSettings',
  props: {
    emailTemplates: Array,
    employeeList: Array,
  },
  data() {
    return {
      // variables connected to the input fields of all 'newAttackSettings' form
      name: "",
      description: "",
      attackLaterDate: "",
      attackLaterTime: '',
      newTemplateTypeSelected: null,

      // contains an error message if the form is invalid
      formError: "",
      attackSettingsToast: {
        title: "",
        content: "",
        variant: "danger"
      },

      attackNowOrLaterRadio: 'attackNow',

      // variables connected to the input fields of creating new employee modal
      newEmployeeName: "",
      newEmployeeEmail: "",
      localEmployeeList: this.employeeList,

      // contains an error message if the new employee form is invalid
      formErrorNewEmployee: "",
      newEmployeeToast: {
        title: "",
        content: "",
        variant: "danger"
      },

      // Alert that is displayed when attack creation was successful
      showAlert: false,
      alertMessage: 'Attack was successfully created!',
    }
  },
  watch: {
    employeeList(newVal, oldVal) {
      console.log("[watch][employeelist] Employees updated!");
      this.localEmployeeList = JSON.parse(JSON.stringify(newVal))
    },
    /* Watch for formError changes. */
    // formError(newVal, oldVal) {
    //   if (newVal) {
    //     console.log("[formError] Triggered!");
    //     // There is an error so show the toast error message.
    //     this.$bvToast.show('error-toast');
    //   }
    // }
  },
  computed: {
    selectedUsers() {
      let res = [];

      for (let i = 0; i < this.localEmployeeList.length; i++) {
        if (this.localEmployeeList[i].isSelected) {
          res.push(this.localEmployeeList[i]);
        }
      }

      return res;
    }
  },
  methods: {
    showToast(toastId, title, toastText, vari) {
      if (toastId === "attack-error-toast") {
        this.attackSettingsToast = {
          title: title,
          content: toastText,
          variant: vari
        }
        this.$bvToast.show(toastId);
      } else if (toastId === "new-employee-error-toast") {
        this.newEmployeeToast = {
          title: title,
          content: toastText,
          variant: vari
        }
        this.$bvToast.show(toastId);
      }
    },
    scheduleAttackNow() {
      console.log("[scheduleAttackNow] Hit.");
      // validate form information
      if (!this.name) {
        // Name is empty
        this.formError = "Please specify a name.";
        this.showToast("attack-error-toast", "Error", this.formError, "danger");
        return;
      } else if (!this.description) {
        // Description is empty
        this.formError = "Please specify a description.";
        this.showToast("attack-error-toast", "Error", this.formError, "danger");
        return;
      } else if (!this.newTemplateTypeSelected) {
        // Email Template is empty
        this.formError = "Please select an email template.";
        this.showToast("attack-error-toast", "Error", this.formError, "danger");
        return;
      } else if (this.selectedUsers.length === 0) {
        // Selected users is empty
        this.formError = "Please select at least 1 user.";
        this.showToast("attack-error-toast", "Error", this.formError, "danger");
        return;
      }

      // At this point the form is valid, so we set each inputted value to equal to a 'newAttack' object
      let newAttack = {
        name: this.name,
        description: this.description,
        triggerTime: new Date(this.attackLaterDate),
        emailId: this.newTemplateTypeSelected,
        targetRecipients: this.getSelectedTargetRecipients(),
        targetUserIds: this.getSelectedTargetUserIds()
      }

      // emit an event to the parent to create this attack
      this.$emit("createAttackNow", newAttack)

      // Display the successful alert
      //this.displayFloatingAlert();
      this.showToast("attack-error-toast", "Success", "Successfully sent attack!", "success");
    },
    scheduleFutureAttack() {
      console.log("[scheduleFutureAttack] Hit.");
      // validate form info
      if (!this.name) {
        // Name is empty
        this.formError = "Please specify a name.";
        this.showToast("attack-error-toast", "Error", this.formError, "danger");
        return;
      } else if (!this.description) {
        // Description is empty
        this.formError = "Please specify a description.";
        this.showToast("attack-error-toast", "Error", this.formError, "danger");
        return;
      } else if (!this.newTemplateTypeSelected) {
        // Email Template is empty
        this.formError = "Please select an email template.";
        this.showToast("attack-error-toast", "Error", this.formError, "danger");
        return;
      } else if (!this.attackLaterDate || new Date(this.attackLaterDate) < new Date()) {
        // Date is invalid (empty or in the past)
        this.formError = "The date is empty or in the past.";
        this.showToast("attack-error-toast", "Error", this.formError, "danger");
        return;
      } else if (!this.attackLaterTime) {
        // Time is empty
        this.formError = "Please specify a time.";
        this.showToast("attack-error-toast", "Error", this.formError, "danger");
        return;
      } else if (this.selectedUsers.length === 0) {
        // Selected users is empty
        this.formError = "Please select at least 1 user.";
        this.showToast("attack-error-toast", "Error", this.formError, "danger");
        return;
      }

      // The form is valid
      this.formError = "";
      this.showToast("attack-error-toast", "Success", "Successfully scheduled attack!", "success");

      // prepare the triggerTime
      let trigTime = new Date(this.attackLaterDate);
      let timeArr = this.attackLaterTime.split(":");
      let hrs = parseInt(timeArr[0], 10);
      let mins = parseInt(timeArr[1], 10);
      trigTime.setHours(hrs, mins, 0);

      let newAttack = {
        name: this.name,
        description: this.description,
        triggerTime: trigTime,
        emailId: this.newTemplateTypeSelected,
        targetRecipients: this.getSelectedTargetRecipients(),
        targetUserIds: this.getSelectedTargetUserIds()
      }

      // emit an event to the parent to create this attack
      this.$emit("createAttack", newAttack);
    },
    getSelectedTargetRecipients() {
      let res = [];

      for (let i = 0; i < this.selectedUsers.length; i++) {
        res.push({
          name: this.selectedUsers[i].name,
          address: this.selectedUsers[i].email
        })
      }

      return res;
    },
    getSelectedTargetUserIds() {
      let res = [];

      for (let i = 0; i < this.selectedUsers.length; i++) {
        res.push(this.selectedUsers[i]._id)
      }

      return res;
    },
    addNewEmployee() {
      // Validate all information is provided on the modal
      console.log("[addNewEmployee] Hit.");
      if (!this.newEmployeeName) {
        // Employee name is empty
        this.formErrorNewEmployee = "Please specify employee's name.";
        this.$bvToast.show('new-employee-error-toast');
        this.showToast("new-employee-error-toast", "Error", this.formErrorNewEmployee, "danger");
        return;
      } else if (!this.newEmployeeEmail) {
        // Employee email is empty
        this.formErrorNewEmployee = "Please specify employee's email.";
        this.showToast("new-employee-error-toast", "Error", this.formErrorNewEmployee, "danger");
        return;
      }

      // Validation completed
      this.formErrorNewEmployee = "";
      this.showToast("new-employee-error-toast", "Success", "Successfully created new employee!", "success");

      let newEmployee = {
        name: this.newEmployeeName,
        email: this.newEmployeeEmail
      }

      // emit an event to the parent to create a new employee
      this.$emit("createEmployee", newEmployee)

      // close the modal after emitting the event 
      this.hideModal();
    },
    // Hide modal when 'cancel' button is pressed in the 'Add New Employee' modal
    hideModal() {
      this.$refs['addNewEmployeeModal'].hide()

      // Make 'newEmployeeName' and 'newEmployeeEmail' empty after user closes the modal to add new employee
      this.newEmployeeName = "";
      this.newEmployeeEmail = "";
    },
    displayFloatingAlert() {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    },
  }

}
</script>

<style scoped>
.w-30 {
  width: 30%;
}

.w-40 {
  width: 40%;
}

.text-align-center {
  text-align: center;
}

.page-container {
  width: 50%;

}
</style>