import React from 'react';
import {gs} from '@/styles';
import Container from '@/components/Container';
import {NavigationPropsType} from '@/core/types';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useLoginMutation} from '@/redux/api/authApi';
import AvoidingView from '@/components/AvoidingView';
import SubmitButton from '@/components/SubmitButton';
import {LoginFormValues, loginSchema} from '@/schemas/accountSchema';
import useTheme from '@/hooks/useTheme';
import useCommonStyle from '@/hooks/useCommonStyle';

const LoginScreen: React.FC<NavigationPropsType<'Auth'>> = ({navigation}) => {
  const {colors} = useTheme();

  const styles = useCommonStyle();

  const [login, {isLoading}] = useLoginMutation();

  const {control, setFocus, handleSubmit} = useForm<LoginFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  });

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const onTogglePassword = React.useCallback(() => {
    setPasswordVisible(visible => !visible);
  }, []);

  const onSignupPress = React.useCallback(() => {
    navigation.navigate('Signup');
  }, [navigation]);

  const renderErrorText = React.useCallback((error?: string) => {
    return !error ? null : (
      <HelperText visible type="error" padding="none">
        {error}
      </HelperText>
    );
  }, []);

  const PasswordIcon = React.useMemo(() => {
    return passwordVisible ? (
      <TextInput.Icon onPress={onTogglePassword} icon="eye-off" />
    ) : (
      <TextInput.Icon onPress={onTogglePassword} icon="eye" />
    );
  }, [onTogglePassword, passwordVisible]);

  return (
    <Container style={[styles.px12, styles.py16]}>
      <AvoidingView behavior="padding" style={[gs.flex, gs.justifyCenter]}>
        <Text style={[gs.fontBold, gs.textCenter]} variant="headlineMedium">
          Todo App
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
                right={PasswordIcon}
                returnKeyType="done"
                onChangeText={onChange}
                textContentType="username"
                placeholder="Enter your password"
                secureTextEntry={!passwordVisible}
                onSubmitEditing={handleSubmit(login)}
              />
              {renderErrorText(error?.message)}
            </React.Fragment>
          )}
        />
        <SubmitButton
          label="Login"
          style={styles.mt15}
          loading={isLoading}
          disabled={isLoading}
          onPress={handleSubmit(login)}
        />
        <Button
          mode="text"
          style={styles.mt10}
          textColor={colors.text}
          onPress={onSignupPress}>
          Don't have an account?
        </Button>
      </AvoidingView>
    </Container>
  );
};

export default LoginScreen;
