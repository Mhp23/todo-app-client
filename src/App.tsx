import React from 'react';
import {store} from '@/redux/store';
import {Provider} from 'react-redux';
import Navigation from './navigation';
import {ThemeProvider} from '@/context/theme';
import GHRootView from '@/components/GHRootView';
import * as SplashScreen from 'expo-splash-screen';
import AuthProvider from '@/context/auth/Provider';

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <GHRootView>
            <Navigation />
          </GHRootView>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
