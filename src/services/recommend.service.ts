import axiosInstance from 'axios/axiosInstance';

export const getBonusInfo = async (): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.get(`referral-bonus/info`);
    if (response.status === 200) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const getBonusDetails = async (): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.get(`referral-bonus/details`);
    if (response.status === 200) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};
