import {storage} from '../mmkv';
import {Platform} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {StorageGetType} from '@/core/types';

class SecureStorage {
  /**
   * Getting data from storage by related key
   * @param key
   */
  public getData = <T>(key: string, type: StorageGetType = 'Object') => {
    let result;

    if (Platform.OS === 'web') {
      return storage.getData<T>(key, type);
    }
    result = SecureStore.getItem(key);

    if (result && type === 'Object') {
      result = JSON.parse(result);
    }
    return result as T;
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
    if (Platform.OS === 'web') {
      storage.setData(key, data);
    } else {
      SecureStore.setItem(key, data);
    }
  };
  public removeItem = (key: string) => {
    if (Platform.OS === 'web') {
      storage.removeItem(key);
    } else {
      SecureStore.deleteItemAsync(key);
    }
  };
}

export const secureStorage = new SecureStorage();
