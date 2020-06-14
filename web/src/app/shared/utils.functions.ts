import {Image} from './model/image.model';

export const getProfilePicture = (profilePicture: Image): string => {
  return (profilePicture && profilePicture.downloadUrl) ? profilePicture.downloadUrl : 'assets/img/logo.png';
};
