import Donation from "./Donation";
import Prize from "./Prize";
import Schedule from "./Schedule";

export default interface Event {
    _id?: string;
    name: string;
    start: number;
    end: number;
    TZ: {
        name: string;
        offset: number;
        text: string;
    },
    schedule?: Schedule;
    ExtSchedule: ExternalSchedule;
    isCharity: boolean,
    allowDonations: boolean,
    donations: Donation[];
    prizes: Prize[],
    isCharityData: {
        targetAmount: number,
        minDonation: number,
        paypalData: {
            token: string,
            currency: string,
            logoUrl: string,
            itemName: string
        }
    }
}