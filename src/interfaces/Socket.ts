export interface INewMessage {
  table: string;
  action: string;
  data: IOrderSocket[];
  [key: string]: any,
}

interface IOrderSocket {
  asks: number[][]
  bids: number[][]
  symbol: string[]
  timestamp: string,
  markPrice?:number
}