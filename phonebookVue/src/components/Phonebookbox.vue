<script setup>
import PhonebookList from "./PhonebookList.vue"
import PhonebookFrom from "./PhonebookFrom.vue";
import { useUserStore } from "../stores/user"
import PhonebookSearch from "./PhonebookSearch.vue";

const User = useUserStore()
const vLoadUser = {
    beforeMount: (el) => {
        User.loadItem()
    }
}
</script>

<template>
    <div class="container-user">
        <div class="card">
            <div class="card-header">
                <h1>Phonebook</h1>
            </div>
            <div class="card-body">
                <div>
                    <PhonebookFrom @createUser="User.addItem" />
                </div>
                <div>
                    <PhonebookSearch @searchUser="User.searchItem" />
                </div>
            </div>
            <PhonebookList v-load-user :users="User.rawItems" @loadMoreItem="User.loadMoreItem" />
        </div>
    </div>
</template>
