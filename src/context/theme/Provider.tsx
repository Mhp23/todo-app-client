import React from 'react';
import {
  StatusBar,
  Appearance,
  type NativeEventSubscription,
} from 'react-native';
import {StorageKeys} from '@/core/types';
import {storage} from '@/utils/storage/mmkv';
import {FRProvider} from 'react-native-full-responsive';
import {IS_SUPPORT_SYSTEM_THEME} from '@/core/constants';
import themeReducer, {themeInitalState} from './reducer';
import {ThemeContextProps, ThemeModeType} from './type';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';

export const ThemeContext = React.createContext<ThemeContextProps>({
  ...themeInitalState,
  changeMode: () => {},
});

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [themeState, dispatch] = React.useReducer(
    themeReducer,
    themeInitalState,
  );

  const barStyle =
    themeState.mode === 'dark' ? 'light-content' : 'dark-content';

  const paperTheme = React.useMemo(() => {
    return themeState.mode === 'dark' ? MD3DarkTheme : MD3LightTheme;
  }, [themeState.mode]);

  const themeContextValue: ThemeContextProps = React.useMemo(() => {
    return {
      ...themeState,
      changeMode: (newMode: ThemeModeType) => {
        dispatch({
          type: 'MODE',
          payload: {mode: newMode},
        });
        storage.setData(StorageKeys.Theme, newMode);
      },
    };
  }, [themeState]);

  React.useEffect(() => {
    if (IS_SUPPORT_SYSTEM_THEME && themeState.systemMode) {
      let unSubscribe: NativeEventSubscription;

      const onColorSchemeChange = () => {
        dispatch({
          type: 'MODE',
          payload: {mode: 'system'},
        });
      };
      unSubscribe = Appearance.addChangeListener(onColorSchemeChange);
      return () => {
        /**
         * handling Appearance listener removing cleanup for different react native versions.
         */
        unSubscribe?.remove();
      };
    }
  }, [themeState.systemMode]);

  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle={barStyle}
          backgroundColor={themeState.colors.surface}
        />
        <FRProvider>
          <PaperProvider theme={paperTheme}>
            <ThemeContext.Provider value={themeContextValue}>
              {children}
            </ThemeContext.Provider>
          </PaperProvider>
        </FRProvider>
      </SafeAreaProvider>
    </KeyboardProvider>
  );
};

export default ThemeProvider;
