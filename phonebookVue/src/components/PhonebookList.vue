<script setup>
import Phonebookitem from "./PhonebookItem.vue"

defineProps({
    users:{
        type:Object,
        required:true
    },
});
</script>
<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <Phonebookitem v-for="(user,index) in users" :no="index+1" :user="user"></Phonebookitem>
        </tbody>
    </table>
</template>