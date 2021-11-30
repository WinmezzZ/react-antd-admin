import axios, { CancelTokenSource } from 'axios';
import { useCallback, useEffect, useRef } from 'react';

const CancelToken = axios.CancelToken;

export const useCancelToken = () => {
  const axiosSource = useRef<CancelTokenSource | null>(null);
  const newCancelToken = useCallback(() => {
    axiosSource.current = CancelToken.source();

    return axiosSource.current.token;
  }, []);

  useEffect(
    () => () => {
      if (axiosSource.current) axiosSource.current.cancel();
    },
    [],
  );

  return { newCancelToken, isCancel: axios.isCancel };
};
