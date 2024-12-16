import React from 'react';
import {gs} from '@/styles';
import {
  KeyboardAvoidingView,
  type KeyboardAvoidingViewProps,
} from 'react-native-keyboard-controller';
import {Platform, View} from 'react-native';
import KeyboardDismisser from '../KeyboardDismisser';

const AvoidingView: React.FC<
  React.PropsWithChildren<
    KeyboardAvoidingViewProps & {
      dismissible?: boolean;
    }
  >
> = ({children, dismissible = true, style, ...rest}) => {
  if (Platform.OS === 'web') {
    return (
      <View style={[gs.flex, style]} {...rest}>
        {children}
      </View>
    );
  }
  const RootView = dismissible ? KeyboardDismisser : React.Fragment;

  return (
    <RootView>
      <KeyboardAvoidingView style={[gs.flex, style]} {...rest}>
        {children}
      </KeyboardAvoidingView>
    </RootView>
  );
};

export default AvoidingView;
