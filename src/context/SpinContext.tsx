import * as React from 'react';

export enum ActionType {
  Spin = 'spin',
  Stop = 'stop',
  Interval = 'interval',
  ToggleSound = 'toggleSound',
  ToggleBoost = 'toggleBoost',
  ToggleLoop = 'toggleLoop',
  setWinAmount = 'setWinAmount',
}

interface Action {
  type: ActionType;
  betResult?: boolean;
  inInterval?: boolean;
  toggleSound?: boolean;
  toggleBoost?: boolean;
  toggleLoop?: boolean;
  winAmount?: string;
}

type Dispatch = (action: Action) => void;
type State = {
  isSpinning?: boolean;
  betResult?: boolean;
  inInterval?: boolean;
  toggleSound?: boolean;
  toggleLoop?: boolean;
  toggleBoost?: boolean;
  winAmount?: string;
};
type ProviderProps = {
  children: React.ReactNode;
};

const SpinContext = React.createContext<
  | {
      state: State;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);

function SpinReducer(state: State, action: Action) {
  const { type, betResult, inInterval } = action;
  switch (type) {
    case ActionType.Spin:
      return {
        ...state,
        isSpinning: true,
        betResult: betResult,
        inInterval: false,
      };

    case ActionType.Stop:
      return {
        ...state,
        isSpinning: false,
        betResult: false,
        inInterval: true,
      };
    case ActionType.Interval:
      return {
        ...state,
        isSpinning: false,
        betResult: betResult,
        inInterval: inInterval,
      };
    case ActionType.ToggleSound:
      return {
        ...state,
        toggleSound: action.toggleSound,
      };
    case ActionType.ToggleBoost:
      return {
        ...state,
        toggleBoost: action.toggleBoost,
      };
    case ActionType.ToggleLoop:
      return {
        ...state,
        toggleLoop: action.toggleLoop,
      };
    case ActionType.setWinAmount:
      return {
        ...state,
        winAmount: action.winAmount,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function SpinProvider({ children }: ProviderProps) {
  const [state, dispatch] = React.useReducer(SpinReducer, {
    isSpinning: false,
    betResult: false,
    inInterval: false,
    toggleSound: true,
    toggleBoost: false,
    winAmount: ''
  });
  const value = { state, dispatch };

  return <SpinContext.Provider value={value}>{children}</SpinContext.Provider>;
}

function useSpin() {
  const context = React.useContext(SpinContext);
  if (context === undefined) {
    throw new Error('useSpin must be used within a SpinProvider');
  }

  return context;
}

export { SpinProvider, useSpin };
