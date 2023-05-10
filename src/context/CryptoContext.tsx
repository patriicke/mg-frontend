import { Crypto } from "interface/crypto/crypto.interface";
import React from "react";

export enum CRYPTOActionType {
  SET = "setCRYPTO",
  SET_BET_PRICE = "setBetPrice",
  SET_WIN_RATE = "serWinRate",
  CLEAR = "clearCRYPTO",
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
  crypto: Crypto | null;
  cryptoPrice: number | null;
  winRate: string | null;
  price: string | null;
  changeType: string | null;
  toggleButton: boolean;
  serverSeedHash: string;
  clientSeed: string;
  hashLoading: boolean;
}

type Dispatch = (action: Action) => void;

const CRYPTOContext = React.createContext<
  { state: State; cryptoDispatch: Dispatch } | undefined
>(undefined);

function cryptoReducer(state: State, action: Action) {
  switch (action.type) {
    case CRYPTOActionType.SET:
      const newState = { ...state, ...action.payload };
      localStorage.setItem("cryptoState", JSON.stringify(newState));
      return newState;
    case CRYPTOActionType.SET_BET_PRICE:
      const betPriceState = { ...state, price: action.payload };
      localStorage.setItem("cryptoState", JSON.stringify(betPriceState));
      return betPriceState;
    case CRYPTOActionType.SET_WIN_RATE:
      const winRateState = { ...state, winRate: action.payload };
      localStorage.setItem("cryptoState", JSON.stringify(winRateState));
      return winRateState;
    case CRYPTOActionType.CLEAR:
      const clearedState = { crypto: null, winRate: null, price: null };
      localStorage.setItem("cryptoState", JSON.stringify(clearedState));
      return clearedState;
    case CRYPTOActionType.RESET_WIN_RATE_AND_PRICE:
      const resetState = { ...state, winRate: 0, price: 0 };
      localStorage.setItem("cryptoState", JSON.stringify(resetState));
      return resetState;
    case CRYPTOActionType.TOGGLE_BUTTON:
      const disableState = { ...state, toggleButton: action.payload };
      localStorage.setItem("cryptoState", JSON.stringify(disableState));
      return disableState;
    case CRYPTOActionType.SET_SERVER_SEED_HASH:
      const serverSeedHashState = { ...state, serverSeedHash: action.payload };
      localStorage.setItem("cryptoState", JSON.stringify(serverSeedHashState));
      return serverSeedHashState;
    case CRYPTOActionType.SET_CLIENT_SEED:
      const clientSeedState = { ...state, clientSeed: action.payload };
      localStorage.setItem("cryptoState", JSON.stringify(clientSeedState));
      return clientSeedState;
    case CRYPTOActionType.SERVER_HASH_LOADING:
      const cryptoState = { ...state, hashLoading: action.payload };
      localStorage.setItem("cryptoState", JSON.stringify(cryptoState));
      return cryptoState;
    default:
      return state;
  }
}

function getInitialState(): State {
  const storedState = localStorage.getItem("cryptoState");
  return storedState
    ? JSON.parse(storedState)
    : {
        crypto: null,
        cryptoPrice: null,
        winRate: null,
        price: null,
        changeType: null,
        toggleButton: false,
        serverSeedHash: "",
        clientSeed: "",
        hashLoading: false,
      };
}

function CRYPTOProvider({ children }: { children: React.ReactNode }) {
  const [state, cryptoDispatch] = React.useReducer(cryptoReducer, getInitialState());
  const value = { state, cryptoDispatch };

  return <CRYPTOContext.Provider value={value}>{children}</CRYPTOContext.Provider>;
}

function useCRYPTO() {
  const context = React.useContext(CRYPTOContext);
  if (context === undefined) {
    throw new Error("useCRYPTO must be used within an CRYPTOProvider");
  }

  return context;
}

export { CRYPTOProvider, useCRYPTO };
