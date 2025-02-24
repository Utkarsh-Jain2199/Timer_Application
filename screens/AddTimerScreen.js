import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Storage } from '../utils/storage';

export default function AddTimerScreen({ navigation, route }) {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [enableHalfwayAlert, setEnableHalfwayAlert] = useState(false);
  const [customCategories, setCustomCategories] = useState([
    'Workout',
    'Study',
    'Break',
    'Meditation',
    'Work',
  ]);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a timer name');
      return false;
    }
    
    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      Alert.alert('Error', 'Please enter a valid duration in seconds');
      return false;
    }
    
    if (!category) {
      Alert.alert('Error', 'Please select or create a category');
      return false;
    }
    
    return true;
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !customCategories.includes(newCategory.trim())) {
      setCustomCategories([...customCategories, newCategory.trim()]);
      setCategory(newCategory.trim());
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };

  const handleSaveTimer = async () => {
    if (!validateInputs()) return;
  
    try {
      const existingTimers = await Storage.getTimers();
      const newTimer = {
        id: Date.now().toString(),
        name: name.trim(),
        duration: parseInt(duration),
        category: category,
        enableHalfwayAlert,
        createdAt: new Date().toISOString(),
      };
  
      const updatedTimers = [...existingTimers, newTimer];
      await Storage.saveTimers(updatedTimers);
      
      // Add these two lines
      const { onTimerAdded } = route.params || {};
      if (onTimerAdded) {
        onTimerAdded();
      }
  
      Alert.alert(
        'Success',
        'Timer created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save timer. Please try again.');
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.title, { color: colors.text }]}>Create New Timer</Text>

      {/* Timer Name Input */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Timer Name</Text>
        <TextInput
          style={[
            styles.input,
            { 
              color: colors.text,
              backgroundColor: colors.border,
              borderColor: colors.primary,
            },
          ]}
          placeholder="Enter timer name"
          placeholderTextColor={colors.text + '80'}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Duration Input */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>
          Duration (seconds)
        </Text>
        <TextInput
          style={[
            styles.input,
            { 
              color: colors.text,
              backgroundColor: colors.border,
              borderColor: colors.primary,
            },
          ]}
          placeholder="Enter duration in seconds"
          placeholderTextColor={colors.text + '80'}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
      </View>

      {/* Category Selection */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Category</Text>
        <View style={styles.categoryContainer}>
          {customCategories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                { 
                  backgroundColor: category === cat ? colors.primary : colors.border,
                },
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  { color: category === cat ? '#FFFFFF' : colors.text },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.categoryButton, { backgroundColor: colors.secondary }]}
            onPress={() => setShowCategoryInput(true)}
          >
            <Text style={[styles.categoryButtonText, { color: '#FFFFFF' }]}>
              + New
            </Text>
          </TouchableOpacity>
        </View>

        {showCategoryInput && (
          <View style={styles.newCategoryContainer}>
            <TextInput
              style={[
                styles.input,
                { 
                  color: colors.text,
                  backgroundColor: colors.border,
                  borderColor: colors.primary,
                  flex: 1,
                },
              ]}
              placeholder="Enter new category"
              placeholderTextColor={colors.text + '80'}
              value={newCategory}
              onChangeText={setNewCategory}
            />
            <TouchableOpacity
              style={[styles.addCategoryButton, { backgroundColor: colors.primary }]}
              onPress={handleAddCategory}
            >
              <Text style={styles.addCategoryButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Halfway Alert Toggle */}
      <View style={[styles.inputGroup, styles.switchContainer]}>
        <Text style={[styles.label, { color: colors.text }]}>
          Enable Halfway Alert
        </Text>
        <Switch
          value={enableHalfwayAlert}
          onValueChange={setEnableHalfwayAlert}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={enableHalfwayAlert ? colors.secondary : '#f4f3f4'}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: colors.primary }]}
        onPress={handleSaveTimer}
      >
        <Text style={styles.saveButtonText}>Create Timer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  newCategoryContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  addCategoryButton: {
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addCategoryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveButton: {
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
