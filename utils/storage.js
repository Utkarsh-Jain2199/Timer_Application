import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMER_KEY = '@timer_app_timers';
const HISTORY_KEY = '@timer_app_history';

export const Storage = {
  async saveTimers(timers) {
    try {
      const jsonValue = JSON.stringify(timers);
      await AsyncStorage.setItem(TIMER_KEY, jsonValue);
      return true;
    } catch (error) {
      console.error('Error saving timers:', error);
      return false;
    }
  },

  async getTimers() {
    try {
      const jsonValue = await AsyncStorage.getItem(TIMER_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error getting timers:', error);
      return [];
    }
  },

  async saveHistory(history) {
    try {
      const jsonValue = JSON.stringify(history);
      await AsyncStorage.setItem(HISTORY_KEY, jsonValue);
      return true;
    } catch (error) {
      console.error('Error saving history:', error);
      return false;
    }
  },

  async getHistory() {
    try {
      const jsonValue = await AsyncStorage.getItem(HISTORY_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  },

  async clearAll() {
    try {
      await AsyncStorage.multiRemove([TIMER_KEY, HISTORY_KEY]);
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
};