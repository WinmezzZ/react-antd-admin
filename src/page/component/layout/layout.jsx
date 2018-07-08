import React from 'react';
import { Layout } from 'ant';
import { observer, inject } from 'mobx-react';

const { Header, Footer, Sider, Content } = Layout;

@inject('tool','size')
@observer
export default class App extends React.Component {
  render() {
    const { mobile } = this.props.size;
    return (
      <Layout style={{color: '#fff'}}>
        <Sider style={{backgroundColor: '#3ba0e9'}} width={mobile ? 100 : 200}>Sider</Sider>
        <Layout>
          <Header style={{backgroundColor: '#7dbcea'}}>Header</Header>
          <Content style={{backgroundColor: 'rgba(16, 142, 233, 1)', height: 200}}>Content</Content>
          <Footer style={{backgroundColor: '#7dbcea'}}>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}