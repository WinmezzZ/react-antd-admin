import { css } from '@emotion/react';
import { MyResponse } from 'api/request';
import MyTable from 'components/core/table';
import { PageData } from 'interface';
import React, { useCallback, useEffect, useState } from 'react';
import MyAside from '../aside';
import MySearch from '../search';

export type PageType = 'basic' | 'with-search' | 'with-aside' | 'with-nav-tabs' | 'with-common-aside';

type SearchApiType = (params?: any) => MyResponse<PageData<any>>;
interface PageProps<S> {
  type?: PageType;
  searchRender?: React.ReactNode;
  pageApi?: S;
  tableRender?: React.ReactNode;
}

const MyBasePage = <S extends SearchApiType>(props: PageProps<S>) => {
  const { pageApi, searchRender, tableRender } = props;
  console.log(tableRender);

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(20);
  const [data, setData] = useState<S extends (params?: any) => MyResponse<PageData<infer T>> ? T : any>();

  const getPageData = useCallback(async () => {
    if (pageApi) {
      const res = await pageApi();
      console.log(res);
      if (res.status) {
        setPage(res.result.page);
        setRows(res.result.rows);
        setData(res.result.data);
      }
    }
  }, [pageApi]);

  useEffect(() => {
    getPageData();
  }, [getPageData]);

  const onSearch = () => {};
  return (
    <div css={styles}>
      <MyAside />
      <div>
        <MySearch onSearch={onSearch}>{searchRender}</MySearch>
        <MyTable dataSource={data} pagination={{ current: page, pageSize: rows }}>
          {tableRender}
        </MyTable>
      </div>
    </div>
  );
};

const MyPage = Object.assign(MyBasePage, {
  MySearch,
  MyTable,
  MyAside
});

export default MyPage;

const styles = css`
  display: flex;
`;
