import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Storage } from '../utils/storage';
import TimerGroup from '../components/TimerGroup';
import CategoryFilter from '../components/CategoryFilter';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const [timers, setTimers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadTimers();
  }, []);

  const loadTimers = async () => {
    const savedTimers = await Storage.getTimers();
    setTimers(savedTimers);
  };

  const categories = [...new Set(timers.map(timer => timer.category))];
  const filteredTimers = selectedCategory
    ? timers.filter(timer => timer.category === selectedCategory)
    : timers;

  const groupedTimers = filteredTimers.reduce((groups, timer) => {
    const category = timer.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(timer);
    return groups;
  }, {});

  const handleTimerComplete = async (timer) => {
    const history = await Storage.getHistory();
    const historyEntry = {
      ...timer,
      completedAt: new Date().toISOString(),
    };
    await Storage.saveHistory([...history, historyEntry]);
    
    Alert.alert(
      'Timer Completed!',
      `Congratulations! "${timer.name}" has finished.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <FlatList
        data={Object.entries(groupedTimers)}
        keyExtractor={([category]) => category}
        renderItem={({ item: [category, categoryTimers] }) => (
          <TimerGroup
            category={category}
            timers={categoryTimers}
            onTimerComplete={handleTimerComplete}
          />
        )}
      />

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('AddTimer')}
      >
        <Text style={styles.addButtonText}>Add Timer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 16,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});