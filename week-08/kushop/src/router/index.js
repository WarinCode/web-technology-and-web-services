import { createRouter, createWebHistory } from "vue-router";
import TheProduct from "@/components/TheProduct.vue";
import TheLogin from "@/components/TheLogin.vue";
import TheHome from "@/components/TheHome.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: TheHome,
  },
  {
    path: "/product",
    name: "product",
    component: TheProduct,
  },
  {
    path: "/login",
    name: "Login",
    component: TheLogin,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
