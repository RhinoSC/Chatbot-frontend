import { goalType } from '../enums/goal.enum'

export default interface Bid {
    _id?: string;
    name: string;
    game: string;
    goal: number;
    current: number;
    description: string;
    type: goalType,
    newBids: boolean,
    bids: [{ name: string, current: number }];
    openBid: boolean;
}