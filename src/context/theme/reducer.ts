import {getCurrentTheme, initialize} from './initialize';
import type {ThemeContentProps, ThemeReducerActionType} from './type';

const INITIALIZED_THEME = initialize();

export const themeInitalState: ThemeContentProps = {
  mode: INITIALIZED_THEME.mode,
  colors: INITIALIZED_THEME.colors,
  systemMode: INITIALIZED_THEME.systemMode,
};

const themeReducer = (
  prevState = themeInitalState,
  action: ThemeReducerActionType,
): ThemeContentProps => {
  switch (action?.type) {
    case 'MODE':
      const mode = action.payload.mode;
      const theme = getCurrentTheme(mode);
      return {...prevState, ...theme};
    default:
      return prevState;
  }
};

export default themeReducer;
