import React, { FC, useState, useEffect, useCallback } from 'react';
import { Modal, Tree, Spin } from 'antd';
import { Role } from 'interface/permission/role.interface';
import { useLocale } from 'locales';
import { getMenuList } from 'api/layout.api';
import usePrevious from 'hooks/usePrevious';
import { TreeNodeNormal } from 'antd/lib/tree/Tree';
import { useAppState } from 'stores';

interface Values extends Role {}

interface RoleModifyDialogProps {
  values: Values;
  visible: boolean;
  onAuthorize: (values: string[]) => void;
  onCancel: () => void;
}

const RoleAuthorizeDialog: FC<RoleModifyDialogProps> = ({ onAuthorize, onCancel, visible, values }) => {
  const { menuList, locale } = useAppState(state => state.user);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [treeData, setTreeData] = useState<TreeNodeNormal[]>([]);
  const { formatMessage } = useLocale();
  const prevRoleId = usePrevious(values.id);
  const prevLocale = usePrevious(locale);

  const onSubmit = async () => {
    onAuthorize(checkedKeys);
  };

  const initData = useCallback(async () => {
    const { result, status } = await getMenuList();
    if (status) {
      // format treeData
      setTreeData(
        result.map(a => ({
          title: a.label[locale],
          key: a.key,
          children: a.children?.map(b => ({
            title: b.label[locale],
            key: b.key
          }))
        }))
      );
    }
  }, [locale]);

  // Set the checkedKeys when the user menu list is loaded
  useEffect(() => {
    if (menuList.length) {
      setCheckedKeys(menuList.map(m => m.key));
    }
  }, [menuList]);

  useEffect(() => {
    // Optimize: Opening a dialog repeatedly will not trigger initData method. #usePrevious hooks
    // Locale changed will trigger initData in any case.
    if ((visible && prevRoleId !== values.id) || prevLocale !== locale) {
      console.log('initData');
      initData();
    }
  }, [initData, visible, prevRoleId, values.id, prevLocale, locale]);

  return (
    <Modal
      title={formatMessage({ id: 'gloabal.tips.authorize' })}
      visible={visible}
      onOk={onSubmit}
      onCancel={onCancel}
    >
      {treeData.length ? (
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={keys => setCheckedKeys(keys as string[])}
          treeData={treeData}
        />
      ) : (
        <Spin />
      )}
    </Modal>
  );
};

export default RoleAuthorizeDialog;
