import React from 'react'
import { common } from '@/api'
import { Tree, Layout } from 'antd';
const TreeNode = Tree.TreeNode;
const Sider = Layout.Sider;

class TreeNav extends React.Component {
  state = {
    treeData: [
      { title: '上海市', key: '310000' },
      { title: '江苏省', key: '320000' },
      { title: '浙江省', key: '330000' }
    ],
    level: 1
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });
  }
  onLoadData = (treeNode) => {
    return new Promise(async(resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      const res = await common({
        tradeCode: 'area.selectByPrimaryKey',
        fUpbrno: treeNode.props.eventKey
      });
      var list = res.listInfo.map(item => 
        ({ title: item.label, key: item.id , isLeaf:  item.fLevel === '5'&&true})
      );
      treeNode.props.dataRef.children = list;
      this.setState({
        treeData: [...this.state.treeData]
      });
      resolve();
    })
  }
  render() {
    return (
      <Sider className="main-sider" width={160}>
        <div className="guide-word" style={{color: '#333', fontSize: '15px', fontWeight: 'bold'}}>站点导航</div>  
        <Tree loadData={this.onLoadData} defaultExpandedKeys={["china"]}>
          {this.renderTreeNodes(this.state.treeData)}
        </Tree>
      </Sider> 
    );
  }
}

export default TreeNav