<template>
  <div class="col-8 offset-2">
    <form @submit.prevent="handleSubmit">
      <CustomInput
        inputLabel="Nome da conta"
        name="accountName"
        v-model="accountName"
        :value="accountName"
        :submitted="submitted"
        :error="$v.accountName.$error"
        :errorMessage="validationMsg($v.accountName)"
      />

      <CustomSelect
        inputLabel="Banco"
        name="bank"
        v-model="bank"
        :submitted="submitted"
        :error="$v.bank.$error"
        :errorMessage="validationMsg($v.bank)"
        :options="banks"
      />

      <CustomSelect
        inputLabel="Tipo de conta"
        name="accountType"
        v-model="accountType"
        :submitted="submitted"
        :error="$v.accountType.$error"
        :errorMessage="validationMsg($v.accountType)"
        :options="accountTypes"
      />

      <div class="account-number-row-container">
        <CustomInput
          inputLabel="Agência"
          name="agency"
          :number="true"
          v-model="agency"
          :value="agency"
          :submitted="submitted"
          :error="$v.agency.$error"
          :errorMessage="validationMsg($v.agency)"
        />

        <div class="margin-left">
          <CustomInput
            inputLabel="Dígito"
            name="agencyDigit"
            :number="true"
            v-model="agencyDigit"
            :value="agencyDigit"
            :submitted="submitted"
            :error="$v.agencyDigit.$error"
            :errorMessage="validationMsg($v.agencyDigit)"
          />
        </div>
      </div>

      <div class="account-number-row-container">
        <CustomInput
          inputLabel="Conta"
          name="accountNumber"
          :number="true"
          v-model="accountNumber"
          :value="accountNumber"
          :submitted="submitted"
          :error="$v.accountNumber.$error"
          :errorMessage="validationMsg($v.accountNumber)"
        />

        <div class="margin-left">
          <CustomInput
            inputLabel="Dígito"
            name="accountDigit"
            :number="true"
            v-model="accountDigit"
            :value="accountDigit"
            :submitted="submitted"
            :error="$v.accountDigit.$error"
            :errorMessage="validationMsg($v.accountDigit)"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CustomInput from "../CustomInput";
import CustomSelect from "../CustomSelect";

import api from "@/services/api";
import { required, maxLength } from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";

const formMessages = {
  required: () => "Campo obrigatório.",
  maxLength: () => "Digito deve conter 1 dígito."
};

export default {
  name: "Form",
  components: {
    CustomInput,
    CustomSelect
  },

  props: ["bankAccount"],
  data() {
    return {
      accountName: this.bankAccount ? this.bankAccount.accountName : "",
      agency: this.bankAccount ? this.bankAccount.agency : "",
      agencyDigit: this.bankAccount ? this.bankAccount.agencyDigit : "",
      bank: this.bankAccount ? this.bankAccount.bank : "",
      accountType: this.bankAccount ? this.bankAccount.accountType : "",
      accountNumber: this.bankAccount ? this.bankAccount.accountNumber : "",
      accountDigit: this.bankAccount ? this.bankAccount.accountDigit : "",

      accountTypes: [
        { id: "POUPANCA", name: "POUPANCA" },
        { id: "CORRENTE", name: "CORRENTE" }
      ],
      banks: [],
      submitted: false
    };
  },
  validations: {
    accountName: { required },
    agency: { required },
    agencyDigit: { required, maxLength: maxLength(1) },
    bank: { required },
    accountType: { required },
    accountNumber: { required },
    accountDigit: { required, maxLength: maxLength(1) }
  },

  async mounted() {
    const response_banks = await api.get("/banks");
    const banks = response_banks.data["hydra:member"];

    const newBanks = banks.reduce((current, next) => {
      let bank = {
        id: next["@id"],
        name: next["name"]
      };
      current.push(bank);
      return current;
    }, []);

    this.banks = newBanks;
  },

  methods: {
    validationMsg: validationMessage(formMessages),

    handleSubmit() {
      this.submitted = true;

      this.$v.$touch();
      if (!this.$v.$invalid) {
        return {
          accountName: this.accountName,
          agency: this.agency,
          agencyDigit: this.agencyDigit,
          bank: this.bank,
          accountType: this.accountType,
          accountNumber: this.accountNumber,
          accountDigit: this.accountDigit
        };
      }
    }
  }
};
</script>

<style>
.margin-left {
  margin-left: 10px;
}
.account-number-row-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
