import React from 'react';
import {Toaster} from 'sonner-native';
import useTheme from '@/hooks/useTheme';
import AppStackNavigator from './stack/AppStack';
import AuthStackNavigator from './stack/AuthStack';
import {useAppSelector} from '@/hooks/useAppSelector';
import {NavigationContainer} from '@react-navigation/native';
import {type ToastTheme} from 'node_modules/sonner-native/lib/typescript/module/src/types';

const Navigation: React.FC = () => {
  const {mode} = useTheme();

  const {isLoggedIn, loading} = useAppSelector(data => data.auth);

  return (
    <NavigationContainer>
      {loading ? null : isLoggedIn ? (
        <AppStackNavigator />
      ) : (
        <AuthStackNavigator />
      )}
      <Toaster theme={mode as ToastTheme} position="top-center" />
    </NavigationContainer>
  );
};

export default Navigation;
