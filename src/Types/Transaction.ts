import { IUser } from "./User";

export interface ITransaction {
    __v: number;
    _id: string;
    amount: number;
    coin_amount: number;
    coin_type: number;
    proof_of_payment: string[];
    status: number;
    type: number;
    user_id: string;
    createdAt: string;
    USD: number;
    rate: number;
    user: IUser;
}