<template>
  <div class="col-12">
    <h1 class="text-center mt-5">Usuários</h1>
    <div class="d-flex flex-row-reverse">
      <CustomButton
        @click="submitForm"
        label="+ Adicionar usuário"
        type="primary"
      />
    </div>

    <UserForm ref="formComponent" />
  </div>
</template>

<script>
// @ is an alias to /src
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
