import { defineStore } from "pinia";
import { ref } from "vue";

const useAuthStore = defineStore("auth", () => {
  const isLogin = ref(false);

  const login = () => {
    isLogin.value = true;
  };

  const logout = () => {
    isLogin.value = false;
  };

  return { isLogin, login, logout };
});

export default useAuthStore;
