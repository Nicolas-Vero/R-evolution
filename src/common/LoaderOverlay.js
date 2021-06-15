import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class LoaderOverlay extends React.Component {

    render() {

        return (
            <View style={styles.blackOverlay}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={'#00D168'} animating={true} size={'large'} />
                    <Text style={{ color: 'white' }}>{this.props.children}</Text>
                </View>
            </View>
        )
        
    }
}

const styles = {
	blackOverlay: {
		height: hp('110%'),
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.75)',
		zIndex: 9999,
		justifyContent: 'center',
		alignItems: 'center'
	},
};