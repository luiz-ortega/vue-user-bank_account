<template>
  <div class="col-12">
    <div class="d-flex justify-content-between mt-5">
      <CustomButton @click="$router.go(-1)" label="Voltar" type="primary" />
      <CustomButton
        @click="
          $router.push({
            name: 'AddBankAccount',
            params: { backButton: true, goBack: true }
          })
        "
        label="+ Adicionar dados bancários"
        type="primary"
      />
    </div>
    <h4 class="text-center">Editar contas bancárias</h4>

    <div v-for="(bankAccount, index) in bankAccounts" :key="index">
      <slot v-bind="bankAccounts">
        <BankAccountForm :bankAccount="bankAccount" ref="users" />
      </slot>
      <div class="d-flex justify-content-around mt-5 col-4 offset-4">
        <CustomButton
          @click="deleteBankAccount(bankAccount)"
          label="Deletar"
          type="danger"
        />
        <CustomButton
          @click="submitForm(index, bankAccount)"
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

      try {
        const response = await api.get(`/users/${id}/bank_accounts`);
        this.bankAccounts = response.data["hydra:member"];
      } catch (err) {
        console.log(err);
        this.$notify({
          group: "user-bank-account",
          type: "error",
          title: "Error",
          text: `${err}`
        });
      }
    },

    async deleteBankAccount(bankAccount) {
      const bankAccountId = bankAccount.id;
      try {
        await api.delete(`/bank_accounts/${bankAccountId}`);
        this.loadBankAccounts();
      } catch (err) {
        console.log(err);
        this.$notify({
          group: "user-bank-account",
          type: "error",
          title: "Error",
          text: `${err}`
        });
      }
    },

    async submitForm(index, bankAccount) {
      const bankId = bankAccount.id;
      var form = this.$refs.users[index];
      const formData = form.handleSubmit();
      if (formData) {
        try {
          await api.put(`/bank_accounts/${bankId}`, formData);
          this.loadBankAccounts();
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
