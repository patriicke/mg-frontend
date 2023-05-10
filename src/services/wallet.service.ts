import axiosInstance from 'axios/axiosInstance';

export const getMethods = async (): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.get(`/transaction/methods`);
    if (response.status === 200) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const estimateCrypto = async (data: any): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.get(
      `/transaction/estimate?amount=${data.amount}&currencyFrom=${data.currencyFrom}&currencyTo=${data.currencyTo}`,
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

export const createTransaction = async (data: any): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post(`/transaction/payment`, data);
    if (response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const createPayout = async (data: any): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.post(`/transaction/payout`, data);
    if (response.status === 201) {
      return [response, null];
    } else {
      throw response;
    }
  } catch (error) {
    return [null, error];
  }
};

export const getTransactionHistory = async (data: any): Promise<[any, any]> => {
  try {
    const response = await axiosInstance.get(
      `/transaction/history?page=${data.page}${(data.fromDate && `&fromDate=${data.fromDate}`)}${data.toDate && `&toDate=${data.toDate}`}`,
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