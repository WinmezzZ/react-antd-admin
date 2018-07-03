import React from 'react';

export default function Loading({ isLoading, pastDelay, error }) {
  if (isLoading && pastDelay) {
    return <h1>Loading...</h1>;
  } else if (error && !isLoading) {
    return <h1>Error!</h1>;
  } else {
    return null;
  }
}