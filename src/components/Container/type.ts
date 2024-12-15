import {ViewProps} from 'react-native';
import type {Edges} from 'react-native-safe-area-context';

export interface ContainerProps extends ViewProps {
  /**
   * to apply custom safe area edges
   * @default - All directions
   */
  edges?: Edges;
  /**
   * specifying the container background color
   * @default `colors.background`
   */
  background?: string;
}
