import {Platform, StyleSheet} from 'react-native';
import {gRSFactory} from './factory';
/**
 * global resposive styles
 */
export const gResponsiveStyles = gRSFactory.initialize();
/**
 * global styles that are used in most of the components and are common
 */
export const globalStyles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  relative: {
    position: 'relative',
  },
  inset0: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flex: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selfStart: {
    alignSelf: 'flex-start',
  },
  selfEnd: {
    alignSelf: 'flex-end',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  rounded2xs: {
    borderRadius: 2.5,
  },
  roundedXs: {
    borderRadius: 5,
  },
  roundedSm: {
    borderRadius: 7.5,
  },
  roundedMd: {
    borderRadius: 12.5,
  },
  rounded: {
    borderRadius: 99,
  },
  shadowLow: {
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowRadius: 8,
        shadowOpacity: 0.1,
      },
    }),
  },
  shadowMid: {
    ...Platform.select({
      android: {
        elevation: 16,
      },
      ios: {
        shadowRadius: 16,
        shadowOpacity: 0.1,
      },
    }),
  },
  shadowHigh: {
    ...Platform.select({
      android: {
        elevation: 24,
      },
      ios: {
        shadowRadius: 32,
        shadowOpacity: 0.1,
      },
    }),
  },
  z1: {
    zIndex: 10,
  },
  italic: {
    fontStyle: 'italic',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  disabled: {
    opacity: 0.6,
  },
});

export const gs = {...globalStyles, ...gResponsiveStyles};
