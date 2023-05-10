import axiosInstance from 'axios/axiosInstance';
import {
  IEmail,
  ISignIn,
  ISignInGoogle,
  ISignup,
  IVerifySignature,
} from 'interface/auth/auth';

const API_URL = 'http://localhost:8080/api/auth/';

// export const register = (username: string, email: string, password: string) => {
//   return axiosInstance.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

export const SendEmailToken = async (body: IEmail): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post('/auth/register', body);
    if (response.status === 200 || response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const UserSignUp = async (body: ISignup): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post('/auth/register', body);
    if (response.status === 200 || response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const GetIdentifier = async (
  address: string,
  type: string,
): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post(
      `/auth/wallet/${address}/identifier`,
      {
        type,
      },
    );
    if (response.status === 200 || response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const VerifySignature = async (
  body: IVerifySignature,
): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post(`/auth/wallet/verify`, body);
    if (response.status === 200 || response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const UserSignIn = async (body: ISignIn): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post('/auth/login', body);
    if (response.status === 200 || response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const GoogleLoginFunc = async (
  body: ISignInGoogle,
): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post('/auth/login/google', body);
    if (response.status === 200 || response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const login = (username: string, password: string) => {
  return axiosInstance
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    if (response.status === 204) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
};

export const getDefaultPics = async (): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.get('/auth/profile/default-pics');
    if (response.status === 200) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const updateUserProfile = async (body: any): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.patch('/auth/profile', body);
    if (response.status === 200) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};
