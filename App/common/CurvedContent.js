import React from "react";
import {Content} from "native-base";
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default class CurvedContent extends React.Component {
  render() {
    return (
      <Content style={styles.content}>
        {this.props.children}
      </Content>
    );
  }
}

const styles = {
  content: {
    flex: 1,
    position: 'relative',
    minHeight: height,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white"
  }
};