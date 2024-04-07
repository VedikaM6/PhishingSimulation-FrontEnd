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
            <!-- Attack info stacked table -->
            <div>
              <b-table stacked :items="[selectedAttack]" :fields="['description', 'emailTemplate']">
                <!-- <b-table :items="selectedAttack.targetRecipients" :fields="['name', 'isClicked']" class="w-25">
                  <template #cell(isClicked)="data">
                    <b-form-checkbox v-model="data.item.isClicked"></b-form-checkbox>
                  </template>
                </b-table> -->
              </b-table>
            </div>

            <!-- Targeted employees table -->
            <div class="mt-4">
              <b-table :items="selectedAttack.targetRecipients" :fields="['name', 'clickedTime']"
                :tbody-tr-class="rowClass">
                <template #cell(clickedTime)="data">
                  {{ getUserFriendlyClickedTime(data.item.clickedTime, data.item.isClicked) }}
                </template>
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
        emailTemplate: '',
        employees: [],
        triggerTime: ''
      },

      // variable that stores updated list of previous attacks from db
      localPrevAttackList: this.prevAttackArray,
    }
  },
  watch: {
    // watcher on the list of previous attacks
    prevAttackArray(newVal, oldVal) {
      console.log("[watch][prevAttackArray] Previous Attack List updated!");
      this.localPrevAttackList = JSON.parse(JSON.stringify(newVal));
    }
  },
  computed: {
    modifiedPrevAttackArray() {
      console.log("[computed][modifiedPrevAttackArray] Re-computing...");
      let res = [];

      for (let i = 0; i < this.localPrevAttackList.length; i++) {
        res.push({
          name: this.localPrevAttackList[i].name,
          triggerTime: this.getUserFriendlyDate(this.localPrevAttackList[i].triggerTime),
          description: this.localPrevAttackList[i].description,
          employees: this.localPrevAttackList[i].employees,
          targetRecipients: this.localPrevAttackList[i].targetRecipients,
          emailTemplate: this.localPrevAttackList[i].usedEmail.name
        })
      }

      return res;
    }
  },
  methods: {
    rowClicked(item, i, ev) {
      // Make sure 'isVisibleAttack' is set to 'true' to be able to see the <b-card> component when user slected a row from the table
      this.isVisibleAttack = true

      // Make sure the 'selectedAttack.employees' is an empty array before appending the selected attack employees into the list
      let emptyTempArray = []
      this.selectedAttack.employees = emptyTempArray

      // Store rest of the values of selected past attack into the 'selectedAttack' variable
      this.selectedAttack.triggerTime = this.modifiedPrevAttackArray[i].triggerTime;
      this.selectedAttack.name = this.modifiedPrevAttackArray[i].name;
      this.selectedAttack.description = this.modifiedPrevAttackArray[i].description;
      this.selectedAttack.targetRecipients = this.modifiedPrevAttackArray[i].targetRecipients;
      this.selectedAttack.emailTemplate = this.modifiedPrevAttackArray[i].emailTemplate;
    },
    // Get a user-friendly formatted date
    getUserFriendlyDate(d) {
      let dateObj = new Date(d);
      return dateObj.toLocaleString();
    },
    // Get a user-friendly formatted date for the ClickedTime
    getUserFriendlyClickedTime(clickTime, isClicked) {
      if (!isClicked) {
        return "";
      }

      let dateObj = new Date(clickTime);
      return dateObj.toLocaleString();
    },
    /* Get the CSS class to use for the given row */
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.isClicked) return 'table-danger'
    }
  }

}
</script>