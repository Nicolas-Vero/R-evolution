import { Platform } from 'react-native';


export default class PlatformHelper {
    static getTopSafeHeight = () => {
        if (Platform.OS === 'android') {
            return 0;
        }

        return 44;
    };

    static getBottomSafeHeight = () => {
        if (Platform.OS === 'android') {
            return 0;
        }

        return 20;
    };
}
