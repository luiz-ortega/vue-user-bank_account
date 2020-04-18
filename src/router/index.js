import Vue from "vue";
import VueRouter from "vue-router";
import Users from "../views/Users.vue";
import AddUser from "../views/AddUser.vue";
import EditUser from "../views/EditUser.vue";
import AddBankAccount from "../views/AddBankAccount.vue";
import EditBankAccount from "../views/EditBankAccount.vue";

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
    path: "/edit_user",
    name: "EditUser",
    component: EditUser
  },
  {
    path: "/add_bank_account",
    name: "AddBankAccount",
    component: AddBankAccount
  },
  {
    path: "/edit_bank_accounts",
    name: "EditBankAccount",
    component: EditBankAccount
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
