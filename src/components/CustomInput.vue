<template>
  <div class="form-group">
    <label>{{ inputLabel }}</label>
    <input
      @input="updateInput"
      type="text"
      :value="value"
      ref="name"
      id="name"
      name="name"
      class="form-control"
      :class="{ 'is-invalid': submitted && error }"
    />
    <div v-if="submitted" class="invalid-feedback">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: ["inputLabel", "submitted", "value", "error", "name", "errorMessage"],
  methods: {
    updateInput() {
      this.$emit("input", this.$refs.name.value);
    }
  }
};
</script>

<style>
.is-invalid {
  border-color: #cecece !important;
}
</style>
