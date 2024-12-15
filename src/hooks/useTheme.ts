import {useContext} from 'react';
import {type ThemeContextProps, ThemeContext} from '@/context/theme';

const useTheme = () => {
  return useContext<ThemeContextProps>(ThemeContext);
};

export default useTheme;
