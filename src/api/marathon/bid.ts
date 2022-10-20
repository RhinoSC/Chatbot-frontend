import Bid from '@/utils/types/Bid'
import { AxiosInstance } from 'axios'

export default {
    async getBids(API: AxiosInstance): Promise<any> {
        try {
            const res = await API.get('api/tracker/bid/')
            return res.data
        } catch (error) {
            return error
        }
    },

    async getOneBid(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.get(`api/tracker/bid/${id}`)
            return res.data
        } catch (error) {
            return error
        }
    },
    async postBid(API: AxiosInstance, bid: Bid): Promise<any> {
        try {
            const res = await API.post('api/tracker/bid/', { bid })
            return res
        } catch (error) {
            return error
        }
    },
    async updateBid(API: AxiosInstance, bid: Bid): Promise<any> {
        try {
            const res = await API.put(`api/tracker/bid/${bid._id}`, { bid })
            return res
        } catch (error) {
            return error
        }
    },
    async deleteBid(API: AxiosInstance, id: string): Promise<any> {
        try {
            const res = await API.delete(`api/tracker/bid/${id}`)
            return res
        } catch (error) {
            return error
        }
    }
}