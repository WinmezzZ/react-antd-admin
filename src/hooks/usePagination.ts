import { useEffect, useState } from 'react';

import { MyResponse } from '~/api/request';
import { Pagination } from '~/interface/common/pagination.interface';

interface ApiMethod<K = any, V = any> {
  (...arg: any[]): MyResponse<Pagination<K, V>>;
}

type TableDataItem<T> = T extends MyResponse<Pagination<any, Array<infer R>>> ? R : unknown;

interface UseTableOptions<T extends ApiMethod> {
  apiMethod: T;
  apiParams?: Parameters<T>[0];
  resultListKeyPath: string;
  pageSize?: number;
  pageNum?: number;
}

export function useTable<T extends ApiMethod>(options: UseTableOptions<T>) {
  const { apiMethod, apiParams = {}, resultListKeyPath } = options;
  const [pageSize, setPageSize] = useState(options.pageSize || 20);
  const [pageNum, setPageNum] = useState(options.pageNum || 1);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState<TableDataItem<ReturnType<T>>[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async (currentPage = pageNum, currentSize = pageSize) => {
    setLoading(true);
    const res = await apiMethod({
      _pageNumber: currentPage,
      _pageSize: currentSize,
      ...apiParams,
    });

    setLoading(false);
    if (res.CODE === 'ok') {
      setTableData(res.DATA[resultListKeyPath]);
      setTotal(res.DATA.TotalCount);
    }
  };

  const onTableChange = (currentPage: number, pageSize: number) => {
    setPageNum(currentPage);
    setPageSize(pageSize);
    getData(currentPage);
  };

  useEffect(() => {
    getData();
  }, [pageSize, pageNum]);

  return {
    onTableChange,
    loading,
    tableData,
    setTableData,
    panination: {
      currentPage: pageNum,
      pageSize: pageSize,
      total,
      onChange: onTableChange,
      showSizeChanger: true,
      showTotal: (all: number) => `共（${all}）条`,
      showQuickJumper: true,
    },
  };
}
