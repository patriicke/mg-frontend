import axiosInstance from "axios/axiosInstance";
import { SeedHashPayload, SpinPayload } from "interface/crypto/crypto.interface";

export const spin = async (data: SpinPayload): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post("crypto-slot/spin", data);
    if (response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const serverSeedHash = async (
  data: SeedHashPayload
): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post(
      "crypto-slot/server-seed-hash",
      data
    );
    if (response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const getAllCryptoSlotCollections = async (): Promise<[any, any]> => {
    try {
      // let queries = {
      //   ...(data.chain && { chain: data.chain }),
      //   ...(data.period && { period: data.period }),
      // };
      // object to query param
      // let queryParam = Object.keys(queries)
      //   .map((key) => {
      //     return encodeURIComponent(key) + "=" + encodeURIComponent(queries[key]);
      //   })
      //   .join("&");
      const response = await axiosInstance.get(`/crypto-slot/collections`);
      if (response.status === 200) {
        return [response?.data || [], null];
      } else {
        throw response;
      }
    } catch (error) {
      return [null, error];
    }
  };


export const getAllCryptoBets = async (pageNumber: number): Promise<[any, any]> => {
    try {
      const response = await axiosInstance.get(
        `/crypto-slot/all-bets?page=${pageNumber}`
      );
      if (response.status === 200) {
        return [response, null];
      } else {
        throw response;
      }
    } catch (error) {
      return [null, error];
    }
};

export const getPersonalCryptoBets = async (
    pageNumber: number
  ): Promise<[any, any]> => {
    try {
      const response = await axiosInstance.get(
        `/crypto-slot/personal-bets?page=${pageNumber}`
      );
      if (response.status === 200) {
        return [response, null];
      } else {
        throw response;
      }
    } catch (error) {
      return [null, error];
    }
};