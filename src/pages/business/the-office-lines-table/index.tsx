import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Row, Select, Space, Table, theme, TreeSelect } from 'antd';
import axios from 'axios';
import { css } from '@emotion/react';
import table_data from './data.json'; // Adjust the path as needed
import season_episode_data from './season_episode.json';

// const styles = css`
//   display: flex;
//   flex-direction: column;
//   .tabs-main {
//     flex: 1;
//     display: flex;
//     overflow: hidden;
//   }
//   .search {
//     margin-bottom: 10px;
//   }

//   .aside-main {
//     display: flex;
//     flex: 1;
//     overflow: hidden;
//     flex-direction: column;
//     @media screen and (max-height: 800px) {
//       overflow: auto;
//     }
//   }

//   .table {
//     flex: 1;
//     overflow: hidden;
//     @media screen and (max-height: 800px) {
//       overflow: auto;
//       min-height: 500px;
//     }
//   }
// `;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const columns = [
  {
    title: 'Season',
    dataIndex: 'season',
    key: 'season',
  },
  {
    title: 'Episode',
    dataIndex: 'episode',
    key: 'episode',
  },
  {
    title: 'Title',
    dataIndex: 'episode_name',
    key: 'episode_name',
  },
  {
    title: 'director',
    dataIndex: 'director',
    key: 'director',
  },
  {
    title: 'writer',
    dataIndex: 'writer',
    key: 'writer',
  },
  {
    title: 'character',
    dataIndex: 'character',
    key: 'character',
  },
  {
    title: 'text',
    dataIndex: 'text',
    key: 'text',
  },
];

// Define the type for your JSON data
type DataSourceItem = {
  season: number;
  episode: number;
  title: string;
  scene: number;
  speaker: string;
  line: string;
  key: number;
};

const data = table_data as DataSourceItem[];
const season_episode = season_episode_data as any;

const App: React.FC = () => {
  const [tableData, setTableData] = useState(data);

  const onChange = (newValue: string) => {
    if (newValue.length > 1) {
      const parts = newValue.split('-');
      const season = Number(parts[0]);
      const episode = Number(parts[1]);
      const new_tableData = data.filter(item => item.season == season && item.episode == episode);
      setTableData(new_tableData);
    }
  };
  return (
    <div>
      <>
        <Row>
          <Col span={24}>
            <TreeSelect defaultValue="1" style={{ width: 720 }} treeData={season_episode} onChange={onChange} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={{ pageSizeOptions: [10, 50, 100, 1000] }} // Optional pagination
            />
          </Col>
        </Row>
      </>
    </div>
  );
};

export default App;
