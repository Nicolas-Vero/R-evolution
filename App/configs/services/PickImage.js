import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Sélectionnez une photo',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const PickImage = (onSuccess, onError) => {
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      onError('User cancelled image picker');
    } else if (response.error) {
      onError('ImagePicker Error: ', response.error);
    } else {
      onSuccess(response);
    }
  });
};

export default PickImage;
