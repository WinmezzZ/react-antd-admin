import React from 'react';
import Loadable from 'react-loadable';

export default function withLoadable (comp) {
  return Loadable({
    loader: comp,
    loading: () => <h1 style={{textAlign: 'center', marginTop: 300}}>Loading...</h1>,
    delay: 200
  })
}