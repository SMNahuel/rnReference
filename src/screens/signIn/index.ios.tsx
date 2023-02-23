import {
  AppleRequestResponse,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { AuthenticationToken, LoginManager } from 'react-native-fbsdk-next';

import { sha256 } from 'react-native-sha256';

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
  const [loading, setLoading] = useState(null);
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
      })
        .then(async ({ data, status }: SignInResponse) => {
          if (data && status >= 200 && status < 300) {
            logged(data);
          }
        })
        .finally(() => setLoading(null));
    },
    logInFacebook = async (url?: string) => {
      setLoading(url);
      const nonce = '123456';
      const nonceSha256 = await sha256(nonce);
      const result = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'limited',
        nonceSha256,
      );
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      const data = await AuthenticationToken.getAuthenticationTokenIOS();
      if (!data) {
        throw 'Something went wrong obtaining authentication token';
      }
      setLoading();
      if (data?.authenticationToken) {
        /*
        "accessToken": "EAAnzQZBqFy0EBADlxcXmq7V9qdUIOyyXiPlqtQq3HkIFjlO4vzTLEo5Pel2x6oaZBezSTwCqwG0CT0YZAHfNKYM0gMAj8uljIlV0YdU1WJjX6ToZApXQ4HfSWxXHHvm1XVySEVZBd4tpmskFCjjetRSWs462wBIZBM9iMJm56Gx8BAYFtUE9jywA8ImpJYe1Bor5G7EaP0FLY4sS7QRkUYP6LONENjGHRjPZAKYeCHjQNZAFgFRZBBi2y", "accessTokenSource": "CHROME_CUSTOM_TAB", "applicationID": "2800747813391169", "dataAccessExpirationTime": 1680117623000, "declinedPermissions": [], "expirationTime": 1677464672296, "expiredPermissions": [], "lastRefreshTime": 1672341624296, "permissions": ["openid", "public_profile", "email"], "userID": "5790076381068887"}
        */
        const { authenticationToken, ...rest } = data;
        setUser({ userToken: authenticationToken, rest });
        navigation.navigate('Roles');
      }
    },
    logInApple = async (url?: string) => {
      setLoading(url);
      try {
        /*
          response = {"authorizationCode": "ce5a02977be4a43a989eab3716ffb6e6b.0.rtyy.l-M1L26F7jH-U6LS4joNfg", "authorizedScopes": [], "email": "globysrl@gmail.com", "fullName": {"familyName": "Cachan", "givenName": "Facundo", "middleName": null, "namePrefix": null, "nameSuffix": null, "nickname": null}, "identityToken": "eyJraWQiOiJZdXlYb1kiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLm1haXRpIiwiZXhwIjoxNjcyNDA5NDIzLCJpYXQiOjE2NzIzMjMwMjMsInN1YiI6IjAwMDM4OC4yY2UyNTNjMGU4Mjc0OWQ2YmIxOGZlZmRiYTRlMDU5Zi4wNjAyIiwibm9uY2UiOiJhMTYyNzljODRiMmM1M2NkOWVlNmQ4MTllZGQxNjQ5ZDQ0ZmRmNzFiMWFlNzNiOWVjOTEyYmE2ZDM1Mzc1ODBmIiwiY19oYXNoIjoibTRldFZZTzRvYXZfdzdDQ1dRRzFqdyIsImVtYWlsIjoiZ2xvYnlzcmxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwiYXV0aF90aW1lIjoxNjcyMzIzMDIzLCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.zGVBhUeTFHvHZW7ZkXa5E3_6PlCgaQu6XvBGnP4SjpQHl-Y6WknOBbglhMGbfYgseJQvtNlNPDUpF7YYm-Q3MDlXZ1JuZ7lAmgOOzHw1lshR-c1_ggCrvix4jCqMYagXJrgh6jA6CsQS0tFfthBM5WFdIKf5lSHdMVZA1LajTpMsLPO6OuvzVmjCkAcbgoM4X4Y_3lxDVIO-Nqec2IgXHn5G_Zx40D5XExLb07kbDhlPFFLzqUznXNDalnSNJJ6oS60nuFcdjcKBdxJxWYss14fDSOQy3w0SvlezJSXGb9S6ycHJDpnjlgdilU1YqOuAuEasnEA9XNVXOANSeb26nQ", "nonce": "5U-nRvoKXnds7kYArexrvgO_wwQCRTG8", "realUserStatus": 1, "state": null, "user": "000388.2ce253c0e82749d6bb18fefdba4e059f.0602"}
        */
        const response: AppleRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        const { email, fullName, identityToken, user } = response;
        const data: User = {
          id: user,
          token: identityToken,
          email,
          name: `${fullName?.givenName} ${fullName?.familyName}`,
          email_verified_at: true,
        };
        logged(data);
      } catch (error: any) {
        console.log(error);
      }
      setLoading();
    },
    logInGoogle = async (url?: string) => {
      setLoading(url);
      try {
        await GoogleSignin.hasPlayServices();
        const response: any = await GoogleSignin.signIn();
        /*
        {"idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyYTYxZWZkMmE0NGZjMjE1MTQ4ZDRlZmZjMzRkNmE3YjJhYzI2ZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3OTM0NzE4MDEyNTEtYTYxbzZuMmVsMnI3amxicjNxcG9zMWFsdWxyOWgyN3IuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3OTM0NzE4MDEyNTEtYTYxbzZuMmVsMnI3amxicjNxcG9zMWFsdWxyOWgyN3IuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDMzOTY0ODMxMzM5Nzg0Nzg5NDciLCJlbWFpbCI6Imdsb2J5c3JsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiTDBtU1NiU0VUVENIVWVfTmo3UXlNdyIsIm5vbmNlIjoiak15NUdrV0k0b0YxdnpvdnFSWHpDWEJfSlQxMGFib0p1a01fQkoyTGV5VSIsIm5hbWUiOiJHcnVwbyBHbG9ieSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA3WDYxbXl1N1JKSzRWVjVjalgxTm44aENJaDV0cGw3eFFEME9obj1zOTYtYyIsImdpdmVuX25hbWUiOiJHcnVwbyIsImZhbWlseV9uYW1lIjoiR2xvYnkiLCJsb2NhbGUiOiJlcyIsImlhdCI6MTY3MjMyNjQ1NiwiZXhwIjoxNjcyMzMwMDU2fQ.ZQHrSemkEDJC_I577cH8Yp9PpDkbJFuG7gaDETan8Dvrxcge_2jvmi5pL3N3yvPzUN4Or-dutmw9X-dBA1T1ct8YCwxYh1yBd4M-BhzWTRaC2bThe75lBawsR2zZ9eY7_X0l8jmKB1UIy2vqzoAYb8JGMXST7Td8drqAioj4Enr83zzLPd_9eKqaURI_hfXeQcAj2RaiqZ90gE5i7TYQFZfakjBlF2GI7z69EXLfjrgJutAo5JG9-QTS348e6ae_bpH864MUJD7UTr7WwzgWkPHxORXw477N436qiLFCqfQX2cBE_dBgyfvucYGZaG0QJ3wiWwIf7t1ufPUMM6BVNw", "scopes": ["https://www.googleapis.com/auth/userinfo.profile", "openid", "https://www.googleapis.com/auth/drive.readonly", "https://www.googleapis.com/auth/userinfo.email"], "serverAuthCode": null, "user": {"email": "globysrl@gmail.com", "familyName": "Globy", "givenName": "Grupo", "id": "103396483133978478947", "name": "Grupo Globy", "photo": "https://lh3.googleusercontent.com/a/AEdFTp7X61myu7RJK4VV5cjX1Nn8hCIh5tpl7xQD0Ohn=s120"}}
        */
        const {
          idToken,
          user: { email, id, name },
        } = response;
        logged({ token: idToken, email, id, name, email_verified_at: true });
      } catch (error: any) {
        console.log(error);
      }
      setLoading();
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
            <Btn
              backgroundColor="slate700"
              icon="apple"
              loading={Boolean(loading === 'apple')}
              title="Apple"
              onPress={() => logInApple('apple')}
            />
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
