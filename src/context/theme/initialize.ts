import DefaultTheme from './config';
import {ThemeModeType, ThemeStateType} from './type';
import {Appearance} from 'react-native';
import {StorageKeys} from '@/core/types';
import {storage} from '@/utils/storage/mmkv';
import {IS_SUPPORT_SYSTEM_THEME} from '@/core/constants';

const themeFallback = (mode: ThemeModeType) => {
  return mode ?? (IS_SUPPORT_SYSTEM_THEME ? 'system' : 'light');
};

export const getCurrentTheme = (mode: ThemeModeType) => {
  let currentMode: ThemeStateType;

  const systemMode = mode === 'system';

  if (systemMode) {
    const colorScheme = Appearance.getColorScheme();
    currentMode = colorScheme;
  }
  const currentTheme =
    currentMode === 'dark' ? DefaultTheme.DarkTheme : DefaultTheme.LightTheme;

  return {...currentTheme, mode: currentMode, systemMode};
};

export const initialize = () => {
  const savedTheme = storage.getData<ThemeModeType>(StorageKeys.Theme);
  const currentMode = themeFallback(savedTheme);
  const currentTheme = getCurrentTheme(currentMode);
  return currentTheme;
};
