import type {ColorSchemeName} from 'react-native';

export type RenderNodeType = React.ReactNode | (() => React.ReactNode);
export type ThemeStateType = ColorSchemeName;
export type ThemeModeType = ThemeStateType | 'system';
export type DefaultThemeColorsProps = {
  sky: string;
  pink: string;
  flat: string;
  text: string;
  mint: string;
  error: string;
  theme: string;
  peach: string;
  border: string;
  success: string;
  warning: string;
  scarlet: string;
  surface: string;
  disabled: string;
  secondText: string;
  background: string;
  reverseText: string;
};
export type ThemeContextProps = ThemeContentProps & {
  changeMode: (mode: ThemeModeType) => void;
};

export interface ThemeContentProps {
  mode: ThemeStateType;
  systemMode: boolean;
  colors: DefaultThemeColorsProps;
}
export interface ThemeProps<T = ThemeContentProps> {
  DarkTheme: T;
  LightTheme: T;
}
export interface ReducerProps<T, R> {
  payload: T;
  type: R;
}

export type ThemeReducerAction = ReducerProps<
  {
    mode: ThemeModeType;
  },
  'MODE'
>;

export type ThemeReducerActionType = ThemeReducerAction;
