import React from 'react';
import {gs} from '@/styles';
import useTheme from '@/hooks/useTheme';
import {TextInput} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper';

const TaskInput: React.FC<TextInputProps> = props => {
  const {colors} = useTheme();

  return (
    <TextInput
      mode="outlined"
      style={gs.flex}
      outlineStyle={gs.roundedSm}
      outlineColor={colors.border}
      activeOutlineColor={colors.theme}
      {...props}
    />
  );
};

export default TaskInput;
