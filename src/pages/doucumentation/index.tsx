import type { FC } from 'react';

import { Typography } from 'antd';

import { LocaleFormatter } from '@/locales';

const { Title, Paragraph } = Typography;

const div = <div style={{ height: 200 }}>2333</div>;

const DocumentationPage: FC = () => {
  return (
    <div>
      <Typography className="innerText">
        <Title>
          <LocaleFormatter id="app.documentation.introduction.title" />
        </Title>
        <Paragraph>
          <LocaleFormatter id="app.documentation.introduction.description" />
        </Paragraph>
        <Title>
          <LocaleFormatter id="app.documentation.catalogue.title" />
        </Title>
        <Paragraph>
          <LocaleFormatter id="app.documentation.catalogue.description" />
        </Paragraph>
        <Paragraph>
          <ul>
            <li>
              <a href="#layout">
                <LocaleFormatter id="app.documentation.catalogue.list.layout" />
              </a>
            </li>
            <li>
              <a href="#routes">
                <LocaleFormatter id="app.documentation.catalogue.list.routes" />
              </a>
            </li>
            <li>
              <a href="#request">
                <LocaleFormatter id="app.documentation.catalogue.list.request" />
              </a>
            </li>
            <li>
              <a href="#theme">
                <LocaleFormatter id="app.documentation.catalogue.list.theme" />
              </a>
            </li>
            <li>
              <a href="#typescript">
                <LocaleFormatter id="app.documentation.catalogue.list.typescript" />
              </a>
            </li>
            <li>
              <a href="#international">
                <LocaleFormatter id="app.documentation.catalogue.list.international" />
              </a>
            </li>
          </ul>
        </Paragraph>
        <Title id="layout" level={2}>
          <LocaleFormatter id="app.documentation.catalogue.list.layout" />
        </Title>
        <Paragraph>{div}</Paragraph>
        <Title id="routes" level={2}>
          <LocaleFormatter id="app.documentation.catalogue.list.routes" />
        </Title>
        <Paragraph>{div}</Paragraph>
        <Title id="request" level={2}>
          <LocaleFormatter id="app.documentation.catalogue.list.request" />
        </Title>
        <Paragraph>{div}</Paragraph>
        <Title id="theme" level={2}>
          <LocaleFormatter id="app.documentation.catalogue.list.theme" />
        </Title>
        <Paragraph>{div}</Paragraph>
        <Title id="typescript" level={2}>
          <LocaleFormatter id="app.documentation.catalogue.list.typescript" />
        </Title>
        <Paragraph>{div}</Paragraph>
        <Title id="international" level={2}>
          <LocaleFormatter id="app.documentation.catalogue.list.international" />
        </Title>
        <Paragraph>{div}</Paragraph>
      </Typography>
    </div>
  );
};

export default DocumentationPage;
