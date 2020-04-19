<template>
  <div class="col-12">
    <h1 class="text-center mt-5">Usuários</h1>
    <div class="d-flex flex-row-reverse">
      <CustomButton
        @click="$router.push({ name: 'AddUser' })"
        label="+ Adicionar usuário"
        type="primary"
      />
    </div>
    <slot v-bind="users">
      <UsersTable @click="deleteUser" :propsUsers="users" />
    </slot>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";
import UsersTable from "@/components/UsersTable.vue";
import api from "@/services/api";

export default {
  name: "Users",
  components: {
    CustomButton,
    UsersTable
  },

  data() {
    return {
      users: []
    };
  },

  mounted() {
    this.loadUsers();
  },

  methods: {
    async loadUsers() {
      const response_users = await api.get("/users");
      const response_bankAccounts = await api.get("/bank_accounts");
      const response_banks = await api.get("/banks");

      const users = response_users.data["hydra:member"];
      const bankAccounts = response_bankAccounts.data["hydra:member"];
      const banks = response_banks.data["hydra:member"];

      const users_bankAccounts = users.reduce((current, next) => {
        let bankAccountDetails = next.bankAccounts.map(bankAccountId =>
          bankAccounts.find(el => el["@id"] === bankAccountId)
        );
        next["bankAccounts"] = bankAccountDetails;
        return current;
      }, users);

      const users_bankAccounts_banks = users_bankAccounts.reduce(
        (current, next) => {
          next.bankAccounts.reduce((current, next) => {
            let newBankAccount = banks.find(el => el["@id"] === next.bank);
            next["bank"] = newBankAccount;
            return current;
          }, next.bankAccounts);

          return current;
        },
        users_bankAccounts
      );

      this.users = users_bankAccounts_banks;
    },

    async deleteUser(id) {
      try {
        await api.delete(`/users/${id}`);
        this.loadUsers();
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
