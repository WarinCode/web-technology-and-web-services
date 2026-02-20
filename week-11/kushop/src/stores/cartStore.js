import { defineStore } from "pinia";
import { ref } from "vue";

const useCartStore = defineStore("cart", () => {
  const theQty = ref(0);
  const cartId = ref(null);

  const updateQty = () => {
    theQty.value++;
  };

  const setId = (id) => {
    cartId.value = id;
  };

  return { theQty, cartId, updateQty, setId };
});

export default useCartStore;
