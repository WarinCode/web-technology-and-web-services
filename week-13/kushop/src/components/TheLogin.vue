<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/authStore';

axios.defaults.withCredentials = true;

const authStore = useAuthStore();
const router = useRouter();
const loginName = ref(null);
const password = ref(null);
const login = ref(null);
const message = ref(null);

onMounted(async () => {
    await getMember();

    if (login.value) {
        router.push("/pagemember");
    }
});

const getMember = async () => {
    try {
        const response = await axios.get("http://localhost:3000/members/detail");
        login.value = response.data.login;
    } catch(err){
        console.error(err);
    }
}

const handleSubmit = async () => {
    const members = { loginName: loginName.value, password: password.value };

    try {
        const { data } = await axios.post(`http://localhost:3000/members/login`, members);
        console.log(data);
        login.value = data.login;
        message.value = data.message;

        if (login.value){
            authStore.login();
            router.push("/pagemember");
        }
    } catch (err) {
        login.value = false;
        message.value = err.message;
        console.error(err);
    }
}
</script>

<template>
    <div class="row" style="margin-top: 160px;">
        <div class="col-sm-12 col-md-6 col-lg-6 mb-5">
            <img src="/LogoSRC.png" class="d-block mx-auto">
        </div>
        <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
            <form @submit.prevent="handleSubmit()">
                <div class="col-sm-12 col-md-10 col-lg-8">
                    <div class="form-floating mb-3">
                        <input class="form-control" type="email" id="loginName" v-model="loginName" autocomplete="off"
                            required autofocus placeholder="loginName">
                        <label for="loginName">loginName</label>
                    </div>
                </div>
                <div class="col-sm-12 col-md-10 col-lg-8">
                    <div class="form-floating mb-3">
                        <input class="form-control" type="password" id="password" v-model="password" required
                            placeholder="Password">
                        <label for="loginName">Password</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 col-md-6 mb-3">
                        <router-link to="/register" style="text-decoration: none;">
                            <a href="#" class="btn btn-outline-danger">
                                <i class="bi bi-heart-fill"></i>&nbsp; ลงทะเบียนใหม่
                            </a>
                        </router-link>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <button class="btn btn btn-primary" type="submit" style="width: 6rem;">
                            <i class="bi bi-check-lg"></i>&nbsp; ตกลง
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <p v-if="login && message" class="alert alert-success">
        เข้าสู่ระบบสำเร็จ - {{ message }}
    </p>
    <p v-else-if="!login && message" class="alert alert-danger">
        เข้าสู่ระบบผิดพลาด - {{ message }}
    </p>
</template>

<style scoped></style>