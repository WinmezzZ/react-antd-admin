import React from 'react';
import Map from 'react-amap/lib/map';
import Marker from 'react-amap/lib/marker';

export default class App extends React.Component {
  render() {
    const position = { latitude: 31.2234400000, longitude: 121.4453000000 };
    return (
      <div style={{width: '100%', height: '400px'}}>
        <Map 
          amapkey={'788e08def03f95c670944fe2c78fa76f'}
          plugins={['MapType','ToolBar']}
          center={position}
          zoom={9.5}>
          <Marker position={position}/>
        </Map>
      </div>
    );
  }
}