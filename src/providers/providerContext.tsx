import { createContext, useState, useEffect, useMemo, useReducer } from 'react';
import { useColorScheme } from 'react-native';

import { Loaders } from '@components';

import { getData } from '@utils/_storage';
import { USER_KEY } from '@env';

import type { User } from '../interfaces';

const AppContext = createContext();
const AppProvider = ({ children }: any) => {
  const scheme = useColorScheme();
  const [dark, darkTheme] = useState(scheme === 'dark');
  const [user, setUser] = useState(null);
  const [rolesAndPermissions, setRolesAndPermissions] = useState();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(
    (prevState: any, action: { type: string; token: string }) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    (async () => {
      let userToken;
      try {
        userToken = await getData(USER_KEY);
      } catch (e) {
        // Restoring token failed
      }
      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    })();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (token: User) => {
        console.log(
          '🚀 ~ file: providerContext.tsx ~ line 139 ~ .then ~ token',
          token,
        );
        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data: any) => {
        console.log(
          '🚀 ~ file: providerContext.tsx:147 ~ signUp: ~ data',
          data,
        );
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [],
  );

  const values = useMemo(
    () => ({
      darkTheme,
      setUser,
      setLoading,
      setRolesAndPermissions,
    }),
    [],
  );
  if (loading) {
    return <Loaders.Default />;
  }

  return (
    <AppContext.Provider
      value={{
        ...values,
        state,
        authContext,
        user,
        dark,
        rolesAndPermissions,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
