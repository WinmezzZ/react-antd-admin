import { FC, useCallback, useEffect } from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import TagsViewAction from './tagViewAction';
import { useDispatch, useSelector } from 'react-redux';
import { addTag, removeTag, setActiveTag } from '@/stores/tags-view.store';

const TagsView: FC = () => {
  const { tags, activeTagId } = useSelector(state => state.tagsView);
  const { menuList, locale } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // onClick tag
  const onChange = (key: string) => {
    const tag = tags.find(tag => tag.path === key);

    if (tag) {
      setCurrentTag(tag.path);
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
    navigate(activeTagId);
  }, [activeTagId]);

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find(m => m.path === location.pathname);

      if (menu) {
        dispatch(
          addTag({
            ...menu,
            closable: menu.code !== 'dashboard',
          }),
        );
      }
    }
  }, [dispatch, location.pathname, menuList]);

  return (
    <div id="pageTabs" style={{ padding: '6px 4px', display: 'none' }}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={onChange}
        activeKey={activeTagId}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) => action === 'remove' && onClose(targetKey as string)}
        tabBarExtraContent={<TagsViewAction />}
        items={tags.map(tag => {
          return {
            key: tag.path,
            closable: tag.closable,
            label: tag.label[locale],
          };
        })}
      />
    </div>
  );
};

export default TagsView;
