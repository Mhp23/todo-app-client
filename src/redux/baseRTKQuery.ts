import {toast} from 'sonner-native';
import type {RootState} from '@/redux/store';
import {setLogout} from '@/redux/slices/authSlice';
import {ApiResponse, StatusCodes} from '@/core/types';
import NetInfo from '@react-native-community/netinfo';
import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Platform} from 'react-native';

const baseQuery = fetchBaseQuery({
  baseUrl:
    Platform.OS === 'android'
      ? process.env.EXPO_PUBLIC_ANDROID_BASE_URL
      : process.env.EXPO_PUBLIC_BASE_URL,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.account?.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const baseRTKQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const netInfo = await NetInfo.fetch();

  if (!netInfo.isConnected) {
    const message = 'No internet connection. Please check your network.';
    toast.warning(message);
    return {
      error: {status: 'FETCH_ERROR', message},
    };
  }
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const {status, data} = result.error;

    let message: string;

    switch (status) {
      case 'FETCH_ERROR':
        message = 'Failed to connect the server. Please try again.';
        break;
      case 'PARSING_ERROR':
        message = 'Failed to process server response. Please try again.';
        break;
      case 'TIMEOUT_ERROR':
        message = 'Request timed out. Please try again.';
        break;
      case StatusCodes.UNAUTHORIZED: {
        if (api.endpoint === 'login') {
          message = 'Invalid username or password. Please try again.';
        } else {
          api.dispatch(setLogout());
          message =
            'Your token has expired. Please log in to your account again.';
        }
        break;
      }
      case 'CUSTOM_ERROR':
        message = result.error.error;
        break;
      default:
        message =
          (data as Omit<ApiResponse, 'data'>)?.message ||
          'An unknown error occurred.';
        break;
    }
    toast.error(message);

    return {error: {status, message}};
  }

  return result;
};
