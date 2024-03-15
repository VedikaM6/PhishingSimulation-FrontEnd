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

            <!-- Attack date -->
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

            <!-- Buttons that perform the phishing attack -->
            <b-button>Attack Now</b-button>
            <b-button>Attack Later</b-button>
          </div>

          <!-- RIGHT SIDE -->
          <!-- This is the employee table -->
          <div class="w-50 mx-2">
            <p>Employee List</p>
            <div>
              <b-table striped hover :items="employeeList">
                <template #cell(isSelected)="data">
                  <b-form-checkbox></b-form-checkbox>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </b-tab>


      <b-tab title="Previous Attacks">
        <p>This is a list of all the previous attacks that have occurred</p>

        <div role="tablist">
          <b-card no-body class="mb-1" v-for="(prevAttackObj, index) in prevAttackArray">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle="'collapse-' + index" variant="info">{{ prevAttackObj.Attack_Name }} <i
                  class="prevAttackDate">{{ prevAttackObj.attackDate }}</i></b-button>
            </b-card-header>
            <b-collapse :id="'collapse-' + index" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>Description: {{ prevAttackObj.Description }}</b-card-text>
                <b-card-text>Employees Involved: <br></b-card-text>
                <b-list-group-item v-for="(empl, index2) in prevAttackObj.employees">
                  {{ prevAttackObj.employees[index2].first_name + " " + prevAttackObj.employees[index2].last_name + " -"
                +
                prevAttackObj.employees[index2].email }}</b-list-group-item>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>


      </b-tab>
      <b-tab title="Email Content">
        <p>I'm the third tab!</p>
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
      text: 'temp text - change later',
      attackLaterDate: '',
      attacklaterTime: '',
      prevAttackArray: [
        { Attack_Name: 'Attack 1', Description: 'Content for Item 1', attackDate: 'sdfs', employees: [{ first_name: 'Dickerson', last_name: 'Macdonald', email: 'oldMcDonald@gmail.com' }, { first_name: 'Jami', last_name: 'Carney', email: 'JamiJami@gmail.com' }] },
        { Attack_Name: 'Attack no. 2', Description: 'Content for Item 1', attackDate: 'ascsc', employees: [{ first_name: 'Geneva', last_name: 'Wilson', email: 'Geneva@gmail.com' }] },
        { Attack_Name: 'Attack wiwak butt', Description: 'Content for Item 1', attackDate: ' cdscsc', employees: [] }
      ],
      employeeList: [
        { isSelected: false, first_name: 'Dickerson', last_name: 'Macdonald', email: 'oldMcDonald@gmail.com' },
        { isSelected: false, first_name: 'Larsen', last_name: 'Shaw', email: 'LShaw@gmail.com' },
        { isSelected: false, first_name: 'Geneva', last_name: 'Wilson', email: 'Geneva@gmail.com' },
        { isSelected: false, first_name: 'Jami', last_name: 'Carney', email: 'JamiJami@gmail.com' }
      ]
    }
  },
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
</style>
