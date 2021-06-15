import React from 'react';
import {ScrollView, View, Dimensions, KeyboardAvoidingView} from 'react-native';

export default class Content extends React.Component {
    render() {
        const style = this.props.style ? this.props.style : [];
        if (this.props.keyboardAvoidingView) {
            return (
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    <View behavior={'position'} enabled={true} style={[styles.container, style]}>
                        {this.props.children}
                    </View>
                </ScrollView>
            );
        }
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={[styles.container, style]}>
                    {this.props.children}
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        // minHeight: Dimensions.get('window').height - 40
    }
};
