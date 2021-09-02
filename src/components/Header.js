import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { withNavigation } from 'react-navigation';

const {width} = Dimensions.get('window');

class Header extends React.Component {
    render() {
        const {title, navigation} = this.props;
        return (
            <View style={ defaultStyle.container }>
                <View style={{flex: 1}}>
                    <TouchableOpacity  style={{paddingLeft:7}} onPress={() => navigation.goBack()}>
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
export default withNavigation(Header);

const defaultStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        height: 49,
        marginBottom: 29
       
    },
    image: {marginLeft:10,height: 20.54, width: 12.33, resizeMode: 'contain'},
    textContainer: {alignItems: 'center', flex: 6},
    text: {  fontStyle: 'italic', fontWeight: '800', fontSize: 22, color: '#FFFFFF', lineHeight: 24}

})