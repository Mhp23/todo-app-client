import React from 'react';
import {gs} from '@/styles';
import useTheme from '@/hooks/useTheme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import type {GestureHandlerRootViewProps} from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerRootView';

const GHRootView: React.FC<
  React.PropsWithChildren<GestureHandlerRootViewProps>
> = ({children, ...rest}) => {
  const {colors} = useTheme();

  const rootViewStyle = [gs.flex, {backgroundColor: colors.background}];

  return (
    <GestureHandlerRootView
      testID="GH_ROOT_VIEW"
      style={rootViewStyle}
      {...rest}>
      {children}
    </GestureHandlerRootView>
  );
};

export default React.memo(GHRootView);
