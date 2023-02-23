/**
 * Method for fetch APIs
 * setData allways return Array object
 *
 * @function
 */

import { showMessage } from 'react-native-flash-message';

import { API_URL } from '@env';

export type PropsFetcher = {
  url: string;
  method?: string;
  data?: any;
  headers?: {};
};

const fetcher = async ({
  url,
  method = 'get',
  data,
  headers,
}: PropsFetcher) => {
  try {
    let response = await fetch(`${API_URL}/${url}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        ...headers,
      },
      body: JSON.stringify(data),
    });
    let json = await response.json();
    return { data: json, status: response.status };
  } catch (e: any) {
    showMessage({
      message: 'No data to show',
      type: 'danger',
      duration: 3000,
    });
    return { status: e.response.status };
  }
};

export default fetcher;
