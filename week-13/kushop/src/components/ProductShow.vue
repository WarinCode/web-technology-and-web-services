<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import useCartStore from '@/stores/cartStore';

axios.defaults.withCredentials = true;

const cartStore = useCartStore();
const route = useRoute();
const products = ref([])
const id = ref(null);
const login = ref(false);
const memEmail = ref(null);
const cartId = ref(null);
const backendMessage = ref(null);

onMounted(async () => {
    id.value = route.params.pdId;

    try {
        const response = await axios.get(`http://localhost:3000/products/${id.value}`);
        products.value = response.data;
    } catch (err) {
        console.error(err);
    }
});

const chkLogin = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/members/detail`);
        const data = response.data;
        login.value = data.login;
        memEmail.value = data.memEmail;

        if (login.value) {
            console.log(`Login: ${login.value}`);
            await chkCart();
            if (!cartId.value) {
                await addCart();
            }
            await addCartDtl();
        } else {
            alert("ยังไม่ได้ Login ต้อง Login ก่อนซื้อสินค้า");
        }
    } catch (err) {
        console.error(err.message);
    }
}

const chkCart = async () => {
    let members = {
        memEmail: memEmail.value,
    };

    try {
        const response = await axios.post(`http://localhost:3000/carts/chkcart`, members);
        cartId.value = response.data.cartId;
        console.log(cartId.value);
    } catch (err) {
        console.error(err);
    }
}

const addCart = async () => {
    let customer = {
        cusId: memEmail.value,
    }

    try {
        const response = await axios.post(`http://localhost:3000/carts/addcart`, customer);
        const data = response.data;
        backendMessage.value = response.data.messageAddCart;
        cartId.value = data.messageAddCart;
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

const addCartDtl = async () => {
    let cartdtl = {
        cartId: cartId.value,
        pdId: id.value,
        pdPrice: products.value[0].pdPrice,
    }

    try {
        const response = await axios.post(`http://localhost:3000/carts/addcartdtl`, cartdtl);

        cartStore.updateQty();
        cartStore.setId(cartId.value);

        backendMessage.value = response.data.messageAddCartDtl;
        console.log(response.data);
    } catch (err) {
        console.error(err);
    }
}
</script>

<template>
    <div class="container">
        <div v-for="(pd, pdId) in products" :key="pdId" class="mt-5">
            <div class="row ">
                <div class="col-md-6 col-sm-12 ">
                    <div class="card mx-auto mb-3" style="width: 18rem">
                        <img :src="`http://localhost:3000/img_pd/${pd.pdId}.jpg`" alt=""
                            class="rounded shadow-sm" >
                    </div>
                </div>
                <div class="col-md-6 col-sm-12 ">
                    <table class="table">
                        <tbody>
                            <tr class="table-secondary">
                                <td><h4>{{ pd.pdId }}</h4></td> <td><h4>{{ pd.pdName }}</h4></td>
                            </tr>
                            <tr>
                                <td><h5>ราคา</h5></td> <td><h5>{{ pd.pdPrice }}</h5></td>
                            </tr>
                            <tr>
                                <td><h5>ยี่ห้อ</h5></td> <td><h5>{{ pd.brand?.brandName || "ไม่ระบุยี่ห้อ" }}</h5></td>
                            </tr>
                            <tr>
                                <td><h5>รายละเอียด</h5></td> <td><h5>{{ pd.pdRemark }}</h5></td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="btn btn-primary" @click="chkLogin()">
                        <i class="bi bi-cart lead"></i> ใส่ตะกร้า&nbsp;
                    </button>
                    <button class="btn btn-warning float-end"><i class="bi bi-pencil-fill lead"></i>
                        แก้ไข&nbsp;&nbsp;</button>
                </div>
            </div>
        </div>
    </div>
</template>
