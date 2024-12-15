import useTheme from './useTheme';
import {AllStylesType} from '../styles/type';
import {StyleProp, StyleSheet} from 'react-native';
import {type DependencyList, useMemo} from 'react';
import {DefaultThemeColorsProps} from '@/context/theme/type';

export const useThemedStyle = <T extends AllStylesType>(
  factory: (colors: DefaultThemeColorsProps) => StyleProp<T>,
  deps: DependencyList = [],
) => {
  const theme = useTheme();

  return useMemo(
    () => StyleSheet.flatten<T>(factory(theme.colors)),
    /**
     * as the colors for light and dark mode are consistent, recalculation is only needed when the mode changes
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme.mode, ...deps],
  );
};
