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

    <div v-for="(user, index) in users" :key="index">
      <UserForm :userProps="user" ref="users" />
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
// @ is an alias to /src
import UserForm from "@/components/Forms/UserForm.vue";
import CustomButton from "@/components/CustomButton.vue";

export default {
  name: "Users",
  components: {
    UserForm,
    CustomButton
  },
  data() {
    return {
      users: [
        { firstName: "teste", lastName: "teste1", email: "teste2" },
        { firstName: "1", lastName: "2", email: "3" }
      ]
    };
  },
  mounted() {},
  methods: {
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
