<template>
  <div class="col-12">
    <div class="d-flex flex-row mt-5">
      <CustomButton @click="$router.go(-1)" label="Voltar" type="primary" />
    </div>
    <h4 class="text-center">Adicionar usuário</h4>

    <UserForm ref="formComponent" />
    <div class="d-flex justify-content-around mt-5 col-4 offset-4">
      <CustomButton @click="submitForm" label="Salvar" type="success" />
    </div>
  </div>
</template>

<script>
import UserForm from "@/components/Forms/UserForm.vue";
import CustomButton from "@/components/CustomButton.vue";
import api from "@/services/api";

export default {
  name: "Users",

  components: {
    UserForm,
    CustomButton
  },

  methods: {
    async submitForm() {
      const form = this.$refs.formComponent;
      const formData = form.handleSubmit();
      if (formData) {
        try {
          const response = await api.post("/users", formData);

          this.$router.push({
            name: "AddBankAccount",
            params: { backButton: false, id: response.data.id }
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>
