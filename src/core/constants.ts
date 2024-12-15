import {Appearance} from 'react-native';
/**
 * is device support system dark/light mode or not
 */
export const IS_SUPPORT_SYSTEM_THEME =
  typeof Appearance.getColorScheme() === 'string';
