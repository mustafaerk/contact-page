<template>
  <div id="app">
    <form
      method="post"
      class="form__wrapper"
      @submit.prevent="handleSubmit"
      id="contactForm"
    >
      <form-input
        isRequired
        :maxlength="20"
        :minlength="5"
        name="name"
        title="Name"
        type="text"
        v-model="formData.name"
        :isValidated="this.isNameValidated"
        :validateMessage="string.VALIDATION.NAME"
      />
      <form-input
        isRequired
        :maxlength="20"
        :minLength="5"
        name="email"
        title="Email"
        type="email"
        v-model="formData.email"
        :isValidated="this.isEmailValidated"
        :validateMessage="string.VALIDATION.EMAIL"
      />
      <form-input
        v-model="formData.subject"
        :maxlength="100"
        name="subject"
        title="Subject"
        type="text"
        :isValidated="this.isSubjectValidated"
        :validateMessage="string.VALIDATION.SUBJECT"
      />
      <form-input
        isRequired
        isMulti
        :rows="4"
        :maxlength="500"
        name="message"
        title="Message"
        type="text"
        v-model="formData.message"
        :isValidated="this.isMessageValidated"
        :validateMessage="string.VALIDATION.MESSAGE"
      />
      <custom-button type="submit" :text="string.SEND" />
    </form>
  </div>
</template>

<script>
import FormInput from "../components/FormInput.vue";
import CustomButton from "../components/Button";
import { ContantServices } from "../service/index";
import { STRING } from "../common/string";

export default {
  name: "Contact",
  components: { FormInput, CustomButton },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      string: { ...STRING },
    };
  },
  computed: {
    isNameValidated() {
      return !!(
        this.formData.name &&
        this.formData.name.length >= 5 &&
        this.formData.name.length < 50
      );
    },
    isSubjectValidated() {
      return !!(
        (this.formData.subject.length > 0 &&
          this.formData.subject.length <= 100) ||
        this.formData.subject.length === 0
      );
    },
    isMessageValidated() {
      return !!(
        this.formData.message.length > 0 && this.formData.message.length <= 500
      );
    },
    isEmailValidated() {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(this.formData.email);
    },
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      const response = await ContantServices.sendContantMessage({
        params: this.formData,
      });

      if (response.status === 200 || response.status === 201) {
        alert(STRING.SUCCESS_MESSAGE);
        this.formData = { name: "", email: "", subject: "", message: "" };
      } else {
        alert(response.data || STRING.FAIL_MESSAGE);
      }
    },
  },
};
</script>

<style>
.form__wrapper {
  width: 50%;
  margin: auto;
}
</style>
