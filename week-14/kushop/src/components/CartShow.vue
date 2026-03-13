<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
axios.defaults.withCredentials = true;

const route = useRoute();
const cart = ref([]);
const cartDtl = ref([]);
const cartId = ref(null);
const cusId = ref(null);
const memEmail = ref(null);

const formattedDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

onMounted(async () => {
    await getMember();
    cartId.value = route.params.cartId;
    await getCart();
    await getCartDtl();
});

const getCart = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/carts/getcart/${cartId.value}`);
        const data = response.data;
        cart.value = data;
        cusId.value = cart.value[0].cusId;
    } catch (err) {
        console.error(err);
    }
}

const getCartDtl = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/carts/getcartdtl/${cartId.value}`);
        cartDtl.value = response.data;
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
</script>

<template>
    <div v-if="memEmail === cusId">
        <div v-for="(ct, cartId) in cart" :key="cartId" class="mt-5">
            <div class="card bg-light">
                <div class="card-body">
                    <h4 class="card-title text-primary opacity-75">คำสั่งซื้อเลขที่ {{ ct.cartId }}</h4>
                    <h5 class="card-subtitle mt-2 text-muted">สั่งซื้อวันที่ {{ formattedDate(ct.cartDate) }}</h5>
                    <div class="text-danger text-end">
                        จำนวนสินค้า {{ ct.sqty }} ขึ้น, ยอดเงิน {{ (ct.sprice ?? 0).toLocaleString() }} บาท
                    </div>
                    <hr>
                    <a class="btn btn-danger" onclick="return confirm('ยืนยันลบตระกร้า')">
                        <i class="bi-cart-x-fill"></i> ลบตระกร้าสินค้า
                    </a>
                    <a class="btn btn-primary float-end" onclick="return confirm('ยืนยันสั่งสินค้า')">
                        <i class="bi-currency-dollar"></i> ยืนยันสั่งสินค้า
                    </a>
                </div>
            </div>
        </div>

        <table class="table mt-3">
            <thead>
                <tr class="bg-secondary bg-opacity-10">
                    <td></td>
                    <td>สินค้า</td>
                    <td class="text-end">ราคาต่อหน่วย</td>
                    <td class="text-center">จำนวน</td>
                    <td class="text-end">เป็นเงิน</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(ctd, pdId) in cartDtl" :key="pdId">
                    <td>{{ ctd.row_number }}</td>
                    <td>{{ ctd.pdId }}</td>
                    <td>{{ ctd.pdName }}</td>
                    <td class="text-end">{{ ctd.price }}</td>
                    <td class="text-center">{{ ctd.qty }}</td>
                    <td class="text-end">{{ ((ctd.price * ctd.qty) ?? 0).toLocaleString() }}</td>
                    <td class="text-center">
                        <i class="bi-x-lg text-danger"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>
        <div class="alert alert-danger mt-5">คุณไม่มีสิทธิ์ดูรายการนี้</div>
    </div>
</template>
