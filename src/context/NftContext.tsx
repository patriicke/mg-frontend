import { NFT } from "interface/nft/nft.interface";
import React from "react";

export enum NFTActionType {
  SET = "setNFT",
  SET_BET_PRICE = "setBetPrice",
  SET_WIN_RATE = "serWinRate",
  CLEAR = "clearNFT",
  RESET_WIN_RATE_AND_PRICE = "resetWinRateAndPrice",
  TOGGLE_BUTTON = "toggleButton",
  SET_SERVER_SEED_HASH = "setServerSeedHash",
  SET_CLIENT_SEED = "setClientSeed",
  SERVER_HASH_LOADING = "serverHashLoading",
}

interface Action {
  type: string;
  payload?: any;
}

interface State {
  nft: NFT | null;
  nftPrice: number | null;
  winRate: string | null;
  price: string | null;
  changeType: string | null;
  toggleButton: boolean;
  serverSeedHash: string;
  clientSeed: string;
  hashLoading: boolean;
}

type Dispatch = (action: Action) => void;

const NFTContext = React.createContext<
  { state: State; nftDispatch: Dispatch } | undefined
>(undefined);

function nftReducer(state: State, action: Action) {
  switch (action.type) {
    case NFTActionType.SET:
      const newState = { ...state, ...action.payload };
      localStorage.setItem("nftState", JSON.stringify(newState));
      return newState;
    case NFTActionType.SET_BET_PRICE:
      const betPriceState = { ...state, price: action.payload };
      localStorage.setItem("nftState", JSON.stringify(betPriceState));
      return betPriceState;
    case NFTActionType.SET_WIN_RATE:
      const winRateState = { ...state, winRate: action.payload };
      localStorage.setItem("nftState", JSON.stringify(winRateState));
      return winRateState;

    case NFTActionType.CLEAR:
      const clearedState = { nft: null, winRate: null, price: null };
      localStorage.setItem("nftState", JSON.stringify(clearedState));
      return clearedState;

    case NFTActionType.RESET_WIN_RATE_AND_PRICE:
      const resetState = { ...state, winRate: 0, price: 0 };
      localStorage.setItem("nftState", JSON.stringify(resetState));
      return resetState;
    case NFTActionType.TOGGLE_BUTTON:
      const disableState = { ...state, toggleButton: action.payload };
      localStorage.setItem("nftState", JSON.stringify(disableState));
      return disableState;
    case NFTActionType.SET_SERVER_SEED_HASH:
      const serverSeedHashState = { ...state, serverSeedHash: action.payload };
      localStorage.setItem("nftState", JSON.stringify(serverSeedHashState));
      return serverSeedHashState;
    case NFTActionType.SET_CLIENT_SEED:
      const clientSeedState = { ...state, clientSeed: action.payload };
      localStorage.setItem("nftState", JSON.stringify(clientSeedState));
      return clientSeedState;
    case NFTActionType.SERVER_HASH_LOADING:
      const nftState = { ...state, hashLoading: action.payload };
      localStorage.setItem("nftState", JSON.stringify(nftState));
      return nftState;
    default:
      return state;
  }
}

function getInitialState(): State {
  const storedState = localStorage.getItem("nftState");
  return storedState
    ? JSON.parse(storedState)
    : {
        nft: null,
        nftPrice: null,
        winRate: null,
        price: null,
        changeType: null,
        toggleButton: false,
        serverSeedHash: "",
        clientSeed: "",
        hashLoading: false,
      };
}

function NFTProvider({ children }: { children: React.ReactNode }) {
  const [state, nftDispatch] = React.useReducer(nftReducer, getInitialState());
  const value = { state, nftDispatch };

  return <NFTContext.Provider value={value}>{children}</NFTContext.Provider>;
}

function useNFT() {
  const context = React.useContext(NFTContext);
  if (context === undefined) {
    throw new Error("useNFT must be used within an NFTProvider");
  }

  return context;
}

export { NFTProvider, useNFT };
