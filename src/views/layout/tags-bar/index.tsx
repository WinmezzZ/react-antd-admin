import { Tabs } from 'antd';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { addTag, removeTag, setActiveTag } from '~/store/tags-bar.store';

import TagsViewAction from './tags-bar-action';

const { TabPane } = Tabs;

const TagsBar: FC = () => {
  const { tags, activeTagId } = useSelector(state => state.tags);
  const { navMenuList } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // onClick tag
  const onChange = (key: string) => {
    const tag = tags.find(tag => tag.key === key);

    if (tag) {
      setCurrentTag(tag.key);
      navigate(tag.path);
    }
  };

  // onRemove tag
  const onClose = (targetKey: string) => {
    dispatch(removeTag(targetKey));
  };

  const setCurrentTag = useCallback(
    (id?: string) => {
      const tag = tags.find(item => {
        if (id) {
          return item.key === id;
        } else {
          return item.path === location.pathname;
        }
      });

      if (tag) {
        dispatch(setActiveTag(tag.key));
      }
    },
    [dispatch, location.pathname, tags],
  );

  useEffect(() => {
    if (navMenuList.length) {
      console.log(navMenuList, location.pathname);
      const menu = navMenuList.find(m => m.path === location.pathname);

      if (menu) {
        // Initializes dashboard page.
        const dashboard = navMenuList[0];

        dispatch(
          addTag({
            path: dashboard.path,
            title: dashboard.title,
            key: dashboard.key,
            closable: false,
          }),
        );
        // Initializes the tag generated for the current page
        // Duplicate tag will be ignored in redux.
        dispatch(
          addTag({
            path: menu.path,
            title: menu.title,
            key: menu.key,
            closable: true,
          }),
        );
      }
    }
  }, [dispatch, location.pathname, navMenuList]);

  //fix: remove tab route back auto
  useEffect(() => {
    if (tags && activeTagId) {
      const target = tags.filter(e => e.key === activeTagId);

      navigate(target[0].path);
    }
  }, [tags, activeTagId, navigate]);

  return (
    <div id="pageTabs" className="bg-2" style={{ padding: '6px 4px' }}>
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
          <TabPane tab={tag.title} key={tag.key} closable={tag.closable} />
        ))}
      </Tabs>
    </div>
  );
};

export default TagsBar;
