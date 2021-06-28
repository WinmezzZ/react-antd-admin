import { css } from '@emotion/react';
import { MyResponse } from 'api/request';
import MyTable from 'components/core/table';
import { PageData } from 'interface';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useStates } from 'utils/use-states';
import MyAside, { MyAsideProps } from '../aside';
import MySearch from '../search';

interface SearchApi {
  (params?: any): MyResponse<PageData<any>>;
}

type ParseDataType<S> = S extends (params?: any) => MyResponse<PageData<infer T>> ? T[] : any[];

export interface PageProps<S> {
  searchRender?: React.ReactNode;
  pageApi?: S;
  pageParams?: Record<string, any>;
  tableRender?: (data: ParseDataType<S>) => React.ReactNode;
  asideData?: any[];
  asideKey?: string;
  asideTreeItemRender?: MyAsideProps['titleRender'];
}

export interface PageRef {
  setAsideCheckedKey: (key?: string) => void;
  load: (data?: object) => Promise<void>;
}

const BasePage = forwardRef(
  <S extends SearchApi>(props: React.PropsWithChildren<PageProps<S>>, ref: React.Ref<PageRef>) => {
    const { pageApi, pageParams, searchRender, tableRender, asideKey, asideData, asideTreeItemRender } = props;
    const [pageData, setPageData] = useStates<PageData<ParseDataType<S>[0]>>({
      pageSize: 20,
      pageNum: 1,
      total: 0,
      data: []
    });

    const [asideCheckedKey, setAsideCheckedKey] = useState<string | number>();

    const getPageData = useCallback(
      async (params: Record<string, any> = {}) => {
        if (asideKey && !asideCheckedKey) return;

        if (pageApi) {
          const obj = {
            ...params,
            ...pageParams,
            pageSize: pageData.pageSize,
            pageNum: pageData.pageNum,
            [asideKey!]: asideCheckedKey
          };
          const res = await pageApi(obj);
          if (res.status) {
            setPageData({ total: res.result.total, data: res.result.data });
          }
        }
      },
      [pageApi, pageParams, pageData.pageSize, pageData.pageNum, setPageData, asideKey, asideCheckedKey]
    );

    useEffect(() => {
      getPageData();
    }, [getPageData]);

    const onSearch = (searchParams: Record<string, any>) => {
      getPageData(searchParams);
    };

    const onSelectAsideTree: MyAsideProps['onSelect'] = ([key]) => {
      setAsideCheckedKey(key);
    };

    const onPageChange = (pageNum: number, pageSize?: number) => {
      setPageData({ pageNum });
      if (pageSize) {
        setPageData({ pageSize });
      }
    };

    useImperativeHandle(ref, () => ({
      setAsideCheckedKey,
      load: (data?: object) => getPageData(data)
    }));

    return (
      <div css={styles}>
        {asideData && (
          <MyAside
            checkedKeys={asideCheckedKey ? [asideCheckedKey] : undefined}
            titleRender={asideTreeItemRender}
            onSelect={onSelectAsideTree}
          />
        )}
        <div>
          {searchRender && <MySearch onSearch={onSearch}>{searchRender}</MySearch>}
          {tableRender && (
            <MyTable
              dataSource={pageData.data}
              pagination={{
                current: pageData.pageNum,
                pageSize: pageData.pageSize,
                total: pageData.total,
                onChange: onPageChange
              }}
            >
              {tableRender(pageData.data)}
            </MyTable>
          )}
        </div>
      </div>
    );
  }
);

const MyPge = Object.assign(BasePage, {
  MySearch,
  MyTable,
  MyAside
});

export default MyPge;

const styles = css`
  display: flex;
`;
