<template>
  <div>
    <p>This is a list of all the previous attacks that have occurred. Click on an row to get more information</p>

    <div class="d-flex ">

      <!-- Left side -->
      <!-- List of all the attacks in a table -->
      <div class="w-50 mx-2 px-2">
        <b-table striped hover :fields="['name', 'triggerTime']" :items="modifiedPrevAttackArray"
          @row-clicked="rowClicked">
          <template #cell()="data">
            {{ data.value }}
          </template>
        </b-table>
      </div>

      <!-- Right Side -->
      <!-- Displays more detail about the attack selected by user -->
      <div class="w-50 mx-2 px-2" v-show="isVisibleAttack">
        <b-card :title=selectedAttack.name :sub-title="selectedAttack.triggerTime">
          <b-card-text>
            <div>
              <b-table stacked :items="[selectedAttack]" :fields="['description', 'employees']">
              </b-table>
            </div>
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviousAttacks',
  props: {
    prevAttackArray: Array,
  },
  data() {
    return {
      isVisibleAttack: false,

      // Attack Object that was selected by the user from the table
      selectedAttack: {
        name: '',
        description: '',
        employees: [],
        triggerTime: ''
      },
    }
  },
  computed: {
    modifiedPrevAttackArray() {
      let res = [];

      for (let i = 0; i < this.prevAttackArray.length; i++) {
        res.push({
          name: this.prevAttackArray[i].name,
          triggerTime: this.getUserFriendlyDate(this.prevAttackArray[i].triggerTime),
          description: this.prevAttackArray[i].description,
          employees: this.prevAttackArray[i].employees
        })
      }

      return res;
    }
  },
  methods: {
    rowClicked(item, i, ev) {
      // Make sure 'isVisibleAttack' is set to 'true' to be able to see the <b-card> component when user slected a row from the table
      this.isVisibleAttack = true

      // TODO: when retrieving the employees, create a loop that stores all data to be displayed in a list 

      // Make sure the 'selectedAttack.employees' is an empty array before appending the selected attack employees into the list
      let emptyTempArray = []
      this.selectedAttack.employees = emptyTempArray

      // Looping through the selected attack's employees involved list and adding it to the selectedAttack.employees array
      // for (let i = 0; i < item.employees.length; i++) {
      //   console.log("length val = ", item.employees.length);
      //   //this.selectedAttack.employees[i] = item.employees[i]
      //   this.selectedAttack.employees.push(item.employees[i])
      // }

      // Store rest of the values of selected past attack into the 'selectedAttack' variable
      this.selectedAttack.triggerTime = this.modifiedPrevAttackArray[i].triggerTime;
      this.selectedAttack.name = this.modifiedPrevAttackArray[i].name;
      this.selectedAttack.description = this.modifiedPrevAttackArray[i].description;
    },
    // Get a user-friendly formatted date
    getUserFriendlyDate(d) {
      let dateObj = new Date(d);
      return dateObj.toLocaleString();
    }
  }

}
</script>