<template>
  <div class="col-12">
    <div class="d-flex flex-row mt-5">
      <CustomButton
        v-if="this.$route.params.backButton"
        @click="$router.go(-1)"
        label="Voltar"
        type="primary"
      />
    </div>
    <h4 class="text-center">Adicionar conta bancária</h4>

    <BankAccountForm ref="formComponent" />
    <div class="d-flex justify-content-around mt-5 col-4 offset-4">
      <CustomButton
        v-if="!this.$route.params.backButton"
        @click="$router.push('/')"
        label="Pular"
        type="outline-info"
      />
      <CustomButton @click="submitForm" label="Salvar" type="success" />
    </div>
  </div>
</template>

<script>
import BankAccountForm from "@/components/Forms/BankAccountForm.vue";
import CustomButton from "@/components/CustomButton.vue";
import api from "@/services/api";

export default {
  name: "AddBankAccount",
  components: {
    BankAccountForm,
    CustomButton
  },

  methods: {
    async submitForm() {
      var form = this.$refs.formComponent;
      const formValues = form.handleSubmit();

      if (formValues) {
        try {
          await api.post("/bank_accounts", {
            ...formValues,
            user: `/users/${this.$route.params.id}`
          });
          if (this.$route.params.backButton) {
            this.$router.go(-1);
          } else {
            this.$router.push("/");
          }
        } catch (err) {
          console.log(err);
          this.$notify({
            group: "user-bank-account",
            type: "error",
            title: "Error",
            text: `${err}`
          });
        }
      }
    }
  }
};
</script>
