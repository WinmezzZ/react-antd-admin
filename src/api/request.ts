import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import qs from 'query-string';

import { history } from '~/route/history';
import store from '~/store';
import { setGlobalState } from '~/store/global.store';

const axiosInstance = axios.create({
  withCredentials: true,
  timeout: 2000,
});

axiosInstance.interceptors.request.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: true,
      }),
    );
    if (history.location.pathname !== '/login') {
      //
      config.headers = {
        'X-CSRF-TOKEN': store.getState().user.CSRFToken || '',
      };
    }

    return config;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    if (config.data?.CODE !== 'ok') {
      message.error(config.data.MESSAGE);

      if (config.data?.CODE === 'SessionNotAuthed') {
        Cookies.remove('CSRFToken');
        history.replace('/login', {
          from: history.location.pathname,
        });
      }
    }

    return config?.data;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    // if needs to navigate to login page when request exception
    // history.replace('/login');
    let errorMessage = '系统异常';

    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络';
    } else if (error?.message?.includes('timeout')) {
      errorMessage = '请求超时，请稍后再试';
    } else {
      errorMessage = error?.message;
    }
    console.dir(error);
    error.message && message.error(errorMessage);

    return {
      ACTION: false,
      CODE: 'ERROR',
      MESSAGE: '系统繁忙，请稍微再试',
      DATA: null,
    };
  },
);

export type Response<T = any> = {
  ACTION: string;
  CODE: 'ok' | string;
  MESSAGE: string;
  DATA: T;
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
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  const params = Object.assign(data, { api_action: url });

  if (method === 'post') {
    return axiosInstance.post('api', qs.stringify(params), config);
  } else {
    return axiosInstance.get('/api', {
      params,
      ...config,
    });
  }
};
