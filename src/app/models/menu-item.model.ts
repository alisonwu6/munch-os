export type StockStatus = 'available' | 'soldOut' | 'restocking';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  stockStatus: StockStatus;
}
