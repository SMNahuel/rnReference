import { useState, useLayoutEffect, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppContext } from '@providers/providerContext';
import { colors, fonts, fontsSizes } from '@styles/theme';
import DarkTheme from '@styles/dark';
import LightTheme from '@styles/light';

// import AppTabNavigator from '@navigation/AppTabNavigator';
import AppStackNavigator from '@navigation/AppStackNavigator';

export type Route = {
  name: 'Roles' | 'Profile' | 'Categories' | 'Suscriptions'; // should be keyof RootStackParamList
  icon: string;
};
const routes: Route[] = [
  {
    name: 'Roles',
    icon: 'list',
  },
  {
    name: 'Categories',
    icon: 'list',
  },
  {
    name: 'Profile',
    icon: 'address-card',
  },
];

const AppNavigation = () => {
  const { state, dark } = useContext(AppContext);
  const [theme, setTheme] = useState({
    colors,
    fonts,
    fontsSizes,
    ...LightTheme,
  });

  useLayoutEffect(() => {
    console.log(`🙋🏽‍♂️ Change state ${JSON.stringify(state, null, 2)}`);
  }, [state]);

  useEffect(() => {
    console.log(`🎨 Changing theme to ${dark ? 'dark' : 'light'}`);
    setTheme({ colors, fonts, fontsSizes, ...(dark ? DarkTheme : LightTheme) });
  }, [dark]);

  return (
    <NavigationContainer theme={theme}>
      {/* <AppTabNavigator routeByRole={state.userToken !== null ? routes : []} /> */}
      <AppStackNavigator routeByRole={routes} />
    </NavigationContainer>
  );
};

export default AppNavigation;
