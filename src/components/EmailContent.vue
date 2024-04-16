<template>
  <div>

    <!-- Tab Description for users -->
    <h5> Create your own phishing attack email templates</h5>
    <hr>

    <div class="d-flex mb-8">
      <!-- LEFT SIDE -->
      <!-- Displaying a list of all emaill templates in db -->
      <div class="w-50 mx-2 px-2">
        <p>List of all email templates</p>
        <div>
          <b-table noCollapse striped hover :items="localEmailTemplates" :fields="['name', 'type', 'subject']"
            @row-clicked="emailTemplateRowClicked">
          </b-table>
        </div>
        <!-- Button that opens up a modal to create a new email template -->
        <div>
          <b-button block v-b-modal.modal-2>Create New Template</b-button>
          <b-modal ref="newTemplateModal" id="modal-2" hide-footer>
            <template #modal-header="{ close }">
              <h5 class="mb-0">New Email Template</h5>
            </template>

            <div class="d-flex mb-3">
              <label class="me-2 align-self-center w-20">Name: </label>
              <b-form-input v-model="name" type="text" class="mx-2"></b-form-input></br>
            </div>
            <div class="d-flex mb-3">
              <label class="me-2 align-self-center w-20">Type: </label>
              <b-form-select v-model="newTemplateTypeSelected" :options="emailTypeOptions"
                class="form-select mx-2"></b-form-select></br>
            </div>
            <div class="d-flex mb-3">
              <label class="me-2 align-self-center w-20">Company: </label>
              <b-form-input v-model="company" type="text" class="mx-2"></b-form-input></br>
            </div>
            <div class="d-flex mb-3">
              <label class="me-2 align-self-center w-20">Subject: </label>
              <b-form-input v-model="subject" type="text" class="mx-2"></b-form-input></br>
            </div>
            <div class="d-flex mb-3">
              <label class="me-2 align-self-center w-20">Body: </label>
              <b-form-textarea v-model="body" type="text" class="mx-2"></b-form-textarea>
            </div>
            <b-button class="mt-3" @click="createNewTemplate">Create Template</b-button>
            <b-button class="mt-3" @click="hideModal">Cancel</b-button></br>

            <!-- Toast for errors -->
            <b-toast id="template-error-toast" :title="templateToast.title" auto-hide-delay="5000"
              :variant="templateToast.variant">
              {{ templateToast.content }}
            </b-toast>


          </b-modal>
        </div>
      </div>

      <!-- Right Side -->
      <!-- Displays more detail about the email template selected by user -->
      <div class="w-50 mx-2 px-2" v-show="isVisibleEmail">
        <b-card :title=selectedEmailTemplate.name :sub-title=selectedEmailTemplate.type>
          <b-card-text>
            <div>
              <b-table id="email-template-info" stacked :items="[selectedEmailTemplate]"
                :fields="['company', 'subject', 'body']" style="white-space: pre-wrap; text-align: left;">
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
  name: 'EmailContent',
  props: {
    emailTemplates: Array,
  },
  watch: {
    emailTemplates(newVal, oldVal) {
      if (newVal) {
        console.log("[emailTemplates] Updated! ", newVal.length);
        this.localEmailTemplates = JSON.parse(JSON.stringify(newVal));
      }
    }
  },
  data() {
    return {
      // a local variable to keep track of changes to the 'emailTemplates' prop
      localEmailTemplates: this.emailTemplates ? JSON.parse(JSON.stringify(this.emailTemplates)) : [],

      isVisibleEmail: false,

      // Stores all information on selected tempalte to display in more detail to user
      selectedEmailTemplate: {
        name: '',
        subject: '',
        body: '',
        type: '',
        company: ''
      },

      // Contains the optios available to select the email template type
      emailTypeOptions: [
        { value: 'Account Security Alerts', text: 'Account Security Alerts' },
        { value: 'Shopping Deals/Clearence Items', text: 'Shopping Deals/Clearence Items' },
        { value: 'Shipping Notifications', text: 'Shipping Notifications' },
        { value: 'Financial', text: 'Financial' },
        { value: 'Tech Support', text: 'Tech Support' },
        { value: 'Surveys/Feedback', text: 'Surveys/Feedback' },
        { value: 'Job Opportunities', text: 'Job Opportunities' }
      ],

      // variables connected to the values of each input field in the 'newEmailTemplate' modal
      name: "",
      newTemplateTypeSelected: null,
      company: "",
      subject: "",
      body: "",

      // contains an error message if the form is invalid
      newTemplateError: "",
      templateToast: {
        title: "",
        content: "",
        variant: "danger"
      },
    }
  },
  methods: {
    showToast(toastId, title, toastText, vari) {
      if (toastId === "template-error-toast") {
        this.templateToast = {
          title: title,
          content: toastText,
          variant: vari
        }
        this.$bvToast.show(toastId);
      }
    },
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
    createNewTemplate() {
      console.log("[createNewTemplate] Hit.");

      // Validate form information
      if (!this.name) {
        // Email name is empty
        this.newTemplateError = "Please specify a name.";
        this.showToast('template-error-toast', "Error", this.newTemplateError, "danger");
        return;
      } else if (!this.newTemplateTypeSelected) {
        // Email Template is empty
        this.newTemplateError = "Please select an email template.";
        this.showToast('template-error-toast', "Error", this.newTemplateError, "danger");
        return;
      } else if (!this.company) {
        // Email company is empty
        this.newTemplateError = "Please specify a email template company.";
        this.showToast('template-error-toast', "Error", this.newTemplateError, "danger");
        return;
      } else if (!this.subject) {
        // Email subject is empty
        this.newTemplateError = "Please specify the email subject.";
        this.showToast('template-error-toast', "Error", this.newTemplateError, "danger");
        return;
      } else if (!this.body) {
        // Email body is empty
        this.newTemplateError = "Please specify the email body.";
        this.showToast('template-error-toast', "Error", this.newTemplateError, "danger");
        return;
      } else if (this.body.search(/\[\[[A-Za-z]+\]\]/) === -1) {
        // Email body is missing placeholder for phishing link
        this.newTemplateError = "The email body must contain a placeholder for the phishing link. Please enclose some text in double square brackets";
        this.showToast('template-error-toast', "Error", this.newTemplateError, "danger");
        return;
      }

      // This form is valid
      this.newTemplateError = "";
      this.showToast('template-error-toast', "Success", "Successfully created new template!", "success");

      // Set new email template object with all values entered by user to send as request body
      let newEmailTemplate = {
        name: this.name,
        type: this.newTemplateTypeSelected,
        company: this.company,
        subject: this.subject,
        body: this.body
      }

      // emit an event to the parent to create this template
      this.$emit("createNewEmailTemplate", newEmailTemplate)

      // close the modal after creating the new template
      this.hideModal();
    },
    // Hide modal when 'cancel' button is pressed in the 'Add New Employee' modal
    hideModal() {
      this.$refs['newTemplateModal'].hide()

      // empty all existing values for creating new template modal when 'hideModal' is triggered
      this.name = "";
      this.newTemplateTypeSelected = null;
      this.company = "";
      this.subject = "";
      this.body = "";
    }
  }
}
</script>

<style>
/* Style for the stacked b-table headers */
.b-table.b-table-stacked>tbody>tr>td::before {
  width: 20% !important;
}

/* Style for the stacked b-table data */
.b-table.b-table-stacked>tbody>tr>td>div {
  width: 80% !important;
}

.mb-8 {
  margin-bottom: 5em;
}

.w-20 {
  width: 20%;
}
</style>