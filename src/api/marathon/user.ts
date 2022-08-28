import User from '@/utils/types/User'
import api from '../index'
export default {
    async getUsers(): Promise<any> {
        try {
            const res = await api.backend.get('api/tracker/user/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneUser(id: string): Promise<any> {
        try {
            const res = await api.backend.get(`api/tracker/user/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postUser(user: User): Promise<any> {
        try {
            const res = await api.backend.post('api/tracker/user/', { user })
            return res
        } catch (error) {
            return error
        }
    },
    async updateUser(user: User): Promise<any> {
        try {
            const res = await api.backend.put(`api/tracker/user/${user._id}`, { user })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteUser(id: string): Promise<any> {
        try {
            const res = await api.backend.delete(`api/tracker/user/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}