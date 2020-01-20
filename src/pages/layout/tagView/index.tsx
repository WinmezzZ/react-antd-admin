import React, { FC, useEffect } from 'react'
import { Tabs } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '~/stores'
import { setActiveTag, removeTag, addTag } from '~/actions/tagsView.action'
import { useHistory } from 'react-router-dom'
import TagsViewAction from './tagViewAction'

const { TabPane } = Tabs

const TagsView: FC = () => {
  const { menuList } = useSelector((state: AppState) => state.globalReducer)
  const { tags, activeTagId } = useSelector((state: AppState) => state.tagsViewlReducer)
  const dispatch = useDispatch()
  const history = useHistory()

  const onTagChange = (key: string) => {
    const tag = tags.find(tag => tag.id === key)
    tag && history.push(tag.path)
  }

  const onChange = (key: string) => {
    dispatch(setActiveTag(key))
    onTagChange(key)
  }

  const onClose = (targetKey: string) => {
    dispatch(removeTag(targetKey))
    onTagChange(targetKey)
  }

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find(m => m.path === history.location.pathname) || menuList[0]
      dispatch(
        addTag({
          path: menu.path,
          label: menu.label,
          id: menu.key
        })
      )
    }
  }, [dispatch, history.location.pathname, menuList])

  // useEffect(() => {
  //   const tag = tags.find(tag => tag.id === activeTagId) || tags[0]
  //   history.push(tag.path)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activeTagId])

  return (
    <div>
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
          <TabPane tab={tag.label} key={tag.id} closable={tag.closable} />
        ))}
      </Tabs>
    </div>
  )
}

export default TagsView
