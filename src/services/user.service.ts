import axios from "axios";
import axiosInstance from "axios/axiosInstance";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export const UserProfile = async (): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.get("/auth/profile");

    // const response = {
    //   status: 200,
    //   data: {
    //     data: {
    //       meta: { api: { version: "0.0.1" } },
    //       data: {
    //         id: 8,
    //         email: "roshanranabhat11+1@gmail.com",
    //         username: "roshanr",
    //         accountVerified: true,
    //         referralCode: "AB0wyo",
    //         referralId: null,
    //         showUsername: true,
    //         referralPoints: 1,
    //         totalWalletBalance: 25034,
    //         avatar: null,
    //       },
    //     },
    //   },
    // };
    if (response.status === 200) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};
