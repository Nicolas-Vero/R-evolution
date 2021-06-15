import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CustomMainTabBar = props => {
  const {renderIcon, activeTintColor, inactiveTintColor, navigation} = props;
  const displayedButtonsRoutes =
    props.main === true
      ? ['Dashboard']
      : ['SignIn', 'SignUp'];

  return (
    <View
      style={{
        height: 70,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      {navigation.state.routes.map((route, index) => {
        const isRouteActive = navigation.state.index === index;
        let tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        if (index === 1 && [2, 3, 4].includes(navigation.state.index)) {
          // [2, 3, 4] routes refer to global "Buy" nav tab.
          tintColor = activeTintColor;
        }

        return (
          displayedButtonsRoutes.includes(route.key) && (
            <TouchableOpacity
              style={{textAlign: 'center'}}
              key={index}
              title={route.key}
              onPress={() => navigation.navigate(route.key)}>
              <View style={{textAlign: 'center', alignItems: 'center'}}>
                {renderIcon({route, focused: isRouteActive, tintColor})}
              </View>
              <Text style={{color: tintColor}}>{route.key}</Text>
            </TouchableOpacity>
          )
        );
      })}
    </View>
  );
};

export default CustomMainTabBar;
