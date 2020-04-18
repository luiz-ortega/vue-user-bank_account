import Vue from "vue";
import VueRouter from "vue-router";
import Users from "../views/Users.vue";
import AddUser from "../views/AddUser.vue";
import EditUser from "../views/EditUser.vue";
import AddBankAccount from "../views/AddBankAccount.vue";
import EditBankAccounts from "../views/EditBankAccounts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Users",
    component: Users
  },
  {
    path: "/add_user",
    name: "AddUser",
    component: AddUser
  },
  {
    path: "/user/:id/edit_user",
    name: "EditUser",
    component: EditUser
  },
  {
    path: "/user/:id/add_bank_account",
    name: "AddBankAccount",
    component: AddBankAccount
  },
  {
    path: "/user/:id/edit_bank_accounts",
    name: "EditBankAccounts",
    component: EditBankAccounts
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
