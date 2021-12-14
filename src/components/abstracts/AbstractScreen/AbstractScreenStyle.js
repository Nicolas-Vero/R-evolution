import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929',
    },
    safeAreaView: {
        flex: 1,
    },
    screenAbsoluteContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    statusBarBackgroundStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
});
