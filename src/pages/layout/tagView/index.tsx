import React, { FC, useEffect } from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import TagsViewAction from './tagViewAction';
import usePrevious from 'hooks/usePrevious';
import { useAppDispatch, useAppState } from 'stores';
import { addTag, removeTag, setActiveTag } from 'stores/tags-view.store';

const { TabPane } = Tabs;

const TagsView: FC = () => {
  const { tags, activeTagId } = useAppState(state => state.tagsView);
  const { menuList, locale } = useAppState(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const prevActiveTagId = usePrevious(activeTagId);

  // onClick tag
  const onChange = (key: string) => {
    dispatch(setActiveTag(key));
  };

  // onRemove tag
  const onClose = (targetKey: string) => {
    dispatch(removeTag(targetKey));
  };

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find(m => m.path === location.pathname);
      if (menu) {
        // Initializes dashboard page.
        const dashboard = menuList[0];
        dispatch(
          addTag({
            path: dashboard.path,
            label: dashboard.label,
            id: dashboard.key,
            closable: false
          })
        );
        // Initializes the tag generated for the current page
        // Duplicate tag will be ignored in redux.
        dispatch(
          addTag({
            path: menu.path,
            label: menu.label,
            id: menu.key,
            closable: true
          })
        );
      }
    }
  }, [dispatch, location.pathname, menuList]);

  useEffect(() => {
    // If current tag id changed, push to new path.
    if (prevActiveTagId !== activeTagId) {
      const tag = tags.find(tag => tag.id === activeTagId) || tags[0];
      navigate(tag.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTagId, prevActiveTagId]);

  return (
    <div id="pageTabs" style={{ background: '#fff', padding: '6px 4px' }}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={onChange}
        activeKey={activeTagId}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) => action === 'remove' && onClose(targetKey as string)}
        tabBarExtraContent={<TagsViewAction />}
      >
        {tags.map(tag => (
          <TabPane tab={tag.label[locale]} key={tag.id} closable={tag.closable} />
        ))}
      </Tabs>
    </div>
  );
};

export default TagsView;
