import Prize from '@/utils/types/Prize'
import { AxiosInstance } from 'axios'
export default {
    async getPrizes(API: AxiosInstance): Promise<any> {
        try {
            const res = await API.get('api/tracker/prize/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOnePrize(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.get(`api/tracker/prize/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postPrize(API: AxiosInstance, prize: Prize): Promise<any> {
        try {
            const res = await API.post('api/tracker/prize/', { prize })
            return res
        } catch (error) {
            return error
        }
    },
    async updatePrize(API: AxiosInstance, prize: Prize): Promise<any> {
        try {
            const res = await API.put(`api/tracker/prize/${prize._id}`, { prize })
            return res
        } catch (error) {
            return error
        }
    },
    async deletePrize(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.delete(`api/tracker/prize/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}