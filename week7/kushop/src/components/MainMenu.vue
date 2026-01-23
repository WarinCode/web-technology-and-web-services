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
                            <div class="nav-link" href="#">Home</div>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/product">
                            <div class="nav-link" href="#">Product</div>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login">
                            <div class="nav-link" href="#">Login</div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup></script>
<style scoped></style>