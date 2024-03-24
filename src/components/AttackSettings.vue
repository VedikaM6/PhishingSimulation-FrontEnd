<template>
  <div class="d-flex">
    <!-- LEFT SIDE -->
    <div class="w-50 mx-2 px-2">
      <!-- Attack name -->
      <div class="d-flex mb-3">
        <label class="me-2 align-self-center w-20">Attack Name: </label>
        <b-form-input type="text" v-model="name"></b-form-input>
      </div>

      <!-- Attack Description -->
      <div class="d-flex mb-3">
        <label class="me-2 align-self-center w-20">Attack Description: </label>
        <b-form-textarea type="text" v-model="description"></b-form-textarea>
      </div>

      <!-- Email Templates to choose from -->
      <div class="d-flex mb-3">
        <label class="me-2 align-self-center w-20">Email Template: </label>
        <b-form-select v-model="newTemplateTypeSelected" :options="emailTemplates" value-field="_id" text-field="name"
          class="form-select"></b-form-select></br>
      </div>

      <!-- Attack now or later radio button -->
      <div class="d-flex mb-3">
        <div class="d-flex mb-3"> Attack When: </div>
        <div class="d-flex mb-3">
          <b-form-radio class="mx-3" v-model="attackNowOrLaterRadio" value="attackNow"></b-form-radio>
          <label class="me-2 align-self-center"> Attack Now </label>
          <b-form-radio class="mx-3" v-model="attackNowOrLaterRadio" value="attackLater"></b-form-radio>
          <label class="me-2 align-self-center"> Attack Later </label>
        </div>
      </div>

      <!-- Attack date -->
      <div v-if="attackNowOrLaterRadio.includes('attackLater')">
        <div class="d-flex mb-3">
          <label class="me-2 align-self-center w-20">Attack Date: </label>
          <b-form-datepicker v-model="attackLaterDate"></b-form-datepicker>
        </div>
        <p>Attack later Date: '{{ attackLaterDate }}'</p>

        <!-- Attack time -->
        <div class="d-flex mb-3">
          <label class="me-2 align-self-center w-20">Attack Time: </label>
          <b-form-timepicker v-model="attackLaterTime" locale="en"></b-form-timepicker>
        </div>
        <div class="mt-2">Attack Later Time: '{{ attackLaterTime }}'</div><br>

        <!-- 'Schedule Attack' button apears when user selects to attack later radio button -->
        <b-button @click="scheduleFutureAttack">Schedule Attack</b-button>
      </div>
      <div v-else>
        <!-- 'Attack Now' button is displayed when user selects to attack now radio button -->
        <b-button>Attack Now</b-button>
      </div>

      <div>
        <b-alert variant="danger" :show="formError !== ''">
          {{ formError }}
        </b-alert>
      </div>
    </div>

    <!-- RIGHT SIDE -->
    <!-- Table that lists out all the employees from the db -->
    <div class="w-50 mx-2">
      <p>Employee List</p>
      <div>
        <b-table striped hover :items="localEmployeeList" :fields="['isSelected', 'name', 'email']">
          <template #cell(isSelected)="data">
            <b-form-checkbox v-model="data.item.isSelected"></b-form-checkbox>
          </template>
        </b-table>

      </div>

      <!-- Button that opens up a modal to add new employees -->
      <div>
        <b-button block v-b-modal.modal-1>Add Employee</b-button>
        <b-modal id="modal-1" title="Add Employee">
          <div class="d-flex mb-3">
            <label class="me-2 align-self-center w-40">Employee Name: </label>
            <b-form-input type="text" class="mx-3" v-model="newEmployeeName"></b-form-input></br>
          </div>
          <div class="d-flex mb-3">
            <label class="me-2 align-self-center w-40">Employee Email: </label>
            <b-form-input type="text" class="mx-3" v-model="newEmployeeEmail"></b-form-input>
          </div>
        </b-modal>
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
      name: "",
      description: "",
      attackLaterDate: "",
      attackLaterTime: '',
      newTemplateTypeSelected: null,

      // contains an error message if the form is invalid
      formError: "",

      attackNowOrLaterRadio: 'attackNow',

      newEmployeeName: "",
      newEmployeeEmail: "",
      localEmployeeList: this.employeeList,
    }
  },
  watch: {
    employeeList(newVal, oldVal) {
      console.log("[watch][employeelist] Employees updated!");
      this.localEmployeeList = JSON.parse(JSON.stringify(newVal))
    }
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
    scheduleFutureAttack() {
      console.log("[scheduleFutureAttack] Hit.");
      // validate form info
      if (!this.name) {
        // Name is empty
        this.formError = "Please specify a name.";
        return;
      } else if (!this.description) {
        // Description is empty
        this.formError = "Please specify a description.";
        return;
      } else if (!this.newTemplateTypeSelected) {
        // Email Template is empty
        this.formError = "Please select an email template.";
        return;
      } else if (!this.attackLaterDate || new Date(this.attackLaterDate) < new Date()) {
        // Date is invalid (empty or in the past)
        this.formError = "The date is empty or in the past.";
        return;
      } else if (!this.attackLaterTime) {
        // Time is empty
        this.formError = "Please specify a time.";
        return;
      } else if (this.selectedUsers.length === 0) {
        // Selected users is empty
        this.formError = "Please select at least 1 user.";
        return;
      }

      // The form is valid
      this.formError = "";

      let newAttack = {
        name: this.name,
        description: this.description,
        triggerTime: new Date(this.attackLaterDate),
        emailId: this.newTemplateTypeSelected,
        targetRecipients: this.getSelectedTargetRecipients(),
        targetUserIds: this.getSelectedTargetUserIds()
      }

      // emit an event to the parent to create this attack
      this.$emit("createAttack", newAttack)
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
    }
  }

}
</script>