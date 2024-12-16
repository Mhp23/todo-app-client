import React from 'react';
import {gs} from '@/styles';
import useTheme from '@/hooks/useTheme';
import {Button, Text, type ButtonProps} from 'react-native-paper';

const SubmitButton: React.FC<
  Partial<ButtonProps> & {
    label: string;
  }
> = ({style, label, ...rest}) => {
  const {colors} = useTheme();

  return (
    <Button mode="contained" style={[gs.roundedSm, style]} {...rest}>
      <Text
        style={[
          gs.textBlack,
          gs.fontSemiBold,
          {
            color: colors.reverseText,
          },
        ]}
        variant="titleMedium">
        {label}
      </Text>
    </Button>
  );
};

export default SubmitButton;
