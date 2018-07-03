import React from 'react';
import { TimePicker } from 'ant';
import moment from 'moment';

function onChange(time, timeString) {
  console.log(time, timeString);
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} style={{marginRight: 20}}/>
        <TimePicker defaultValue={moment('12:08', 'HH:mm')} format={'HH:mm'} />
      </div>
    );
  }
}
