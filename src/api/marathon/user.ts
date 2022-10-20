import User from '@/utils/types/User'
import { AxiosInstance } from 'axios'
export default {
    async getUsers(API: AxiosInstance): Promise<any> {
        try {
            const res = await API.get('api/tracker/user/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneUser(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.get(`api/tracker/user/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postUser(API: AxiosInstance, user: User): Promise<any> {
        try {
            const res = await API.post('api/tracker/user/', { user })
            return res
        } catch (error) {
            return error
        }
    },
    async updateUser(API: AxiosInstance, user: User): Promise<any> {
        try {
            const res = await API.put(`api/tracker/user/${user._id}`, { user })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteUser(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.delete(`api/tracker/user/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}