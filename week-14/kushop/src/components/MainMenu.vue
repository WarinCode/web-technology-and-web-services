<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import useAuthStore from '@/stores/authStore';
import CartInfo from './CartInfo.vue';

axios.defaults.withCredentials = true;

const router = useRouter();
const authStore = useAuthStore();
const member = ref(null);
const memEmail = ref(null);
const memName = ref(null);
const dutyId = ref(null);
const login = ref(false);

onMounted(async () => {
    await getMember();
})

watch(() => authStore.isLogin, () => {
    getMember();
});

const getMember = async () => {
    try {
        const response = await axios.get("http://localhost:3000/members/detail");
        member.value = response.data;
        memEmail.value = member.value.memEmail;
        memName.value = member.value.memName;
        dutyId.value = member.value.dutyId;
        login.value = member.value.login;
    } catch (err) {
        console.error(err);
    }
}

const memLogout = async () => {
    const confirm = window.confirm("ต้องการออกจากระบบ?");

    if (confirm) {
        try {
            console.log(authStore.isLogin)
            await axios.get("http://localhost:3000/members/logout");
            await getMember();
            authStore.logout();
            router.push("/");
        } catch (err) {
            console.error(err);
        }
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Kushop</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/">
                            <div class="nav-link" href="#" style="text-decoration: none">Home</div>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/product">
                            <div class="nav-link" href="#" style="text-decoration: none">Product</div>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="login">
                        <router-link to="/pagemember" style="text-decoration: none">
                            <div class="nav-link fw-bold">{{ memName }}</div>
                        </router-link>
                    </li>
                    <li class="nav-item pe-3" v-if="login">
                        <CartInfo />
                    </li>
                    <li class="nav-item" v-if="login">
                        <router-link to="/cartlist" style="text-decoration: none">
                            <div class="nav-link fw-bold">Cart</div>
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="login">
                        <a href="#" @click="memLogout()" style="text-decoration: none">
                            <div class="nav-link fw-bold">ลงชื่อออก</div>
                        </a>
                    </li>
                    <li class="nav-item" v-if="!login">
                        <router-link to="/login" style="text-decoration: none">
                            <div class="nav-link">Login</div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>