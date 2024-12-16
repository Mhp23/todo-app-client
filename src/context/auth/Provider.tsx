import React from 'react';
import {gs} from '@/styles';
import {useDispatch} from 'react-redux';
import TryAgain from '@/components/TryAgain';
import Container from '@/components/Container';
import * as SplashScreen from 'expo-splash-screen';
import {ActivityIndicator} from 'react-native-paper';
import {secureStorage} from '@/utils/storage/secure';
import {AccountSchema} from '@/schemas/accountSchema';
import {useRefreshTokenMutation} from '@/redux/api/authApi';
import {setLogin, setLogout} from '@/redux/slices/authSlice';
import {ErrorResponse, StatusCodes, StorageKeys} from '@/core/types';

const AuthProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch();

  const [refresh, {isLoading, isError, error}] = useRefreshTokenMutation();

  const refreshTokenRequest = React.useCallback(async () => {
    try {
      const credentials = secureStorage.getData<
        Pick<AccountSchema, '_id' | 'refreshToken'>
      >(StorageKeys.RefreshToken);

      if (!credentials) {
        return dispatch(setLogout());
      }
      const {_id, refreshToken} = credentials;

      const {data, status} = await refresh({_id, refreshToken}).unwrap();

      if (status === StatusCodes.OK) {
        dispatch(setLogin({account: data}));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, refresh]);

  React.useEffect(() => {
    refreshTokenRequest().finally(() => {
      SplashScreen.hide();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Container style={gs.center}>
      <ActivityIndicator />
    </Container>
  ) : isError &&
    (error as ErrorResponse).status !== StatusCodes.UNAUTHORIZED ? (
    <TryAgain error={error} onRefetchPress={refreshTokenRequest} />
  ) : (
    <>{children}</>
  );
};

export default AuthProvider;
