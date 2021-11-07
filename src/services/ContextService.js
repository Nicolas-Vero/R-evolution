// import Events from 'react-native-simple-events';

export default class ContextService {
  static appNavInit = async () => {
    LoggerService.info('Init AppNav ContextService');

    // const res = await RequestHelper.getMeCheckUpdate();

    // if (res && res.status === 200) {
    //     if (!ContextService.get('profilePicture_uri')) {
    //         // -- on ne set pas la pp si elle à déjà été set ds register
    //         ContextService.updateProfilePictureUri(
    //             !res.content.profilePictureLink ? null : `${res.content.profilePictureLink}/128-0.jpg`,
    //         );
    //     }
    //     ContextService.updateNotificationCount(res.content.notificationCount);
    // }
  };

  static appNavDestroy = async () => {
    LoggerService.info('Destroy AppNav ContextService');

    ContextService.set('profilePicture_uri', null);
    ContextService.set('notification_count', null);
  };

  static set = (key, value) => {
    data[key] = value;
  };

  static get = (key) => {
    return data[key];
  };

  static updateProfilePictureUri = (uri) => {
    ContextService.set('profilePicture_uri', uri);
    // Events.trigger('profilePicture_uri', uri);
  };

  static updateNotificationCount = (count) => {
    ContextService.set('notification_count', Math.max(0, count));
    // Events.trigger('notification_count', Math.max(0, count));
  };
}

let data = {};
