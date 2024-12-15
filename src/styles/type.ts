import {DefaultSizes} from '@/core/types';
import type {ImageStyle, StyleProp, TextStyle, ViewStyle} from 'react-native';

export type StyleKeys<T> =
  T extends Record<string, string | number | undefined>
    ? StyleProp<T>
    : {[P in keyof T]: StyleProp<T[P]>};

export type AllStylesType = ViewStyle | TextStyle | ImageStyle;

export const SPACES = Object.values(DefaultSizes).filter(
  v => typeof v === 'number',
);

export type SpaceKey = 'p' | 'm';

export type SpaceValue = (typeof SPACES)[number];

export type SpaceNamespace = '' | 'b' | 'e' | 'x' | 's' | 't' | 'y';

export type SpaceGeneratorKey = `${SpaceKey}${SpaceNamespace}${SpaceValue}`;

export type SpaceGenerator = {
  [K in SpaceGeneratorKey]: {
    [key: string]: number;
  };
};
