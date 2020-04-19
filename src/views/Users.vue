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
      <UserTable :propsUsers="users" />
    </slot>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";
import UserTable from "@/components/UserTable.vue";

import api from "@/services/api";

export default {
  name: "Users",

  components: {
    CustomButton,
    UserTable
  },

  data() {
    return {
      users: []
    };
  },

  async mounted() {
    const reponse_users = await api.get("/users");
    console.log(reponse_users);
    this.users = reponse_users.data["hydra:member"];
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
