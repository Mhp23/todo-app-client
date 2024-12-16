import React from 'react';
import useTheme from '@/hooks/useTheme';
import LoginScreen from '@/screens/Login';
import SignupScreen from '@/screens/Signup';
import {AuthStackParamListTypes} from '@/core/types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const Stack = createNativeStackNavigator<AuthStackParamListTypes>();

const AuthStackNavigator: React.FC = () => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        navigationBarColor: colors.surface,
      }}>
      <Stack.Screen
        name="Signup"
        options={{
          title: 'Sign up',
          headerBackTitle: 'Return',
          headerShadowVisible: false,
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
        component={SignupScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
