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
        <b-form-select v-model="newTemplateTypeSelected" :options="emailTemplates.name"
          value-field="emailTemplates.name" class="form-select"></b-form-select></br>
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
        <b-button>Schedule Attack</b-button>
      </div>
      <div v-else>
        <!-- 'Attack Now' button is displayed when user selects to attack now radio button -->
        <b-button>Attack Now</b-button>
      </div>
    </div>

    <!-- RIGHT SIDE -->
    <!-- Table that lists out all the employees from the db -->
    <div class="w-50 mx-2">
      <p>Employee List</p>
      <div>
        <b-table striped hover :items="employeeList">
          <template #cell(isSelected)="data">
            <b-form-checkbox></b-form-checkbox>
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
      attackLaterDate: '',
      attackLaterTime: '',
      newTemplateTypeSelected: null,

      attackNowOrLaterRadio: '',

      newEmployeeName: "",
      newEmployeeEmail: "",
    }
  },
  methods: {

  }

}
</script>