<script setup>
import { ref } from 'vue'

const emit = defineEmits(['searchUser'])

const name = ref('')
const phone = ref('')

function searchUser() {
    emit('searchUser', { name: name.value, phone: phone.value })
    name.value = ''
    phone.value = ''
}

function cencelUser() {
    emit('searchUser', { name: '', phone: '' })
    name.value = ''
    phone.value = ''
}
</script>

<template>
    <form @submit.prevent="searchUser">
        <div class="row mb-3">
            <label for="name" class="col-sm-2 col-for-label">Nama</label>
            <input type="text" class="form-control" id="nama" v-model="name">
        </div>
        <div class="row mb-3">
            <label for="name" class="col-sm-2 col-for-label">Phone</label>
            <input type="text" class="form-control" id="phone" v-model="phone">
        </div>

        <button type="submit" class="btn btn-primary">Seacrh</button>
        <button type="submit" class="btn btn-warning" @click="cencelUser">Cencel</button>
    </form>
</template>