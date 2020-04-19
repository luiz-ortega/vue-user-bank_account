<template>
  <div class="col-12">
    <div class="d-flex flex-row mt-5">
      <CustomButton @click="$router.go(-1)" label="Voltar" type="primary" />
    </div>
    <h4 class="text-center">Adicionar contas bancárias</h4>

    <UserForm ref="formComponent" />
  </div>
</template>

<script>
import UserForm from "@/components/Forms/UserForm.vue";
import CustomButton from "@/components/CustomButton.vue";

export default {
  name: "Users",
  components: {
    UserForm,
    CustomButton
  },
  methods: {
    submitForm() {
      var child = this.$refs.formComponent;
      const validation = child.handleSubmit();
      if (validation) {
        alert(`${JSON.stringify(validation)}`);
      }
    }
  }
};
</script>
