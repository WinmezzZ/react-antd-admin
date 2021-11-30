import { Tabs } from 'antd';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { addTag, removeTag, setActiveTag } from '~/store/tags-bar.store';

import TagsViewAction from './tags-bar-action';

const { TabPane } = Tabs;

const TagsBar: FC = () => {
  const { tags, activeTagPath } = useSelector(state => state.tags);
  const { menuList } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // onClick tag
  const onChange = (key: string) => {
    const tag = tags.find(tag => tag.path === key);

    if (tag) {
      setCurrentTag(tag.path);
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
          return item.path === id;
        } else {
          return item.path === location.pathname;
        }
      });

      if (tag) {
        dispatch(setActiveTag(tag.path));
      }
    },
    [dispatch, location.pathname, tags],
  );

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find(m => m.path === location.pathname);

      console.log(menuList, menu);
      if (menu) {
        dispatch(
          addTag({
            ...menu,
            closable: true,
          }),
        );
      }
    }
  }, [dispatch, location.pathname, menuList]);

  //fix: remove tab route back auto
  // useEffect(() => {
  //   if (tags && activeTagPath) {
  //     const target = tags.find(e => e.path === activeTagPath);

  //     if (target && location.pathname !== target.path) {
  //       console.log(target.path);
  //       // navigate(target.path);
  //     }
  //   }
  // }, [tags, activeTagPath, navigate]);

  return (
    <div id="pageTabs" className="bg-2" style={{ padding: '6px 4px' }}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={onChange}
        activeKey={activeTagPath}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) => action === 'remove' && onClose(targetKey as string)}
        tabBarExtraContent={<TagsViewAction />}
      >
        {tags.map(tag => (
          <TabPane tab={tag.title} key={tag.path} closable={tag.closable} />
        ))}
      </Tabs>
    </div>
  );
};

export default TagsBar;
