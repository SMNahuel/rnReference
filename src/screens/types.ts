import { RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';

export type BoardingScreenProps = NativeStackScreenProps<RootStackParamList>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;
export type SingInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignIn'
>;
export type RolesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Roles'
>;
export type RolesDetailsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RolesDetails'>;
  route: RouteProp<RootStackParamList, 'RolesDetails'>;
};
export type CategoriesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Categories'>;
};
export type CategoryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CategoryDetails'>;
  route: RouteProp<RootStackParamList, 'CategoryDetails'>;
};
