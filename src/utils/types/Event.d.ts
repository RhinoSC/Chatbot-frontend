export default interface Event {
    _id: string;
    name: string;
    start: number;
    end: number;
    TZ: {},
    schedule: {} | undefined;
    isCharity: boolean,
    allowDonations: boolean,
    donations: [] | undefined;
    prizes: [] | undefined,
    isCharityData: {
        targetAmount: number,
        minDonation: number,
        paypalData: {
            token: string,
            currency: string,
            logoUrl: string
        }
    }
}