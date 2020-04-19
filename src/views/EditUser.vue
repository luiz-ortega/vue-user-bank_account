<template>
  <div class="col-12">
    <div class="d-flex flex-row mt-5">
      <CustomButton @click="$router.go(-1)" label="Voltar" type="primary" />
    </div>
    <h4 class="text-center">Editar usuário</h4>

    <UserForm :propsUser="user" ref="formComponent" />

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
  name: "EditUser",
  components: {
    UserForm,
    CustomButton
  },

  data() {
    return {
      user: {}
    };
  },

  mounted() {
    this.loadUser();
  },

  methods: {
    async loadUser() {
      const id = this.$route.params.id;

      try {
        const user_response = await api.get(`/users/${id}`);
        this.user = {
          name: user_response.data.name,
          cpf: user_response.data.cpf,
          email: user_response.data.email
        };
      } catch (err) {
        console.log(err);
      }
    },

    async submitForm() {
      const id = this.$route.params.id;
      var form = this.$refs.formComponent;
      const formData = form.handleSubmit();
      if (formData) {
        try {
          await api.put(`/users/${id}`, formData);
          this.$router.push("/");
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>
