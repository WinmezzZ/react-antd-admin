import React from 'react';
import TableColumn from '../table-column';
import { Table, TableProps } from 'antd';
import { css } from '@emotion/react';

interface MyTableProps<T extends object> extends TableProps<T> {
  height?: string;
}

const MyTable = <T extends object = {}>(props: MyTableProps<T>) => {
  const { height, ...rest } = props;
  console.log(rest);
  return (
    <div style={{ height: height || 'auto' }} css={styles} className="xxx">
      <Table<T> {...rest} scroll={{ x: 'max-content', y: '100%' }} />
    </div>
  );
};

MyTable.defaultProps = {
  pagination: {
    showTotal(total) {
      return `共${total}条`;
    },
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100', '200'],
    pageSize: 20
  }
} as MyTableProps<any>;

MyTable.Column = TableColumn;
MyTable.ColumnGroup = Table.ColumnGroup;

export default MyTable;

const styles = css`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .ant-table-wrapper {
    height: 100%;
  }
`;
