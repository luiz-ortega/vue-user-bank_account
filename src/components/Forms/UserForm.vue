<template>
  <div class="col-8 offset-2">
    <form @submit.prevent="handleSubmit">
      <CustomInput
        inputLabel="Nome"
        name="name"
        v-model="name"
        :value="name"
        :submitted="submitted"
        :error="$v.name.$error"
        :errorMessage="validationMsg($v.name)"
      />

      <CustomInput
        inputLabel="CPF"
        name="cpf"
        :number="true"
        v-model="cpf"
        :value="cpf"
        :submitted="submitted"
        :error="$v.cpf.$error"
        :errorMessage="validationMsg($v.cpf)"
      />

      <CustomInput
        inputLabel="E-mail"
        name="email"
        v-model="email"
        :value="email"
        :submitted="submitted"
        :error="$v.email.$error"
        :errorMessage="validationMsg($v.email)"
      />
    </form>
  </div>
</template>

<script>
import { required, email, maxLength } from "vuelidate/lib/validators";
import CustomInput from "../CustomInput";
import { validationMessage } from "vuelidate-messages";

const formMessages = {
  required: () => "Campo obrigatório.",
  email: () => "E-mail inválido.",
  maxLength: () => "Máximo de 11 dígitos"
};

export default {
  name: "UserForm",
  components: {
    CustomInput
  },

  props: ["user"],
  data() {
    return {
      name: this.user ? this.user.name : "",
      cpf: this.user ? this.user.cpf : "",
      email: this.user ? this.user.email : "",
      submitted: false
    };
  },
  validations: {
    name: { required },
    cpf: { required, maxLength: maxLength(11) },
    email: { required, email }
  },
  methods: {
    validationMsg: validationMessage(formMessages),

    handleSubmit() {
      this.submitted = true;

      this.$v.$touch();
      if (!this.$v.$invalid) {
        return {
          name: this.name,
          cpf: this.cpf,
          email: this.email
        };
      }
    }
  }
};
</script>
