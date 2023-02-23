import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import { KEY_ROL } from '@env';
import { AppContext } from '@providers/providerContext';
import fetcher from '@utils/_fetcherFake';
import { getData } from '@utils/_storage';

import { Buttons, Images, Inputs, Texts } from '@components';
import Layout from '@layouts/';
import Btn from './btn';
import styles from './styles';

import { GOOGLE_ID, IOS_ID } from '@env';

import type { Response, User } from '../../interfaces';
import type { SingInScreenProps } from '../types';

type SignInResponse = Response & {
  data: User;
};

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId: GOOGLE_ID,
  offlineAccess: false,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
  accountName: '',
  iosClientId: IOS_ID,
  googleServicePlistPath: '',
  openIdRealm: '',
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

const SignInScreen = ({ navigation }: SingInScreenProps): JSX.Element => {
  const { authContext, setUser } = useContext(AppContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: unknown) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const logged = async ({ token, ...rest }: User) => {
      const { email_verified_at, ...user } = rest;
      if (email_verified_at) {
        setUser(user);
        authContext.signIn(token);
        const userRol = await getData(KEY_ROL);
        if (userRol !== null) {
          navigation.navigate('Profile');
        }
        navigation.navigate('Roles');
      } else {
        navigation.navigate('Suscriptions');
      }
      setLoading(null);
    },
    logIn = async (url?: string) => {
      setLoading(url);
      await fetcher({
        method: 'post',
        url,
        data: {
          email,
          password,
        },
      }).then(async ({ data, status }: SignInResponse) => {
        if (data && status >= 200 && status < 300) {
          logged(data);
        }
      });
    },
    logInFacebook = async (url?: string) => {
      setLoading(url);
      const result = await LoginManager.logInWithPermissions([
        'id',
        'email',
        'name',
        'picture',
      ]);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      if (data?.accessToken) {
        const { accessToken, ...rest } = data;
        console.log({ token: accessToken, rest });
      }
    },
    logInApple = async (url?: string) => {
      setLoading(url);
      const nonce = uuid();
      const state = uuid();
      try {
        // Initialize the module
        appleAuthAndroid.configure({
          // The Service ID you registered with Apple
          clientId: 'com.maiti',
          // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
          // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
          redirectUri: 'https://maiti.app/auth/callback',
          // [OPTIONAL]
          // Scope.ALL (DEFAULT) = 'email name'
          // Scope.Email = 'email';
          // Scope.Name = 'name';
          scope: appleAuthAndroid.Scope.ALL,
          // [OPTIONAL]
          // ResponseType.ALL (DEFAULT) = 'code id_token';
          // ResponseType.CODE = 'code';
          // ResponseType.ID_TOKEN = 'id_token';
          responseType: appleAuthAndroid.ResponseType.ALL,
          // [OPTIONAL]
          // A String value used to associate a client session with an ID token and mitigate replay attacks.
          // This value will be SHA256 hashed by the library before being sent to Apple.
          // This is required if you intend to use Firebase to sign in with this credential.
          // Supply the response.id_token and rawNonce to Firebase OAuthProvider
          nonce,
          // [OPTIONAL]
          // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
          state,
        });
        console.log('appleAuthAndroid', appleAuthAndroid.configure);
        const response = await appleAuthAndroid.signIn();
        if (response) {
          const code = response.code; // Present if selected ResponseType.ALL / ResponseType.CODE
          const id_token = response.id_token; // Present if selected ResponseType.ALL / ResponseType.ID_TOKEN
          const user = response.user; // Present when user first logs in using appleId
          const state = response.state; // A copy of the state value that was passed to the initial request.
          console.log('Got auth code', code);
          console.log('Got id_token', id_token);
          console.log('Got user', user);
          console.log('Got state', state);
        }
      } catch (error: any) {
        if (error && error.message) {
          switch (error.message) {
            case appleAuthAndroid.Error.NOT_CONFIGURED:
              console.log('appleAuthAndroid not configured yet.');
              break;
            case appleAuthAndroid.Error.SIGNIN_FAILED:
              console.log('Apple signin failed.');
              break;
            case appleAuthAndroid.Error.SIGNIN_CANCELLED:
              console.log('User cancelled Apple signin.');
              break;
            default:
              break;
          }
        }
      }
      setLoading();
    },
    logInGoogle = async (url?: string) => {
      setLoading(url);
      try {
        await GoogleSignin.hasPlayServices();
        const response: any = await GoogleSignin.signIn();
        const {
          idToken,
          user: { email, id, name },
        } = response;
        logged({ token: idToken, email, id, name, email_verified_at: true });
      } catch (error: any) {
        console.log(error);
      }
    };

  return (
    <Layout>
      <View style={styles.container}>
        <Images.Default
          style={styles.logo}
          source={require('@assets/img/Maiti.png')}
        />
        <KeyboardAvoidingView behavior="padding">
          <View>
            <Texts.Default
              text="Log in to Maiti"
              variant="bold"
              size="biggest"
              style={styles.heagingText}
            />
          </View>
          <View style={styles.inputContainer}>
            <Inputs.Icon
              onChangeText={setEmail}
              placeholder="Email Address"
              value={email}
              style={styles.input}
            />
            <Inputs.Icon
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              style={styles.input}
              containerStyle={styles.spacer}
              secureTextEntry={!showPassword}
              iconRight={{
                name: showPassword ? 'eye-slash' : 'eye',
                onPress: () => setShowPassword(!showPassword),
              }}
            />
            <Btn
              backgroundColor="purple700"
              icon="key"
              loading={Boolean(loading === 'login')}
              title="Email"
              onPress={() => logIn('login')}
            />
            {appleAuthAndroid.isSupported && (
              <Btn
                backgroundColor="slate700"
                icon="apple"
                loading={Boolean(loading === 'apple')}
                title="Apple"
                onPress={() => logInApple('apple')}
              />
            )}
            <Btn
              backgroundColor="sky600"
              icon="facebook"
              loading={Boolean(loading === 'facebook')}
              title="Facebook"
              onPress={() => logInFacebook('facebook')}
            />
            <Btn
              backgroundColor="yellow600"
              icon="google"
              loading={Boolean(loading === 'google')}
              title="Google"
              onPress={() => logInGoogle('google')}
            />
          </View>
        </KeyboardAvoidingView>
        <Buttons.Simple
          title="Olvidateste tu contraseña"
          color="red800"
          onPress={() => navigation.navigate('Register')}
        />
        <Buttons.Simple
          title="Aun no tienes cuenta? Registrate"
          color="red800"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </Layout>
  );
};

export default SignInScreen;
