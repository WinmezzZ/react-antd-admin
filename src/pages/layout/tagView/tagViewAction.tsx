import React, { FC } from 'react'
import { Menu, Dropdown } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { removeTag, removeOtherTag, removeAllTag } from '~/actions/tagsView.action'
import { AppState } from '~/stores'

const TagsViewAction: FC = () => {
  const { activeTagId } = useSelector((state: AppState) => state.tagsViewlReducer)
  const dispatch = useDispatch()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="0" onClick={() => dispatch(removeTag(activeTagId))}>
            关闭当前
          </Menu.Item>
          <Menu.Item key="1" onClick={() => dispatch(removeOtherTag())}>
            关闭其他
          </Menu.Item>
          <Menu.Item key="2" onClick={() => dispatch(removeAllTag())}>
            关闭所有
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={() => dispatch(removeAllTag())}>
            控制台
          </Menu.Item>
        </Menu>
      }
    >
      <SettingOutlined style={{ marginRight: 10 }} />
    </Dropdown>
  )
}

export default TagsViewAction
