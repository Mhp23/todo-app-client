import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export enum StorageKeys {
  Theme = '@theme',
  Language = '@language',
  SystemMode = '@SystemMode',
  AccessToken = '@AccessToken',
}
export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  GONE = 410,
  REQUEST_TOO_LONG = 413,
  UNSUPPORTED_MEDIA_TYPE = 415,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}
export enum DefaultSizes {
  _2xs = 2,
  xs = 4,
  exs = 6,
  sm = 8,
  esm = 10,
  md = 12,
  lg = 16,
  xl = 20,
  _2xl = 24,
  _3xl = 28,
  _4xl = 32,
}
export type SizeType = keyof typeof DefaultSizes;
export type RenderNodeType = React.ReactNode | (() => React.ReactNode);
export type StorageGetType = 'String' | 'Number' | 'Boolean' | 'Object';
export type PrimaryColorType = 'success' | 'warning' | 'error';
export type FlexAlignYType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export type DirectionModeType =
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse';

export type AuthStackParamListTypes = {
  Login: undefined;
  Signup: undefined;
};
export type AppStackParamListTypes = {
  Home: undefined;
};

export type NavigationPropsType<S extends 'Auth' | 'App' = 'App'> =
  S extends 'App'
    ? NativeStackScreenProps<
        AppStackParamListTypes,
        keyof AppStackParamListTypes
      >
    : NativeStackScreenProps<
        AuthStackParamListTypes,
        keyof AuthStackParamListTypes
      >;

export type UseNavigationPropsType<S extends 'Auth' | 'App' = 'App'> =
  S extends 'App'
    ? NativeStackNavigationProp<
        AppStackParamListTypes,
        keyof AppStackParamListTypes
      >
    : NativeStackNavigationProp<
        AuthStackParamListTypes,
        keyof AuthStackParamListTypes
      >;

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message: string;
}
