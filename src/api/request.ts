import type { AxiosRequestConfig, Method } from 'axios';

import axios from 'axios';

import { StatusCode } from '@/constants/status';
import rootRouter from '@/routes';
import { useUserStore } from '@/stores/userStore';

const axiosInstance = axios.create({
  timeout: 6000,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    const { code, message, result } = config.data;

    const pathname = location.pathname.replace(import.meta.env.VITE_ROUTE_BASE_NAME, '');

    if (code === StatusCode.NotLogin && !pathname.includes('login')) {
      // 未登录
      useUserStore.setState({
        isLogin: false,
      });
      rootRouter.navigate(
        `${import.meta.env.VITE_ROUTE_BASE_NAME}/login?from=${encodeURIComponent(pathname + location.search)}`,
        {
          replace: true,
        },
      );
    }
    // 登录但无权限
    else if (code === StatusCode.NoPermission && !pathname.includes('login')) {
      rootRouter.navigate(`${import.meta.env.VITE_ROUTE_BASE_NAME}/`, {
        replace: true,
      });
    }

    return {
      status: code === 200,
      code: code || config?.status,
      message: message,
      result,
    } as any;
  },
  error => {
    let errorMessage = '系统异常';

    if (error?.message?.includes('Network Error')) {
      errorMessage = '网络错误，请检查您的网络';
    } else if (error?.message?.includes('timeout')) {
      errorMessage = '服务器错误，请求超时';
    } else {
      errorMessage = error?.message;
    }

    console.dir(error);
    // error.message && $message.error(errorMessage);

    return {
      status: false,
      code: 500,
      message: errorMessage,
      result: null,
    };
  },
);

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = async <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): MyResponse<T> => {
  // const prefix = '/api'

  let response: any;

  const resolvedMethod = method.replace('data-', '') as Method;

  if (resolvedMethod.includes('get')) {
    response = await axiosInstance.get(url, {
      params: data,
      ...config,
    });
  } else {
    response = await (axiosInstance as any)[resolvedMethod](url, data, config);
  }

  return response;
};
