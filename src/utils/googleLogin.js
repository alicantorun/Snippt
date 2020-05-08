import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '1003166268450-uri82no715tab9omkqj6sirdveocf9ol.apps.googleusercontent.com', // From Firebase Console Settings
});
import { persistItemInStorage } from '~/utils/AsyncStorageManager';

import CONSTANTS from '~/utils/CONSTANTS';

import firestore from '@react-native-firebase/firestore';

const ref = firestore().collection('users');

export default async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  const accessToken = idToken;

  // Sign-in the user with the credential
  const response = await auth().signInWithCredential(googleCredential);

  await ref.doc(response.user.uid).set({
    email: response.user.email,
    displayName: response.user.displayName,
    photoUrl: response.user.photoURL,
    phoneNumber: response.user.phoneNumber,
  });

  await persistItemInStorage(
    CONSTANTS.KEYS.GOOGLE_CREDENTIAL_ACCESS_TOKEN,
    accessToken,
  );

  const userId = response.user.uid;

  await persistItemInStorage(CONSTANTS.KEYS.USER_ID, userId);
}
