<template>
  <div class="col-12">
    <div class="d-flex justify-content-between mt-5">
      <CustomButton @click="$router.go(-1)" label="Voltar" type="primary" />
      <CustomButton
        @click="
          $router.push({ name: 'AddBankAccount', params: { backButton: true } })
        "
        label="+ Adicionar dados bancários"
        type="primary"
      />
    </div>
    <h4 class="text-center">Editar contas bancárias</h4>

    <div v-for="(bankAccount, index) in bankAccounts" :key="index">
      <BankAccountForm :bankAccount="bankAccount" ref="users" />
      <div class="d-flex justify-content-around mt-5 col-4 offset-4">
        <CustomButton
          @click="submitForm(index)"
          label="Deletar"
          type="danger"
        />
        <CustomButton
          @click="submitForm(index)"
          label="Salvar"
          type="success"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BankAccountForm from "@/components/Forms/BankAccountForm.vue";
import CustomButton from "@/components/CustomButton.vue";

import api from "@/services/api";

export default {
  name: "Users",

  components: {
    BankAccountForm,
    CustomButton
  },

  data() {
    return {
      bankAccounts: []
    };
  },

  mounted() {
    this.loadBankAccounts();
  },

  methods: {
    async loadBankAccounts() {
      const id = this.$route.params.id;
      console.log(id);

      try {
        const response = await api.get(`/users/${id}/bank_accounts`);
        console.log(response.data["hydra:member"]);
        this.bankAccounts = response.data["hydra:member"];
      } catch (err) {
        console.log(err);
      }
    },

    submitForm(index) {
      var child = this.$refs.users[index];
      const validation = child.handleSubmit();
      if (validation) {
        alert(`${JSON.stringify(validation)}`);
      }
    }
  }
};
</script>
