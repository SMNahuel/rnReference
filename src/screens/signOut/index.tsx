import { useContext, useLayoutEffect } from 'react';
import auth from '@react-native-firebase/auth';

import { AppContext } from '@providers/providerContext';
import fetcher from '@utils/_fetcherFake';
import { deleteData } from '@utils/_storage';
import { KEY_ROL } from '@env';

import type { SingInScreenProps } from '../types';

const SignOutScreen = ({ navigation }: SingInScreenProps): JSX.Element => {
  const { authContext, setUser, setLoading } = useContext(AppContext);

  useLayoutEffect(() => {
    (async () => {
      setLoading(true);
      await fetcher({
        method: 'post',
        url: 'logout',
      })
        .then(async ({ status }: { status: number }) => {
          if (status >= 200 && status < 300) {
            setUser(null);
            authContext.signOut();
            await deleteData(KEY_ROL);
            await auth()
              .signOut()
              .then(() => navigation.navigate('SignIn'));
          }
        })
        .finally(() => setLoading(null));
    })();
  }, []);

  return <></>;
};

export default SignOutScreen;
