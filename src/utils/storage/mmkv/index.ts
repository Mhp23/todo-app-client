import {MMKV} from 'react-native-mmkv';
import {StorageGetType, StorageKeys} from '@/core/types';

class Storage {
  private storage;

  constructor(id: string) {
    this.storage = new MMKV({id});
  }
  /**
   * Getting data from storage by related key
   * @param key
   */
  public getData = <T>(
    key: string,
    type: StorageGetType = 'String',
  ): T | undefined => {
    let result;

    if (type === 'String') {
      result = this.storage.getString(key);
    } else if (type === 'Boolean') {
      result = this.storage.getBoolean(key);
    } else if (type === 'Number') {
      result = this.storage.getNumber(key);
    } else {
      const objectData = this.storage.getString(key);
      if (objectData) {
        result = JSON.parse(objectData);
      }
    }
    return result;
  };
  /**
   * Storing data to storage by a specific key
   * @param key
   * @param value
   */
  public setData = (key: string, value: any) => {
    let data = value;

    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    this.storage.set(key, data);
  };

  public removeItem = (key: string) => {
    this.storage.delete(key);
  };
  /**
   * by @removeAllKeysExceptTheme function all keys will removed from
   * storage expect arrays of keys mode and language key.
   */
  public removeAllKeysExcept = <T extends string[]>(
    keysArray = [] as unknown as T,
  ) => {
    const keys = this.storage.getAllKeys();

    keysArray.push(StorageKeys.Theme);

    keys.forEach(key => {
      if (!keysArray.includes(key)) {
        this.storage.delete(key);
      }
    });
  };
}

export const storage = new Storage('gg_todo_storage');
