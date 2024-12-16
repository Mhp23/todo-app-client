import {StorageKeys} from '@/core/types';
import {storage} from '@/utils/storage/mmkv';
import type {AuthenticationState} from '../type';
import {secureStorage} from '@/utils/storage/secure';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: AuthenticationState = {
  loading: true,
  isLoggedIn: false,
  account: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (
      state: AuthenticationState,
      action: PayloadAction<Required<Pick<AuthenticationState, 'account'>>>,
    ) => {
      const account = action.payload.account;
      const {_id, accessToken, refreshToken} = account;
      storage.setData(StorageKeys.AccessToken, accessToken);
      secureStorage.setData(StorageKeys.RefreshToken, {_id, refreshToken});
      return {
        ...state,
        account,
        loading: false,
        isLoggedIn: true,
      };
    },
    setLogout: (state: AuthenticationState) => {
      storage.removeItem(StorageKeys.AccessToken);
      secureStorage.removeItem(StorageKeys.RefreshToken);
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        account: undefined,
      };
    },
  },
});

export const {setLogin, setLogout} = authSlice.actions;

export default authSlice.reducer;
