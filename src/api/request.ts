import axios, { AxiosRequestConfig } from 'axios';
import { message as $message } from 'antd';

axios.defaults.timeout = 6000;

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  config => {
    if (config?.data?.message) {
      // $message.success(config.data.message)
    }
    return config?.data;
  },
  error => {
    let errorMessage = '系统异常';
    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络';
    }
    console.dir(error);
    error.message && $message.error(errorMessage);
    return {
      status: false,
      message: errorMessage,
      result: null
    };
  }
);

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
};

type Method = 'get' | 'post';

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): MyResponse<T> => {
  // const prefix = '/api'
  const prefix = '';
  url = prefix + url;
  if (method === 'post') {
    return axios.post(url, data, config);
  } else {
    return axios.get(url, {
      params: data,
      ...config
    });
  }
};
