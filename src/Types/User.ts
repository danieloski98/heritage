export interface IUser {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    bitcoin_wallet: string;
    usdt_wallet: string;
    ethereum_wallet: string;
    mobile_id?: string;
    web_id?: string;
    suspended?: boolean;
    verified: boolean;
    isLoggedIn?: boolean;
    _id: string;
    referral_code?: string;
    phone?: string;
    bank_name?: string;
    account_name?: string;
    account_number?: string;
    pin: string;
}