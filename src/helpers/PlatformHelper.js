import { Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

export default class PlatformHelper {
    static getTopSafeHeight = () => {
        if (Platform.OS === 'android') {
            return 0;
        }

        return isIphoneX() ? 44 : 20;
    };

    static getBottomSafeHeight = () => {
        if (Platform.OS === 'android') {
            return 0;
        }

        return isIphoneX() ? 20 : 0;
    };
}
