import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';

const {width} = Dimensions.get('window');

class HeaderSimple extends React.Component {
    render() {
        const {title, navigation} = this.props;
        return (
            <View style={ defaultStyle.container }>
                <View style={defaultStyle.textContainer}>
                    <Text style={defaultStyle.text}>{title}</Text>
                </View>
               
            </View>
        )
    }
}
export default withNavigation(HeaderSimple);

const defaultStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center',
        width: width,
        height: 49,
        marginBottom: 29
       
    },
    image: {marginLeft:10,height: 20.54, width: 12.33, resizeMode: 'contain'},
    textContainer: {alignItems: 'center',alignSelf:'center', flex: 1},
    text: {  fontStyle: 'italic', fontWeight: '800', fontSize: 22, color: '#FFFFFF', lineHeight: 24}

})