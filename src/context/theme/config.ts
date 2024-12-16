import type {DefaultThemeColorsProps, ThemeProps} from './type';

export const PrimaryColors = {
  Dark: {
    error: '#ef4444',
    success: '#4ade80',
    warning: '#fb923c',
  },
  Light: {
    error: '#dc2626',
    success: '#22c55e',
    warning: '#f97316',
  },
};

export const CommonColors = {
  sky: '#3498DB',
  pink: '#FF6079',
  mint: '#3EB489',
  peach: '#F87C56',
  scarlet: '#FF2400',
};

const DefaultTheme: ThemeProps<{
  colors: DefaultThemeColorsProps;
}> = {
  LightTheme: {
    colors: {
      ...CommonColors,
      ...PrimaryColors.Light,
      theme: '#7845ac',
      text: '#000000',
      flat: '#F4F5F6',
      border: '#EBEBEB',
      surface: '#F7F9F9',
      disabled: '#E0E0DB',
      background: '#FFFFFE',
      secondText: '#626567',
      reverseText: '#ffffff',
    },
  },
  DarkTheme: {
    colors: {
      ...CommonColors,
      ...PrimaryColors.Dark,
      theme: '#dcb8ff',
      text: '#ffffff',
      flat: '#282828',
      border: '#303030',
      surface: '#181818',
      disabled: '#3E3E3E',
      secondText: '#B3B3B3',
      background: '#121212',
      reverseText: '#000000',
    },
  },
};

export default DefaultTheme;
