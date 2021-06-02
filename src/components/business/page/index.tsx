import React, { FC } from 'react';

interface PageProps {}

const Page: FC<PageProps> = props => {
  const { children } = props;
  return <div className="page">{children}</div>;
};

export default Page;
