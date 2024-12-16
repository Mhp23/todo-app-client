import {ApiResponse, StatusCodes} from '@/core/types';
import {baseRTKQuery} from '../baseRTKQuery';
import {createApi} from '@reduxjs/toolkit/query/react';
import type {AccountSchema} from '@/schemas/accountSchema';
import {setLogin, setLogout} from '../slices/authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseRTKQuery,
  endpoints: builder => ({
    register: builder.mutation<
      ApiResponse<Omit<AccountSchema, 'password'>>,
      Pick<AccountSchema, 'username' | 'password'>
    >({
      query: credentials => ({
        method: 'POST',
        body: credentials,
        url: '/account/register',
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {
            data: {data, status},
          } = await queryFulfilled;

          if (status === StatusCodes.CREATED && data) {
            dispatch(setLogin({account: data}));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation<
      ApiResponse<Omit<AccountSchema, 'password'>>,
      Pick<AccountSchema, 'username' | 'password'>
    >({
      query: credentials => ({
        method: 'POST',
        body: credentials,
        url: '/account/login',
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {
            data: {data, status},
          } = await queryFulfilled;

          if (status === StatusCodes.OK && data) {
            dispatch(setLogin({account: data}));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refreshToken: builder.mutation<
      ApiResponse<Omit<AccountSchema, 'password'>>,
      Pick<AccountSchema, '_id' | 'refreshToken'>
    >({
      query: credentials => ({
        method: 'POST',
        body: credentials,
        url: '/account/refresh-token',
      }),
    }),
    logout: builder.mutation<
      Omit<ApiResponse, 'data'>,
      Pick<AccountSchema, '_id'>
    >({
      query: credentials => ({
        method: 'POST',
        body: credentials,
        url: '/account/logout',
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try {
          const {
            data: {status},
          } = await queryFulfilled;

          if (status === StatusCodes.OK) {
            dispatch(setLogout());
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
} = authApi;
