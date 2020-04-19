<template>
  <div>
    <Pagination
      :items="propsUsers"
      :totalPages="totalPages"
      :currentPage="currentPage"
      @click="changePage"
    />
    <table
      cellpadding="0"
      cellspacing="0"
      border="0"
      class="datatable table table-bordered"
    >
      <thead>
        <tr>
          <th>Nome</th>
          <th>Contas Bancárias</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody v-for="(user, index) in pagedUser" :key="index">
        <tr>
          <td>{{ user.name }}</td>
          <td class="bank-accounts-td-container">
            <div
              class="bank-accounts-container"
              v-for="(bankAccount, index) in user.bankAccounts"
              :key="index"
            >
              <div>
                <p>
                  <strong>{{ bankAccount.accountName }}</strong>
                  - {{ bankAccount.accountType }}
                </p>
                <p></p>
              </div>
              <p>{{ bankAccount.bank.name }}</p>
              <p>Ag: {{ bankAccount.agency }}-{{ bankAccount.agencyDigit }}</p>
              <p>
                C: {{ bankAccount.accountNumber }}-{{
                  bankAccount.accountDigit
                }}
              </p>
            </div>
          </td>

          <td class="col-buttons-container">
            <div class="buttons-container">
              <CustomButton
                label="Editar usuário"
                @click="$router.push(`/user/${user.id}/edit_user`)"
                type="outline-primary"
              />
              <CustomButton
                label="Editar dados bancários"
                @click="$router.push(`/user/${user.id}/edit_bank_accounts`)"
                type="outline-primary"
              />
              <CustomButton
                @click="deleteUser(user.id)"
                label="Excluir usuário"
                type="outline-danger"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton";
import Pagination from "@/components/Pagination";

export default {
  name: "UsersTable",
  components: {
    CustomButton,
    Pagination
  },
  props: ["propsUsers"],
  data() {
    return {
      currentPage: 1,
      indexStart: 0,
      indexEnd: 5,
      pageSize: 5
    };
  },
  computed: {
    totalPages: function() {
      return [
        ...Array(Math.ceil(this.propsUsers.length / this.pageSize + 1)).keys()
      ].slice(1);
    },
    pagedUser: function() {
      return this.propsUsers.slice(this.indexStart, this.indexEnd);
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      this.indexStart = page === 1 ? 0 : (page - 1) * this.pageSize;
      this.indexEnd = page * this.pageSize;
    },
    deleteUser(id) {
      this.$emit("click", id);
    }
  }
};
</script>

<style>
td {
  padding: 10px !important;
}

p {
  margin: 0;
}

.bank-accounts-td-container {
  padding-bottom: 0px !important;
}

.bank-accounts-container {
  margin-bottom: 10px;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  width: 450px;
  height: 40px;
}

.col-buttons-container {
  width: 450px;
}
</style>
