import React from 'react';
import {gs} from '@/styles';
import Container from '@/components/Container';
import {NavigationPropsType} from '@/core/types';
import {HelperText, Text, TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRegisterMutation} from '@/redux/api/authApi';
import AvoidingView from '@/components/AvoidingView';
import SubmitButton from '@/components/SubmitButton';
import {SignupFormValues, signupSchema} from '@/schemas/accountSchema';
import useCommonStyle from '@/hooks/useCommonStyle';

const SignupScreen: React.FC<NavigationPropsType<'Auth'>> = () => {
  const styles = useCommonStyle();

  const [register, {isLoading}] = useRegisterMutation();

  const {control, setFocus, handleSubmit} = useForm<SignupFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(signupSchema),
  });

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const [repeatPasswordVisible, setRepeatPasswordVisible] =
    React.useState<boolean>(false);

  const renderErrorText = React.useCallback((error?: string) => {
    return !error ? null : (
      <HelperText visible type="error" padding="none">
        {error}
      </HelperText>
    );
  }, []);

  const renderPasswordIcon = React.useCallback(
    (
      visible: boolean,
      setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      const onTogglePassword = () => {
        setVisible(visible => !visible);
      };
      return visible ? (
        <TextInput.Icon onPress={onTogglePassword} icon="eye-off" />
      ) : (
        <TextInput.Icon onPress={onTogglePassword} icon="eye" />
      );
    },
    [],
  );

  return (
    <Container edges={[]} style={[styles.px12, styles.py16]}>
      <AvoidingView behavior="padding" style={[gs.flex, gs.justifyCenter]}>
        <Text style={[gs.fontBold, gs.textCenter]} variant="headlineMedium">
          Create Account
        </Text>
        <Controller
          name="username"
          defaultValue=""
          control={control}
          render={({field: {ref, onChange, value}, fieldState: {error}}) => (
            <React.Fragment>
              <TextInput
                ref={ref}
                value={value}
                error={!!error}
                mode="outlined"
                label="Username"
                style={styles.mt15}
                returnKeyType="next"
                onChangeText={onChange}
                textContentType="username"
                placeholder="Enter your username"
                onSubmitEditing={() => setFocus('password')}
              />
              {renderErrorText(error?.message)}
            </React.Fragment>
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={control}
          render={({field: {ref, onChange, value}, fieldState: {error}}) => (
            <React.Fragment>
              <TextInput
                ref={ref}
                value={value}
                error={!!error}
                mode="outlined"
                label="Password"
                style={styles.mt10}
                returnKeyType="next"
                onChangeText={onChange}
                textContentType="username"
                placeholder="Enter your password"
                secureTextEntry={!passwordVisible}
                onSubmitEditing={() => setFocus('repeatPassword')}
                right={renderPasswordIcon(passwordVisible, setPasswordVisible)}
              />
              {renderErrorText(error?.message)}
            </React.Fragment>
          )}
        />
        <Controller
          name="repeatPassword"
          defaultValue=""
          control={control}
          render={({field: {ref, onChange, value}, fieldState: {error}}) => (
            <React.Fragment>
              <TextInput
                ref={ref}
                value={value}
                error={!!error}
                mode="outlined"
                style={styles.mt10}
                returnKeyType="done"
                onChangeText={onChange}
                label="Repeat Password"
                textContentType="username"
                placeholder="Re-enter password"
                secureTextEntry={!repeatPasswordVisible}
                onSubmitEditing={handleSubmit(register)}
                right={renderPasswordIcon(
                  repeatPasswordVisible,
                  setRepeatPasswordVisible,
                )}
              />
              {renderErrorText(error?.message)}
            </React.Fragment>
          )}
        />
        <SubmitButton
          label="Sign up"
          style={styles.mt15}
          loading={isLoading}
          disabled={isLoading}
          onPress={handleSubmit(register)}
        />
      </AvoidingView>
    </Container>
  );
};

export default SignupScreen;
