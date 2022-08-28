import Prize from '@/utils/types/Prize'
import api from '../index'
export default {
    async getPrizes(): Promise<any> {
        try {
            const res = await api.backend.get('api/tracker/prize/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOnePrize(id: string): Promise<any> {
        try {
            const res = await api.backend.get(`api/tracker/prize/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postPrize(prize: Prize): Promise<any> {
        try {
            const res = await api.backend.post('api/tracker/prize/', { prize })
            return res
        } catch (error) {
            return error
        }
    },
    async updatePrize(prize: Prize): Promise<any> {
        try {
            const res = await api.backend.put(`api/tracker/prize/${prize._id}`, { prize })
            return res
        } catch (error) {
            return error
        }
    },
    async deletePrize(id: string): Promise<any> {
        try {
            const res = await api.backend.delete(`api/tracker/prize/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}