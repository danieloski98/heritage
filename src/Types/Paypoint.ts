export interface IPaypoint {
  bitcoin_wallet: string;
  usdt_wallet: string;
  etheruem_wallet: string;
  buy_rate: number;
  sell_rate: number;
  bank: IBank;
  createdAt: string;
  updatedAt: string;
}

export interface IBank {
    bank_name: string;
    account_name: string;
    account_number: string;
    bank_code: string;
    account_type: 'SAVINGS' | 'CURRENT';
  }