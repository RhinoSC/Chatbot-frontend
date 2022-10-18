import Bid from '@/utils/types/Bid'
import api from '../index'
export default {
    async getBids(): Promise<any> {
        try {
            const res = await api.backend.get('api/tracker/bid/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneBid(id: string): Promise<any> {
        try {
            const res = await api.backend.get(`api/tracker/bid/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postBid(bid: Bid): Promise<any> {
        try {
            const res = await api.backend.post('api/tracker/bid/', { bid })
            return res
        } catch (error) {
            return error
        }
    },
    async updateBid(bid: Bid): Promise<any> {
        try {
            const res = await api.backend.put(`api/tracker/bid/${bid._id}`, { bid })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteBid(id: string): Promise<any> {
        try {
            const res = await api.backend.delete(`api/tracker/bid/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}