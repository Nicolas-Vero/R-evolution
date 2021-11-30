import React from 'react';
import { RefreshControl } from 'react-native';

const SidappRefreshControl = (props) => {
  return (
    <RefreshControl
      colors={['#fff']}
      {...props}
      progressBackgroundColor="red"
    />
  );
};

export default SidappRefreshControl;
