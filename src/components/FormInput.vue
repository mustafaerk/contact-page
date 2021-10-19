<template>
  <div class="form-input__wrapper">
    <input
      v-if="!isMulti"
      :type="type"
      :id="name"
      :name="name"
      :minlength="minlength || null"
      :maxlength="maxlength || null"
      :required="isRequired"
      :value="value"
      @input="onInput"
      :placeholder="title"
    />

    <textarea
      v-else
      :required="isRequired"
      :id="name"
      :name="name"
      :rows="rows"
      :maxlength="maxlength || null"
      :placeholder="title"
      :value="value"
      @input="onInput"
    />
    <span
      id="input_error"
      class="error_label"
      v-if="!isValidated && value !== ''"
    >
      {{ validateMessage }}
    </span>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isRequired: {
      type: Boolean,
    },
    isMulti: {
      type: Boolean,
    },
    isValidated: {
      type: Boolean,
      default: true,
    },
    validateMessage: {
      type: String,
    },
    maxlength: {
      type: Number,
    },
    minlength: {
      type: Number,
    },
    rows: {
      type: Number,
    },
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style scoped>
.form-input__wrapper {
  display: flex;
  margin: 20px 0;
  flex-direction: column;
}
.error_label {
  color: tomato;
  font-size: 12px;
  text-align: initial;
}
input,
textarea {
  box-sizing: border-box;
  background-color: transparent;
  position: relative;
  display: block;
  cursor: text;
  width: 100%;
  color: rgb(54, 73, 98) !important;
  transition: border 0.2s ease-in-out 0s;
  padding: 10px 18px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(215, 219, 224);
  border-image: initial;
  border-radius: 4px;
  min-height: 46px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  margin: 0;
  text-rendering: optimizeLegibility;
}
</style>
