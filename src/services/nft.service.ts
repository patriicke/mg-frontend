import axiosInstance from "axios/axiosInstance";
import { SeedHashPayload, SpinPayload } from "interface/nft/nft.interface";

export const getAllCollections = async (data: any): Promise<[any, any]> => {
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
    const response = await axiosInstance.get(`/nft/top-collections`);
    if (response.status === 200) {
      return [response?.data?.data || [], null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const getCollectionByAddress = async (
  data: any
): Promise<[any, any]> => {
  try {
    let queries = {
      ...(data.cursor && { cursor: data.cursor }),
    };
    // object to query param
    let queryParam = Object.keys(queries)
      .map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(queries[key]);
      })
      .join("&");

    const response = await axiosInstance.get(`/nft/${data.slug}?${queryParam}`);
    if (response.status === 200) {
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
      "nft-game/server-seed-hash",
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

export const newHash = async (clientSeed: string): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post("nft-game/new-seed", {
      clientSeed,
    });
    if (response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const spin = async (data: SpinPayload): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post("nft-game/spin", data);
    if (response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const getWonImages = async (): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.get(`/nft-game/won-images`);
    if (response.status === 200) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const getAllBets = async (pageNumber: number): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.get(
      `/nft-game/all-bets?page=${pageNumber}`
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

export const getPersonalBets = async (
  pageNumber: number
): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.get(
      `/nft-game/personal-bets?page=${pageNumber}`
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

export const getSearchResult = async (keyword: string): Promise<[any, any]> => {
  keyword = encodeURIComponent(keyword)
  try {
    const response = await axiosInstance.get(`/nft/search?keyword=${keyword}`);
    if (response.status === 200) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};
