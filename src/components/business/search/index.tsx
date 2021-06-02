import React, { FC } from 'react';

interface SearchProps {}

const Search: FC<SearchProps> = props => {
  const { children } = props;
  return <div className="my-search">{children}</div>;
};

export default Search;
