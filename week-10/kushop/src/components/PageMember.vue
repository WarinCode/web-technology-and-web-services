<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

axios.defaults.withCredentials = true;

const member = ref(null);
const memEmail = ref(null);
const memName = ref(null);
const dutyId = ref(null);
const login = ref(null);

onMounted(async () => {
    await getMember();
})

const getMember = async () => {
    try {
        const response = await axios.get("http://localhost:3000/members/detail")
        const data = response.data;
        member.value = data.value;
        memEmail.value = data.memEmail;
        memName.value = data.memName;
        dutyId.value = data.dutyId
        login.value = data.login;
    } catch (err) {
        login.value = false;
        console.error(err.message);
    }
}
</script>

<template>
    <div class="container mt-5 fw-bold">
        <h1>Member</h1>
        <p>Email: {{ memEmail }}</p>
        <p>Username: {{ memName }}</p>
        <p>Duty ID: {{ dutyId }}</p>
    </div>
</template>

<style scoped></style>