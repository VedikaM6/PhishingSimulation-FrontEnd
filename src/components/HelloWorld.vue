<template>
  <div>
    <b-tabs fill justified content-class="mt-3" nav-wrapper-class="w-30">
      <!--------- ATTACK SETTINGS ---------->
      <b-tab title="Attack Settings" active>
        <div class="d-flex">
          <!-- LEFT SIDE -->
          <div class="w-50 mx-2 px-2">
            <!-- Attack name -->
            <div class="d-flex mb-3">
              <label class="me-2 align-self-center w-20">Attack Name: </label>
              <b-form-input type="text"></b-form-input>
            </div>

            <!-- Attack Description -->
            <div class="d-flex mb-3">
              <label class="me-2 align-self-center w-20">Attack Description: </label>
              <b-form-textarea type="text"></b-form-textarea>
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
                <b-form-timepicker v-model="attacklaterTime" locale="en"></b-form-timepicker>
              </div>
              <div class="mt-2">Attack Later Time: '{{ attacklaterTime }}'</div><br>

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
                  <b-form-input type="text" class="mx-3"></b-form-input></br>
                </div>
                <div class="d-flex mb-3">
                  <label class="me-2 align-self-center w-40">Employee Email: </label>
                  <b-form-input type="text" class="mx-3"></b-form-input>
                </div>
              </b-modal>
            </div>
          </div>
        </div>
      </b-tab>


      <b-tab title="Previous Attacks">
        <p>This is a list of all the previous attacks that have occurred. Click on an row to get more information</p>

        <div class="d-flex ">
          <!-- Left side -->
          <!-- List of all the attacks in a table -->
          <div class="w-50 mx-2 px-2">
            <b-table striped hover :fields="['name', 'date']" :items="prevAttackArray" @row-clicked="rowClicked">
              <template #cell()="data">
                {{ data.value }}
              </template>
            </b-table>
          </div>

          <!-- Right Side -->
          <!-- Displays more detail about the attack selected by user -->
          <div class="w-50 mx-2 px-2" v-show="isVisibleAttack">
            <b-card :title=selectedAttack.name :sub-title="selectedAttack.date">
              <b-card-text>
                <div>
                  <b-table stacked :items="[selectedAttack]" :fields="['description', 'employees']">
                  </b-table>
                </div>
              </b-card-text>
            </b-card>
          </div>
        </div>
      </b-tab>



      <b-tab title="Email Content">
        <div class="d-flex ">
          <!-- LEFT SIDE -->
          <!-- Displaying a list of all emaill templates in db -->
          <div class="w-50 mx-2 px-2">
            <p>List of all email templates</p>
            <div>
              <b-table striped hover :items="emailTemplates" :fields="['company', 'type', 'subject']"
                @row-clicked="emailTemplateRowClicked">
              </b-table>
            </div>
          </div>

          <!-- Right Side -->
          <!-- Displays more detail about the email template selected by user -->
          <div class="w-50 mx-2 px-2" v-show="isVisibleEmail">
            <b-card :title=selectedAttack.name>
              <b-card-text>
                <div>
                  <b-table stacked :items="[selectedEmailTemplate]">
                  </b-table>
                </div>
              </b-card-text>
            </b-card>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      name: 'BootstrapVue',
      show: true,
      isVisibleAttack: false,
      isVisibleEmail: false,
      attackNowOrLaterRadio: '',
      text: 'temp text - change later',
      attackLaterDate: '',
      attacklaterTime: '',
      prevAttackArray: [
        { name: 'Attack 1', description: 'Content for Item 1', date: '01-01-2024', employees: [{ first_name: 'Dickerson', last_name: 'Macdonald', email: 'oldMcDonald@gmail.com' }, { first_name: 'Jami', last_name: 'Carney', email: 'JamiJami@gmail.com' }] },
        { name: 'Attack no. 2', description: 'Content for Item 2', date: '04-29-1990', employees: [{ first_name: 'Geneva', last_name: 'Wilson', email: 'Geneva@gmail.com' }] },
        { name: 'Attack wiwak butt', description: 'Content for Item 3', date: '06-04-1990', employees: [] }
      ],
      employeeList: [
        { isSelected: false, first_name: 'Dickerson', last_name: 'Macdonald', email: 'oldMcDonald@gmail.com' },
        { isSelected: false, first_name: 'Larsen', last_name: 'Shaw', email: 'LShaw@gmail.com' },
        { isSelected: false, first_name: 'Geneva', last_name: 'Wilson', email: 'Geneva@gmail.com' },
        { isSelected: false, first_name: 'Jami', last_name: 'Carney', email: 'JamiJami@gmail.com' }
      ],
      selectedAttack: {
        name: '',
        description: '',
        employees: [],
        date: ''
      },
      selectedEmailTemplate: {
        subject: '',
        body: '',
        type: '',
        company: ''
      },
      emailTemplates: [
        {
          subject: 'Urgent Action Required: Your Walmart Account Security Alert',
          body: 'Dear valued customer,\ntemp', type: 'Account Security', company: 'Walmart'
        },
        {
          subject: 'New Deals - Template 2 Attack Email',
          body: 'Dear valued customer,\nMore text\nMore and more text', type: 'Deals', company: 'Winners'
        },
        {

        }
      ]
    }
  },
  methods: {
    toggleAttackVisibility() {
      this.isVisibleAttack = !this.isVisibleAttack;
    },
    toggleEmailVisibility() {
      this.isVisibleEmail = !this.isVisibleEmail;
    },
    rowClicked(item, i, ev) {
      // Make sure 'isVisibleEmail' is set to 'true' to be able to see the <b-card> component when user slected a row from the table
      this.isVisibleAttack = true

      this.selectedAttack.name = item.name
      this.selectedAttack.description = item.description
      // TODO: when retrieving the employees, create a loop that stores all data to be displayed in a list 


      // Make sure the 'selectedAttack.employees' is an empty array before appending the selected attack employees into the list
      let emptyTempArray = []
      this.selectedAttack.employees = emptyTempArray

      // Looping through the selected attack's employees involved list and adding it to the selectedAttack.employees array
      for (let i = 0; i < item.employees.length; i++) {
        console.log("length val = ", item.employees.length);
        //this.selectedAttack.employees[i] = item.employees[i]
        this.selectedAttack.employees.push(item.employees[i])
      }
      this.selectedAttack.date = item.date
    },
    emailTemplateRowClicked(item, i, ev) {
      // Make sure 'isVisibleEmail' is set to 'true' to be able to see the <b-card> component when user slected a row from the table
      this.isVisibleEmail = true

      // Make sure 'selectedEmailTemplate' values equal to empty array before adding values of selected item from the table
      let emptyTempArray = []
      this.selectedEmailTemplate = emptyTempArray

      // Store all values of selected email template into the 'selectedEmailTemplate' variable
      this.selectedEmailTemplate.subject = item.subject
      this.selectedEmailTemplate.body = item.body
      this.selectedEmailTemplate.type = item.type
      this.selectedEmailTemplate.company = item.company
    },
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
