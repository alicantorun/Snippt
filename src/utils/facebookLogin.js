import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import { persistItemInStorage } from '~/utils/AsyncStorageManager';

import CONSTANTS from '~/utils/CONSTANTS';

import firestore from '@react-native-firebase/firestore';

const ref = firestore().collection('users');

export default async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  const accessToken = data.accessToken;

  // Sign-in the user with the credential
  const response = await auth().signInWithCredential(facebookCredential);

  await ref.doc(response.user.uid).set({
    email: response.user.email,
    displayName: response.user.displayName,
    photoUrl: response.user.photoURL,
    phoneNumber: response.user.phoneNumber,
  });

  await persistItemInStorage(
    CONSTANTS.KEYS.FACEBOOK_CREDENTIAL_ACCESS_TOKEN,
    accessToken,
  );

  const userId = response.user.uid;

  await persistItemInStorage(CONSTANTS.KEYS.USER_ID, userId);
}
