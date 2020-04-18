<template>
  <div class="col-8 offset-2">
    <form @submit.prevent="handleSubmit">
      <CustomInput
        inputLabel="First Name"
        name="firstName"
        v-model="user.firstName"
        :value="user.firstName"
        :submitted="submitted"
        :error="$v.user.firstName.$error"
        :errorMessage="validationMsg($v.user.firstName)"
      />

      <CustomInput
        inputLabel="Last Name"
        name="lastName"
        v-model="user.lastName"
        :value="user.lastName"
        :submitted="submitted"
        :error="$v.user.lastName.$error"
        :errorMessage="validationMsg($v.user.lastName)"
      />

      <CustomInput
        inputLabel="E-mail"
        name="email"
        v-model="user.email"
        :value="user.email"
        :submitted="submitted"
        :error="$v.user.email.$error"
        :errorMessage="validationMsg($v.user.email)"
      />

      <CustomSelect
        inputLabel="Banco"
        name="bank"
        v-model="user.bank"
        :submitted="submitted"
        :error="$v.user.bank.$error"
        :errorMessage="validationMsg($v.user.bank)"
      />

      <!-- <div class="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" v-model="user.firstName" id="firstName" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && $v.user.firstName.$error }" />
                                <div v-if="submitted && !$v.user.firstName.required" class="invalid-feedback">First Name is required</div>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" v-model="user.lastName" id="lastName" name="lastName" class="form-control" :class="{ 'is-invalid': submitted && $v.user.lastName.$error }" />
                                <div v-if="submitted && !$v.user.lastName.required" class="invalid-feedback">Last Name is required</div>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" v-model="user.email" id="email" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.user.email.$error }" />
                                <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.email.required">Email is required</span>
                                    <span v-if="!$v.user.email.email">Email is invalid</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" v-model="user.password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" />
                                <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.password.required">Password is required</span>
                                    <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="confirmPassword">Confirm Password</label>
                                <input type="password" v-model="user.confirmPassword" id="confirmPassword" name="confirmPassword" class="form-control" :class="{ 'is-invalid': submitted && $v.user.confirmPassword.$error }" />
                                <div v-if="submitted && $v.user.confirmPassword.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.confirmPassword.required">Confirm Password is required</span>
                                    <span v-else-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
                                </div>
                            </div> -->
    </form>
  </div>
</template>

<script>
import {
  required,
  email
  // minLength, sameAs
} from "vuelidate/lib/validators";
import CustomInput from "../CustomInput";
import CustomSelect from "../CustomSelect";
import { validationMessage } from "vuelidate-messages";

const formMessages = {
  required: () => "Compo requerido!",
  email: () => `An emai is always a good idea.`
};

export default {
  name: "Form",
  components: {
    CustomInput,
    CustomSelect
  },

  props: ["userProps"],
  data() {
    return {
      user: {
        firstName: this.userProps ? this.userProps.firstName : "",
        lastName: this.userProps ? this.userProps.lastName : "",
        email: this.userProps ? this.userProps.email : "",
        bank: this.userProps ? this.userProps.bank : ""
        // password: "",
        // confirmPassword: ""
      },
      submitted: false
    };
  },
  validations: {
    user: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      bank: { required }
      // password: { required, minLength: minLength(6) },
      // confirmPassword: { required, sameAsPassword: sameAs('password') }
    }
  },
  methods: {
    validationMsg: validationMessage(formMessages),

    handleSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (!this.$v.$invalid) {
        return {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email
        };
      }
    }
  }
};
</script>
