<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

axios.defaults.withCredentials = true;

const member = ref(null);
const memEmail = ref(null);
const memName = ref(null);
const dutyId = ref(null);
const login = ref(null);
const imgOK = ref(false);
const fileMessage = ref(null);
const file = ref(null);
const imageTimestamp = ref(Date.now());

onMounted(async () => {
    await getMember();
    await chkImage();
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

const chkImage = async () => {
    const image = new Image();
    image.src = `http://localhost:3000/img_mem/${memEmail.value}.jpg`;
    image.onload = () => {
        imgOK.value = true;
    }
    image.onerror = () => {
        imgOK.value = false;
    }
}

const onFileChange = async (e) => {
    file.value = e.target.files[0];
}

const uploadFile = async () => {
    if (!file.value) {
        fileMessage.value = "เลือก File เพื่อ Upload"
        return;
    }

    const formData = new FormData();
    formData.append("memEmail", memEmail.value);
    formData.append("file", file.value);

    try {
        const response = await axios.post(`http://localhost:3000/members/uploadimg`, formData, {
            headers: { "Content-Type": "mutipart/form-data" }
        });
        fileMessage.value = response.data.message;
        await chkImage();
        imageTimestamp.value = Date.now()
    } catch (err) {
        fileMessage.value = "Upload ไม่สำเร็จ"
    }
}
</script>

<template>
    <div class="row">
        <div class="col-md-6 col-sm-12">
            <h3>{{ memEmail }}</h3>
            <h5>{{ memName }}</h5>
        </div>
        <div class="col-md-6 col-sm-12 ">
            <div class="card mt-5" style="width: 18rem" v-if="imgOK">
                <img :src="`http://localhost:3000/img_mem/${memEmail}.jpg?timestamp=${imageTimestamp}`" :alt="memEmail">
            </div>
            <div class="card mt-5" style="width: 18rem" v-else>
                <img :src="`http://localhost:3000/img_mem/default.jpg`" :alt="memEmail">
            </div>
        </div>
        <form @submit.prevent="uploadFile()">
            <div class="row g-3 mt-3">
                <div class="col-md-6 col-sm-12 "></div>
                <div class="col-auto">
                    <input class="form-control" type="file" id="formFile" @change="onFileChange" required />
                </div>
                <div class="col-auto">
                    <button class="btn btn-primary" type="submit">Upload</button>
                </div>
            </div>
            <div class="row g-3 mt-3">
                <div class="col-md-6 col-sm-12 ">
                </div>
                <div class="col-auto">
                    <div class="alert alert-danger" v-if="fileMessage == 'Upload ไม่สำเร็จ' && fileMessage != null">
                        {{ fileMessage }}
                    </div>
                    <div class="alert alert-success" v-if="fileMessage != 'Upload ไม่สำเร็จ' && fileMessage != null">
                        {{ fileMessage }}
                    </div>
                </div>
                <div class="col-auto"></div>
            </div>
        </form>

    </div>
</template>