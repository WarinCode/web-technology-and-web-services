<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:3000/products/three");
        products.value = response.data;
    } catch (err) {
        console.error(err?.message);
    }
});

</script>

<template>
    <h1 class="text-center my-5">ยินดีต้อนรับสู่ร้านค้าประจำเกษตรศาสตร์ศรีราชา</h1>
    <div class="row">
        <div v-for="(pd, pdId) in products" :key="pdId" class="col-lg-4 col-md-6 col-sm-12">
            <div class="card mt-3 mx-auto" style="width: 18rem; background-color: #EEE;">
                <img :src="`http://localhost:3000/img_pd/${pd.pdId}.jpg`" class="card-img-top p-2" :alt="pd.pdName">
                <div class="card-body">
                    <h5 class="card-title">{{ pd.pdName }}</h5>
                    <p class="card-text">{{ pd.brand?.brandName || "ไม่ระบุชื่อ" }} - {{ pd.pdPrice }}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    </div>
</template>