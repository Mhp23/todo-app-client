import {createRStyle, rs} from 'react-native-full-responsive';
import {SpaceGenerator, SpaceGeneratorKey, SPACES} from '../type';

class GRSFactory {
  private SpacesValues;
  private readonly Namespaces = [
    /**
     * for generating all direction (e.g. `padding` or `margin`)
     */
    ['', ''],
    ['Top', 't'],
    ['End', 'e'],
    ['Start', 's'],
    ['Bottom', 'b'],
    ['Vertical', 'y'],
    ['Horizontal', 'x'],
  ];
  /**
   * calculating the space's responsive value to avoid re-calculate for each batch of the styles
   */
  constructor() {
    this.SpacesValues = SPACES.map(s => rs(s));
  }
  /**
   * a method to generate space styles based on the passed parameter
   * @param key - the style parameter key to generate styles for that
   * @returns the generated style output based on the spaces and namespaces
   */
  generator(key: 'padding' | 'margin'): SpaceGenerator {
    let result = {} as SpaceGenerator;
    /**
     * iterate for each namespace
     */
    for (let i = 0; i < this.Namespaces.length; i++) {
      /**
       * iterate for each space value
       */
      for (let j = 0; j < SPACES.length; j++) {
        /**
         * the new style item key for (e.g. p_1 or pb_2, etc)
         */
        result[
          `${key.charAt(0)}${this.Namespaces[i][1]}${
            SPACES[j]
          }` as SpaceGeneratorKey
        ] = {
          /**
           * the new style item value (the responsive value) for the key
           */
          [`${key}${this.Namespaces[i][0]}`]: this.SpacesValues[j],
        };
      }
    }
    return result;
  }

  initialize() {
    const margins = this.generator('margin');
    const paddings = this.generator('padding');

    const staticStyles = createRStyle({});

    return {...margins, ...paddings, ...staticStyles};
  }
}

export const gRSFactory = new GRSFactory();
