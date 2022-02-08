export default class ContextService {
  static appNavInit = async () => {
    LoggerService.info('Init AppNav ContextService');
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
