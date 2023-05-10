import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  address: string;
  avatar: string;
  signMethod: 'EMAIL' | 'METAMASK_WALLET' | 'PHANTOM_WALLET';
  balance: number;
  rollback: number;
  isPrivacy: boolean;
}

export interface UserState extends User {
  signed: boolean;
}

const initialState: UserState = {
  signed: false,
  name: '',
  email: '',
  address: '',
  avatar: '',
  signMethod: 'EMAIL',
  balance: 0,
  rollback: 0,
  isPrivacy: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      return { ...action.payload };
    },
    changeUsername: (state: UserState, action: PayloadAction<string>) => {
      return { ...state, name: action.payload };
    },
    changeUserAvatar: (state: UserState, action: PayloadAction<string>) => {
      return { ...state, avatar: action.payload };
    },
    changePrivacy: (state: UserState, action: PayloadAction<boolean>) => {
      return { ...state, isPrivacy: action.payload };
    },
    signOut: (state: UserState, action: PayloadAction) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  changeUsername,
  changeUserAvatar,
  changePrivacy,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;
