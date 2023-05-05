import type { CSSProperties, ReactNode } from 'react';

import { css } from '@emotion/react';
import { Spin } from 'antd';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import React from 'react';
import { useLocation } from 'react-router-dom';

import ServerErrorPage from '@/pages/500';

const Variants = {
  initial: {
    x: '100%',
  },
  in: {
    x: 0,
  },
  out: {
    x: '-100%',
  },
};

const Transition = {
  type: 'spring',
  mass: 0.2,
  duration: 1,
};

export interface PageProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
  error?: boolean | string;
}

const Page: React.FC<PageProps> = props => {
  const { loading, error, children, className, style } = props;
  const location = useLocation();

  if (error) {
    return <ServerErrorPage message={typeof error === 'string' ? error : undefined} />;
  }

  return (
    <motion.div
      className={clsx('layout-outlet-wrapper h-full', className)}
      css={styles}
      style={style}
      key={location.key}
      initial="initial"
      animate="in"
      exit="out"
      variants={Variants}
      transition={Transition}
    >
      {loading ? <Spin spinning tip="加载中..." size="large" className="layout-outlet-spin"></Spin> : children}
    </motion.div>
  );
};

export default Page;

const styles = css`
  position: relative;
  .layout-outlet-spin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
