import { defineStore } from "pinia"
import { request } from "./api"

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        rawItems: [],
    }),
    getters: {
        item: (state) => {
            state.rawItems
        }
    },
    actions: {
        loadItem() {
            request.get('users', { params: { page: 1 } }).then((response) => {
                this.rawItems = response.data.data[0].users.map(item => ({
                    id: item.id,
                    name: item.name,
                    phone: item.phone,
                    sent: true
                }));
            }).catch((err) => {
                console.log(err)
            })
        },
        addItem({ name, phone }) {
            const id = Date.now()
            this.rawItems.push({ id, name, phone })
            request.post('users', { name, phone }).then((response) => {
                this.rawItems = this.rawItems.map(item => {
                    if (item.id === id) {
                        return {
                            id: response.data.data.id,
                            name: response.data.data.name,
                            phone: response.data.data.phone,
                            sent: true
                        }
                    }
                    return item
                })
            }).catch((err) => {
                console.log(err)
                this.rawItems = this.rawItems.map(item => {
                    if (item.id === id) {
                        return {
                            id: item.id,
                            name: item.name,
                            phone: item.phone,
                            sent: false
                        }
                    }
                    return item
                })
            })
        },
        removeItem(id) {
            request.delete(`users/${id}`).then(() => {
                this.rawItems = this.rawItems.filter(item => item.id !== id)
            }).catch((err) => {
                console.log(err)
            })
        },
        updateItem(user) {
            this.rawItems = this.rawItems.map(item => {
                if (item.id === user.id) {
                    return user
                }
                return item
            })
        },
        resendItem(user) {
            request.post('users', { name: user.name, phone: user.phone }).then((response) => {
                this.rawItems = this.rawItems.map(item => {
                    if (item.id === user.id) {
                        return {
                            id: response.data.data.id,
                            name: response.data.data.name,
                            phone: response.data.data.phone,
                            sent: true
                        }
                    }
                    return item
                })
            }).catch((err) => {
                console.log(err)
            })
        },


    }
})