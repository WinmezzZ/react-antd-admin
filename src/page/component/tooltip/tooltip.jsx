import React from 'react';
import { Row, Col, Tooltip, Button, Popconfirm } from 'ant';

const text = <span>提示：</span>;

const buttonWidth = 56;

export default class App extends React.Component {
  render() {
    return (
      <Row gutter={10}>
        <Col md={12}>
          <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
            <Tooltip placement="topLeft" title={text}>
              <Button>上左</Button>
            </Tooltip>
            <Tooltip placement="top" title={text}>
              <Button>上</Button>
            </Tooltip>
            <Tooltip placement="topRight" title={text}>
              <Button>上右</Button>
            </Tooltip>
          </div>
          <div style={{ width: buttonWidth, float: 'left' }}>
            <Tooltip placement="leftTop" title={text}>
              <Button>左上</Button>
            </Tooltip>
            <Tooltip placement="left" title={text}>
              <Button>左</Button>
            </Tooltip>
            <Tooltip placement="leftBottom" title={text}>
              <Button>左下</Button>
            </Tooltip>
          </div>
          <div style={{ width: buttonWidth, marginLeft: (buttonWidth * 3) + 24 }}>
            <Tooltip placement="rightTop" title={text}>
              <Button>右上</Button>
            </Tooltip>
            <Tooltip placement="right" title={text}>
              <Button>右</Button>
            </Tooltip>
            <Tooltip placement="rightBottom" title={text}>
              <Button>右下</Button>
            </Tooltip>
          </div>
          <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
            <Tooltip placement="bottomLeft" title={text}>
              <Button>下左</Button>
            </Tooltip>
            <Tooltip placement="bottom" title={text}>
              <Button>下</Button>
            </Tooltip>
            <Tooltip placement="bottomRight" title={text}>
              <Button>下右</Button>
            </Tooltip>
          </div>
        </Col>
        <Col md={12}>
          <h3>可丰富内容</h3>
          <Popconfirm title="确定要删除吗？" okText="是" cancelText="否">
            <Button>删除</Button>
          </Popconfirm>
        </Col>
      </Row>
    );
  }
}