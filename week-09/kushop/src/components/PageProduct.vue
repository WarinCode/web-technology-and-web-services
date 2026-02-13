<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const products = ref([]);
const stext = ref("");

const searchProduct = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/products/search/${stext.value}`)
        products.value = response.data;
    } catch (err) {
        console.error(err?.message);
    }
}

onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:3000/products");
        products.value = response.data;
        console.log(products.value);
    } catch (err) {
        console.error(err?.message);
    }
})
</script>

<template>
    <form @submit.prevent="searchProduct()">
        <div class="row">
            <div class="h1 col-md-6 col-sm-12 text-danger">
                ผลิตภันฑ์ของเรา
            </div>
            <div class="col-md-4 col-sm-6">
                <input type="text" class="form-control" v-model="stext">
            </div>
            <div class="col">
                <button type="submit" class="btn btn-primary">ค้นหา</button>
            </div>
        </div>
    </form>

    <div class="row mt-4">
        <div v-for="(pd, pdId) in products" :key="pdId" class="col-lg-4 col-md-6 col-sm-12">
            <div class="card mx-auto my-4" style="width: 18rem; background-color: #EEE;">
                <img :src="`http://localhost:3000/img_pd/${pd.pdId}.jpg`" class="card-img-top" :alt="pd.pdName">
                <div class="card-body">
                    <h5 class="card-title">{{ pd.pdName }}</h5>
                    <p class="card-text">{{ pd.brand.brandName }} - {{ pd.pdPrice }}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>