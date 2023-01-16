<script setup>
import Phonebookitem from "./PhonebookItem.vue"

const emit = defineEmits(['loadMoreItem'])

defineProps({
    users: {
        type: Object,
        required: true
    },
});
const scrolling = (event) => {
    var element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        emit('loadMoreItem')
    }
}

</script>
<template>
    <div class="scrolings" v-on:scroll="scrolling">
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
                <Phonebookitem v-for="(user, index) in users" :no="index + 1" :user="user"></Phonebookitem>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.scrolings {
    height: 300px;
    overflow-y: auto
}
</style>