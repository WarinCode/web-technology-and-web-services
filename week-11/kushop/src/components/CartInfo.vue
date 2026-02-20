<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import useCartStore from '@/stores/cartStore';
import axios from 'axios';

axios.defaults.withCredentials = true;

const cartStore = useCartStore();
const router = useRouter();
const memEmail = ref(null);
const cartId = ref();
const qty = ref(0);
const money = ref(0);
const id = ref(null);

watch(() => cartStore.theQty, () => {
    id.value = cartStore.cartId;
    sumCart(id.value);
});

onMounted(async () => {
    await getMember();
    await chkCart();
    await sumCart(cartId.value);
});

const chkCart = async () => {
    let members = {
        memEmail: memEmail.value,
    }

    try {
        const response = await axios.post(`http://localhost:3000/carts/chkcart`, members);
        cartId.value = response.data.cartId;
    } catch (err) {
        console.error(err);
    }
}

const getMember = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/members/detail`);
        memEmail.value = response.data.memEmail;
    } catch (err) {
        console.error(err);
    }
}

const sumCart = async (cid) => {
    try {
        const response = await axios.get(`http://localhost:3000/carts/sumcart/${cid}`);
        const data = response.data;
        cartId.value = data.id;
        qty.value = data.qty;
        money.value = data.money;
    } catch (err) {
        console.error(err);
    }
}
</script>

<template>
    <div v-if="qty > 0">
        <button class="btn btn-success text-white" @click="router.push(`/cartshow/${cartId}`)">
            {{ cartId }} [{{ qty }}] - {{ money }}฿
        </button>
    </div>
</template>