import React from 'react';
import useTheme from '@/hooks/useTheme';
import type {ContainerProps} from './type';
import {SafeAreaView} from 'react-native-safe-area-context';

const Container = React.forwardRef<any, ContainerProps>(
  (
    {
      style,
      children,
      background,
      edges = ['top', 'bottom', 'left', 'right'],
      ...rest
    },
    ref,
  ) => {
    const {colors} = useTheme();

    const baseStyles = {
      flex: 1,
      backgroundColor: background ?? colors.background,
    };

    return (
      <SafeAreaView
        ref={ref}
        edges={edges}
        style={[baseStyles, style]}
        testID="FAST_BASE_CONTAINER"
        {...rest}>
        {children}
      </SafeAreaView>
    );
  },
);

Container.displayName = 'Container';

export default Container;
