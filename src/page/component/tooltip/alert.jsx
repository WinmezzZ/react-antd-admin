import React from 'react';
import { Alert } from 'ant';

export default () => 
  <div>
    <Alert message="Success Text" type="success" showIcon closable/>
    <Alert message="Info Text" type="info" closable/>
    <Alert message="Warning Text" type="warning" closable/>
    <Alert message="Error" description="This is an error message about copywriting." type="error" showIcon closable/>
    <style>{`
      .ant-alert {
        margin-bottom: 16px;
      }
    `}</style>
  </div>