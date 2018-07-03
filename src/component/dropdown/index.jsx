import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Dropdown, Icon } from 'ant';
import './index.less';

@inject('size')
@observer
export default class componentName extends React.Component {
  render() {
    const { title, children, linkName, linkUrl } = this.props;
    const { mobile } = this.props.size;
    const overlay = 
      <div 
        className="dropdown-container" 
        style={{ 
          backgroundColor: title && '#fff',
          padding: title && '10px 8px 0 8px',
          width: title && (mobile ? '100vw' : 400) 
          }}>
        <h2>{ title }</h2>
        <div className="dropdown-container-body">
            { children }
        </div>
        { 
          linkName && 
          <div className="dropdown-container-footer">
            <Link to={linkUrl}>{linkName} ></Link>
          </div>
        }
      </div>
    return (
      <Dropdown 
        trigger={[mobile ? 'click' : 'hover']}
        overlay={overlay}>
        <span>
          <Icon type={this.props.icon}/>
        </span>
      </Dropdown>
    )
  }
}
