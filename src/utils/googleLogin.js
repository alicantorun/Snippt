import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '1003166268450-uri82no715tab9omkqj6sirdveocf9ol.apps.googleusercontent.com', // From Firebase Console Settings
});

export default async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  console.log(googleCredential);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
