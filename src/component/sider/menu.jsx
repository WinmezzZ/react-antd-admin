import React from 'react';
import { Menu, Icon } from 'ant';

export default ({data, ...props}) => 
  <Menu {...props}>
    {
      data && data.map((item) => 
      item.children? 
      <Menu.SubMenu
        key={ item.route }
        title={
          <span>
            { item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </span>
        }>
        {
          item.children && item.children.map((each) => 
            <Menu.Item
              key={ each.route }>
              <span>
                { each.icon && <Icon type={each.icon} />}
                { each.name }
              </span>
            </Menu.Item>
          )
        }
      </Menu.SubMenu> :
      <Menu.Item
        key={ item.route }>
        <span>
        { item.icon && <Icon type={item.icon} />}
          <span>{ item.name }</span>
        </span>
      </Menu.Item>
      )
    }
  </Menu>