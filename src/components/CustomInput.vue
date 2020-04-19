<template>
  <div class="full-width">
    <label>{{ inputLabel }}</label>

    <input
      v-if="!number"
      @input="updateInput"
      type="text"
      :value="value"
      ref="name"
      id="name"
      name="name"
      class="form-control"
      :class="{
        'is-invalid': submitted && error
      }"
    />
    <input
      v-if="number"
      @input="updateInput"
      type="number"
      :value="value"
      ref="name"
      id="name"
      name="name"
      class="form-control"
      :class="{
        'is-invalid': submitted && error
      }"
    />

    <div v-if="submitted" class="invalid-feedback">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: [
    "inputLabel",
    "submitted",
    "value",
    "error",
    "name",
    "errorMessage",
    "number"
  ],
  methods: {
    updateInput() {
      this.$emit("input", this.$refs.name.value);
    }
  }
};
</script>

<style>
.full-width {
  margin: 15px auto;
  width: 100%;
}
.is-invalid {
  border-color: #cecece !important;
}
</style>
