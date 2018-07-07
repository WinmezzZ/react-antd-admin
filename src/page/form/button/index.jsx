import React from 'react';
import { Row, Col, Card } from 'ant';
import Base from './base';
import Size from './size';
import Loading from './loading';
import Icon from './icon';
import './index.less';

export default class App extends React.Component {
  state = {
    tabItems: ['a' ,'b' ,'c'],
    index: 0,
    width: 100
  }
  onclick = (e, index) => {
    const width = parseInt(getComputedStyle(e.currentTarget).left) + 100
    this.setState({
      width,
      index
    })
  }
  render() {
    return (
      <div>
        <ul className="tabbar">
            {
              this.state.tabItems.map((item,index) => 
                <li className={this.state.index === index ? 'this' : ''} key={index} onClick={(e) => this.onclick(e, index)}>{item}</li>
              )
            }
          </ul>
          <div className="underline" style={{width: this.state.width}}></div>
      </div>
    )
  }
}
