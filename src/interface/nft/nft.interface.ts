export interface AllCollectionContract {
  key: string;
  name: string;
  address: string;
}

export interface AllCollectionContractOptions {
  label: string;
  value: string;
}

export interface AllCollectionContract {
  label: string;
  value: string;
  // logo: string;
  // isVerified: boolean;
  // floorPrice: {
  //   amount: number;
  //   currency: string;
  // };
  // floorPriceMultichain: {
  //   amount: number;
  //   currency: string;
  // };
}

export interface NFTCollection {
  response: string;
  contracts: AllCollectionContract[];
}

export interface NFTByAddressContract {
  metadata: {
    banner_url: string;
    cached_banner_url: string;
    cached_thumbnail_url: string;
    description: string;
    thumbnail_url: string;
  };
  name: string;
  type: string;
  symbol: string;
}

// {
//   "tokenId": "16",
//   "image": "https://i.seadn.io/gcs/files/94ef2811b78d452589c5f23f070b4f9c.png?w=500&auto=format",
//   "name": null,
//   "contractAddress": "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
//   "chain": "",
//   "collectionName": "Mutant Ape Yacht Club",
//   "price": "9906.138000000000545"
// },
export interface NFT {
  tokenId: string;
  image: string;
  name: string;
  contractAddress: string;
  chain: string;
  collectionName: string;
  price: number;
  askPrice?: number;
  lastSalePrice?: number;
}

export interface NFTCollectionByAddress {
  // contract: NFTByAddressContract;
  data?: NFT[];
  next?: string;
  previous?: string;
}

export interface SeedHashPayload {
  chain: string;
  tokenId: string;
  nftAddress: string;
  winProbability: number;
  betAmount: number;
  nftImage: string;
  changeType: string;
}

export interface SeedHashResult {
  betAmount: number;
  chain: string;
  createdAt: string;
  nftAddress: string;
  nftImage: null | string;
  nonce: number;
  price: number;
  serverHash: string;
  status: string;
  tokenId: string;
  updatedAt: string;
  uuid: string;
  winProbability: number;
}

export interface SpinPayload {
  clientSeed: string;
  winProbability: number;
  chain?: string;
  tokenId: string;
  nftAddress: string;
  betAmount: number;
  changeType: string;
}

export interface BetHistoryData {
  results: BetHistory[];
  currentPage: number;
  next: number;
  pageSize: number;
  previous: number;
  totalItems: number;
}

export interface BetHistory {
  id: number;
  createdAt: string;
  betAmount: number;
  type: string;
  status?: string;
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
}
