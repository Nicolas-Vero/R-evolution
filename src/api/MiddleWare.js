import React from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {is_pro_signed_in} from "./Pros";

class MiddleWare {
  static validateRequest = (requestMethod, navigation) => {
    return is_pro_signed_in()
      .then(res => requestMethod())
      .catch(async err => {
        const {status} = err.response;
        if (status === 401) {
          Alert.alert(
            "You've logged out.",
            'Please login again. Thank you.',
            {cancelable: false},
          );

          await AsyncStorage.clear();
          navigation.navigate("Auth");
        } else {
          console.warn(`Response: ${JSON.stringify(status)}`);
          return err;
        }
      });
  };
}

export default MiddleWare;
