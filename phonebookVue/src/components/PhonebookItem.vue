<script>
import { useUserStore } from '../stores/user';

export default {
    setup() {
        const User = useUserStore()
        return { User }
    },
    props: {
        no: {
            type: Number,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            isEdit: false,
            name: this.user.name,
            phone: this.user.phone
        }
    },
    methods: {
        update(id) {
            this.User.updateItem({ id, name: this.name, phone: this.phone })
            this.isEdit = false
        }
    }
}
</script>

<template>
    <tr>
        <td>{{ no }}</td>
        <td v-if="isEdit">
            <input class="form-control" type="text" v-model="name">
        </td>
        <td v-else>{{ user.name }}</td>
        <td v-if="isEdit">
            <input class="form-control" type="number" v-model="phone">
        </td>
        <td v-else>{{ user.phone }}</td>
        <td v-if="isEdit">
            <button class="btn btn-primary" type="button" @click="update(user.id)">Save</button>
            <button class="btn btn-warning" type="button" @click="isEdit = false">Cencel</button>
        </td>
        <td v-else>
            <div v-if="user.sent">
                <button class="btn btn-success" type="button" @click="isEdit = true">Edit</button>
                <button class="btn btn-danger" type="button" @click="User.removeItem(user.id)">Delete</button>
            </div>
            <div v-else>
                <button class="btn btn-warning" type="button" @click="User.resendItem(user)">Resend</button>
            </div>
        </td>
    </tr>
</template>
