import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getStore } from '@/utils';

export default ({ component: Component, ...rest }) => (
  class extends Component {
    constructor(props){
      super(props);
      this.state = {
        isLogin : false, 
      };
    }
    
    componentDidMount() {
      this.setState({
        isLogin: getStore('isLogin')
      })
      
    }
    
    render() {
       <Route {...rest} render={props => (
        this.state.isLogin ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
      )}/>
     }
  }
)