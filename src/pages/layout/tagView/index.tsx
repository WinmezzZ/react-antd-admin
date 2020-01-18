import React, { FC, useEffect } from 'react'
import { Tabs } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '~/stores'
import { setActiveTag, removeTag } from '~/actions/tagsView.action'
import { useHistory } from 'react-router-dom'
import TagsViewAction from './tagViewAction'

const { TabPane } = Tabs

const TagsView: FC = () => {
  const { tags, activeTagId } = useSelector((state: AppState) => state.tagsViewlReducer)
  const dispatch = useDispatch()
  const history = useHistory()

  const onChange = (key: string) => {
    dispatch(setActiveTag(key))
  }

  const onClose = (targetKey: string) => {
    dispatch(removeTag(targetKey))
  }

  useEffect(() => {
    const tag = tags.find(tag => tag.id === activeTagId) || tags[0]
    history.push(tag.path)
  }, [activeTagId, history, tags])

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
