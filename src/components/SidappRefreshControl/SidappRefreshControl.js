import React from 'react';
import { RefreshControl } from 'react-native';

const SidappRefreshControl = (props) => {
  return (
    <RefreshControl
      colors={['#fff']}
      {...props}
      progressBackgroundColor="#2CDEE4"
    />
  );
};

export default SidappRefreshControl;
