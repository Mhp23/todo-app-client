import {AccountSchema} from '@/schemas/accountSchema';

export interface AuthenticationState {
  loading: boolean;
  isLoggedIn: boolean;
  account?: Omit<AccountSchema, 'password'>;
}
