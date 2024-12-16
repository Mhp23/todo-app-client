import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

const KeyboardDismisser: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <TouchableWithoutFeedback
      testID="KEYBOARD_DISMISSER"
      onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default KeyboardDismisser;
