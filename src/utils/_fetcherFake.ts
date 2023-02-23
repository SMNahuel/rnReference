import { showMessage } from 'react-native-flash-message';

import wait from '@utils/_wait';

const delay = 1000,
  status = 200;
const fetcher = async ({ url }: { url: string }) => {
  await wait(delay);
  try {
    switch (url) {
      case 'apple':
      case 'facebook':
      case 'google':
        return null;
      case 'login':
        return { data: require('../mocks/users').user, status };
      case 'logout':
        return { data: {}, status };
      case 'register':
        const { user } = require('../mocks/users');
        user.email_verified_at = '2022-10-03T18:51:56.000000Z';
        return { data: user, status };
      case 'recoveryPassword':
        return { data: user, status };
      case 'roles/0':
        return { data: require('../mocks/roles').detail, status };
      case 'roles':
        return { data: require('../mocks/roles').roles, status };
      case 'categories/0':
        return { data: require('../mocks/categories').detail, status };
      case 'categories/detail/0':
        return { data: require('../mocks/categories').items, status };
      case 'categories':
        return { data: require('../mocks/categories').categories, status };
      case 'suscriptions':
        return { data: require('../mocks/suscriptions').suscriptions, status };
      default:
        showMessage({
          message: 'No data to show',
          type: 'danger',
          duration: 3000,
        });
        return { data: null, status: 305 };
    }
  } catch (error) {
    return error;
  }
};

export default fetcher;
