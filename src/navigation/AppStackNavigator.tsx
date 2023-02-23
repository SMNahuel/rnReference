import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '@screens/signIn/';
import SignOutScreen from '@screens/signOut/';

const Stack = createNativeStackNavigator();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      detachInactiveScreens={true}
      /* barStyle={{ paddingBottom: 48 }} */
      screenOptions={{
        unmountOnBlur: true,
        headerShown: true,
        /* header: () => <Appbar />, */
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignOut"
        component={SignOutScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
