export interface ISignup {
  sendToken?: boolean;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  token?: string;
  referralId?: string;
}

export interface IVerifySignature {
  address?: string;
  signature?: string;
  type: string;
  referralCode?: string;
}

export interface ISignupError {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
}

export interface IEmail {
  sendToken: boolean;
  email: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignInGoogle {
  token: string;
  referralCode?: string;
}
