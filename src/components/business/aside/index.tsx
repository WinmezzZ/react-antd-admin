import { FC } from 'react';
import { Divider, Tree, TreeProps } from 'antd';
import { DataNode } from 'rc-tree/lib/interface';
import { css } from '@emotion/react';

export interface MySideOption extends DataNode {}

export interface MyAsideProps extends Omit<TreeProps, 'treeData'> {
  options?: MySideOption[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const MyAside: FC<MyAsideProps> = props => {
  const { options, header, footer, ...rest } = props;

  return (
    <div css={styles} className="bg-2">
      {header && (
        <div className="header">
          {header}
          <Divider />
        </div>
      )}
      <Tree {...rest} treeData={options} blockNode />
      {footer && (
        <div className="footer">
          <Divider />
          {footer}
        </div>
      )}
    </div>
  );
};

export default MyAside;

const styles = css`
  padding: 8px;
  margin-right: 8px;
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header,
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ant-tree {
    margin-top: 12px;
    flex: 1;
    .ant-tree-node-content-wrapper {
      line-height: 28px;
    }
  }
`;
