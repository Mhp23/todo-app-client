import React from 'react';
import useTheme from '@/hooks/useTheme';
import {AppStackParamListTypes} from '@/core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/screens/Home';

export const Stack = createNativeStackNavigator<AppStackParamListTypes>();

const AppStackNavigator: React.FC = () => {
  const {colors} = useTheme();

  const screenOptions = {
    headerShown: false,
    navigationBarColor: colors.surface,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
