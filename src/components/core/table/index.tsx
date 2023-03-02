import type { TableProps } from 'antd';

import { css } from '@emotion/react';
import { Table } from 'antd';

import TableColumn from '../table-column';

interface MyTableProps<T extends object> extends TableProps<T> {
  height?: string;
}

const MyTable = <T extends object = object>(props: MyTableProps<T>) => {
  const { height, pagination, ...rest } = props;

  const defaultPagination = {
    size: 'default',
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100', '200'],
    defaultPageSize: 20,
  };

  const combinedPagination = typeof pagination === 'object' ? { ...defaultPagination, ...pagination } : {};

  return (
    <div style={{ height }} css={styles}>
      <Table<T> {...rest} scroll={{ x: 'max-content', y: '100%' }} pagination={combinedPagination} />
    </div>
  );
};

MyTable.defaultProps = {
  size: 'small',
  height: 'auto',
} as MyTableProps<any>;

MyTable.Column = TableColumn;
MyTable.ColumnGroup = Table.ColumnGroup;

export default MyTable;

const styles = css`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .ant-table-wrapper,
  .ant-spin-nested-loading,
  .ant-spin-container,
  .ant-table-container {
    height: 100%;
  }
  .ant-spin-container {
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .ant-table {
      flex: 1;
      overflow: hidden;
      border-bottom: 1px solid #eee;

      .ant-table-container {
        display: flex;
        flex-direction: column;
        .ant-table-body {
          flex: 1;
          table {
            height: 100%;
          }
        }
      }
    }

    .ant-pagination {
      padding: 0 10px;
    }
  }
`;
