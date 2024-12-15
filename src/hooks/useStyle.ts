import {type StyleProp, StyleSheet} from 'react-native';
import type {AllStylesType} from '../styles/type';
import {useMemo, type DependencyList} from 'react';

export const useStyle = <
  T extends AllStylesType | Record<string, AllStylesType>,
>(
  factory: () => StyleProp<T>,
  deps: DependencyList = [],
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => StyleSheet.flatten<T>(factory()), deps);
};
