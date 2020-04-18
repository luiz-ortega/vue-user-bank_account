<template>
  <div class="form-group">
    <button @click="onClick($event)" :class="['btn', `btn-${type}`]">
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "CustomButton",
  props: ["label", "type"],
  methods: {
    onClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>
