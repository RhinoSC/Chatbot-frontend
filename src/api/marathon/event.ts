import api from '../index'
export default {
    async getEvents(): Promise<any> {
        try {
            const res = await api.backend.get('api/tracker/event/')
            return res
        } catch (error) {
            return error
        }
    },
    async postEvent(event: any): Promise<any> {
        try {
            const res = await api.backend.post('api/tracker/event/', { event })
            return res
        } catch (error) {
            return error
        }
    }
}