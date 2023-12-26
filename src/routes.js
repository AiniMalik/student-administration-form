import LoginForm from "./components/LoginForm.vue"
import HomeFile from "./components/HomeFile.vue"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Login",
    component: LoginForm,
    path: "/login",
  },
  {
    name: "Home",
    component: HomeFile,
    path: "/",
  },

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
