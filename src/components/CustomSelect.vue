<template>
  <div class="form-group">
    <label>{{ inputLabel }}</label>
    <div>
      <v-select
        id="name"
        :reduce="option => option.id"
        label="name"
        name="name"
        @input="updateInput"
        :options="options"
        v-model="currentValue"
        :clearable="false"
      ></v-select>
    </div>
    <div v-if="submitted" class="invalid-feedback">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props: [
    "inputLabel",
    "submitted",
    "value",
    "error",
    "name",
    "errorMessage",
    "options"
  ],
  data() {
    return {
      currentValue: this.value ? this.value : ""
    };
  },

  mounted() {},
  methods: {
    updateInput() {
      this.$emit("input", this.currentValue);
    }
  }
};
</script>

<style>
.vs--searchable .vs__dropdown-toggle {
  height: 38px;
}

.vs__actions {
  padding: 4px 8px 0 3px;
}

.vs__dropdown-toggle {
  border-color: #cecece !important;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545 !important;
}
</style>
