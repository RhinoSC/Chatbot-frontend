import Prize from '@/utils/types/Prize'
import { AxiosInstance } from 'axios'
export default {
    async getPrizes(API: AxiosInstance): Promise<any> {
        try {
            const res = await API.get('api/tracker/prize/all')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOnePrize(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.get(`api/tracker/prize/one/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postPrize(API: AxiosInstance, prize: Prize): Promise<any> {
        try {
            const res = await API.post('api/tracker/prize/one', { prize })
            return res
        } catch (error) {
            return error
        }
    },
    async updatePrize(API: AxiosInstance, prize: Prize): Promise<any> {
        try {
            const res = await API.put(`api/tracker/prize/one/${prize._id}`, { prize })
            return res
        } catch (error) {
            return error
        }
    },
    async deletePrize(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.delete(`api/tracker/prize/one/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}