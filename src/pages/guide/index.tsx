import type { FC } from 'react';

import 'driver.js/dist/driver.min.css';

import { Button, Typography } from 'antd';

import { useLocale } from '@/locales';

import useGuide from './useGuide';

const GuidePage: FC = () => {
  const { formatMessage } = useLocale();
  const { driverStart } = useGuide();

  return (
    <div className="guide-page ">
      <div className="innerText">
        <Typography className="guide-intro">
          {formatMessage({ id: 'app.guide.guideIntro' })}
          <Button
            type="link"
            className="driverjs-link"
            href="https://github.com/kamranahmedse/driver.js"
            rel="noopener noreferrer"
            target="_blank"
          >
            driver.js
          </Button>
          .
        </Typography>
        <Button type="primary" onClick={driverStart}>
          {formatMessage({ id: 'app.guide.showGuide' })}
        </Button>
      </div>
    </div>
  );
};

export default GuidePage;
