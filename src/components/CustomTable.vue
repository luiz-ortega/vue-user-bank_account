<template>
  <div>
    <pre>
          {{ pagedUser }}
      </pre
    >
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
          <td>
            <div v-for="(bankAccount, index) in user.bankAccounts" :key="index">
              <p>{{ bankAccount }}</p>
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
              <CustomButton label="Excluir usuário" type="outline-danger" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <nav class="pagination-container">
      <ul class="pagination">
        <li
          @click="
            changePage(
              currentPage > totalPages[0] ? currentPage - 1 : totalPages[0]
            )
          "
          class="page-item"
        >
          <p class="page-link">Anterior</p>
        </li>
        <div v-for="(page, index) in totalPages" :key="index">
          <li class="page-item">
            <p
              :class="{ 'page-selected': page === currentPage }"
              class="page-link"
              @click="changePage(page)"
            >
              {{ page }}
            </p>
          </li>
        </div>

        <li
          @click="
            changePage(
              currentPage < totalPages[totalPages.length - 1]
                ? currentPage + 1
                : totalPages[totalPages.length - 1]
            )
          "
          class="page-item"
        >
          <p class="page-link">Próxima</p>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton";

export default {
  name: "CustomTable",
  components: {
    CustomButton
  },
  props: ["propsUsers"],
  data() {
    return {
      currentPage: 1,
      indexStart: 0,
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
      return this.propsUsers.slice(this.indexStart, this.pageSize);
    }
  },

  methods: {
    changePage(page) {
      this.currentPage = page;
    }
  }
};
</script>

<style>
td {
  padding: 10px !important;
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

.pagination-container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.page-link:hover {
  cursor: pointer;
  background-color: #007bff;
  color: white !important;
}

.page-selected {
  background-color: #007bff;
  color: white !important;
}
</style>
