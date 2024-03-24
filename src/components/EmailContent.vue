<template>
  <div class="d-flex ">
    <!-- LEFT SIDE -->
    <!-- Displaying a list of all emaill templates in db -->
    <div class="w-50 mx-2 px-2">
      <p>List of all email templates</p>
      <div>
        <b-table striped hover :items="emailTemplates" :fields="['name', 'type', 'subject']"
          @row-clicked="emailTemplateRowClicked">
        </b-table>
      </div>
      <!-- Button that opens up a modal to create a new email template -->
      <div>
        <b-button block v-b-modal.modal-2>Create New Template</b-button>
        <b-modal id="modal-2" title="New Email Template">
          <div class="d-flex mb-3">
            <label class="me-2 align-self-center w-20">Name: </label>
            <b-form-input type="text" class="mx-2"></b-form-input></br>
          </div>
          <div class="d-flex mb-3">
            <label class="me-2 align-self-center w-20">Type: </label>
            <b-form-select v-model="newTemplateTypeSelected" :options="emailTypeOptions"
              class="form-select mx-2"></b-form-select></br>
          </div>
          <div class="d-flex mb-3">
            <label class="me-2 align-self-center w-20">Company: </label>
            <b-form-input type="text" class="mx-2"></b-form-input></br>
          </div>
          <div class="d-flex mb-3">
            <label class="me-2 align-self-center w-20">Subject: </label>
            <b-form-input type="text" class="mx-2"></b-form-input></br>
          </div>
          <div class="d-flex mb-3">
            <label class="me-2 align-self-center w-20">Body: </label>
            <b-form-textarea type="text" class="mx-2"></b-form-textarea>
          </div>
        </b-modal>
      </div>
    </div>

    <!-- Right Side -->
    <!-- Displays more detail about the email template selected by user -->
    <div class="w-50 mx-2 px-2" v-show="isVisibleEmail">
      <b-card :title=selectedEmailTemplate.name :sub-title=selectedEmailTemplate.type>
        <b-card-text>
          <div>
            <b-table stacked :items="[selectedEmailTemplate]" :fields="['company', 'subject', 'body']">
            </b-table>
          </div>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailContent',
  props: {
    emailTemplates: Array,
  },
  data() {
    return {
      isVisibleEmail: false,

      selectedEmailTemplate: {
        name: '',
        subject: '',
        body: '',
        type: '',
        company: ''
      },

      emailTypeOptions: [
        { value: 'Account Security Alerts', text: 'Account Security Alerts' },
        { value: 'Shopping Deals/Clearence Items', text: 'Shopping Deals/Clearence Items' },
        { value: 'Shipping Notifications', text: 'Shipping Notifications' },
        { value: 'Financial', text: 'Financial' },
        { value: 'Tech Support', text: 'Tech Support' },
        { value: 'Surveys/Feedback', text: 'Surveys/Feedback' },
        { value: 'Job Opportunities', text: 'Job Opportunities' }
      ],

      newTemplateTypeSelected: null,
    }
  },
  methods: {
    // Stores the selected email template into an object that is then displayed in depth on the right side
    emailTemplateRowClicked(item, i, ev) {
      // Make sure 'isVisibleEmail' is set to 'true' to be able to see the <b-card> component when user slected a row from the table
      this.isVisibleEmail = true

      // Make sure 'selectedEmailTemplate' values equal to empty array before adding values of selected item from the table
      let emptyTempArray = []
      this.selectedEmailTemplate = emptyTempArray

      // Store all values of selected email template into the 'selectedEmailTemplate' variable
      this.selectedEmailTemplate.name = item.name
      this.selectedEmailTemplate.subject = item.subject
      this.selectedEmailTemplate.body = item.body
      this.selectedEmailTemplate.type = item.type
      this.selectedEmailTemplate.company = item.company
    },
  }

}
</script>