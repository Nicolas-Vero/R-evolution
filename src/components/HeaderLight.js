import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';

const {width} = Dimensions.get('window');

class HeaderLight extends React.Component {
    render() {
        const {title, navigation} = this.props;
        return (
            <View style={ defaultStyle.container }>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/icons/header-back.png')} style={defaultStyle.image}/>
                    </TouchableOpacity>
                </View>
                <View style={defaultStyle.textContainer}>
                    <Text style={defaultStyle.text}>{title}</Text>
                </View>
                <View style={{flex: 1}} />
            </View>
        )
    }
}
export default withNavigation(HeaderLight);

const defaultStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:13 ,
        height: 49,
        marginBottom: 29,
        paddingLeft: 16, 
    },
    image: {height: 20.54, width: 12.33, resizeMode: 'contain'},
    textContainer: {alignItems: 'center', flex: 6},
    text: {fontStyle: 'italic', fontWeight: 'bold', fontSize: 20, color: '#FFFFFF', lineHeight: 24}

})