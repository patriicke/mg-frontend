// {
//   "tokenId": "string",
//   "winProbability": 0,
//   "betAmount": 0,
//   "changeType": "string",
//   "price": 0,
//   "name": "string",
//   "symbol": "string",
//   "clientSeed": "string"
// }
export interface SpinPayload {
  tokenId: string;
  winProbability: number;
  betAmount: number;
  changeType: string;
  price: number;
  name: string;
  symbol: string;

  clientSeed: string;
}
export interface SeedHashPayload {
  tokenId: string;
  winProbability: number;
  betAmount: number;
  nftImage: string;
  changeType: string;
  name: string;
  symbol: string;
  price: number;
}
export interface Crypto {
  currentPrice: number;
  id: string;
  image: undefined | string;
  name: string;
  symbol: string;
}

export interface CryptoCollection {
  data?: Crypto[];
}

export interface CryptoBetHistoryData {
  results: CryptoBetHistory[];
  currentPage: number;
  next: number;
  pageSize: number;
  previous: number;
  totalItems: number;
}

export interface CryptoBetHistory {
  id: number;
  createdAt: string;
  nftImage: undefined | string;
  betAmount: number;
  symbol: string;
  contractName: string;
  type: string;
  status?: string;
  user: {
    id: number;
    username: string;
  };
}
