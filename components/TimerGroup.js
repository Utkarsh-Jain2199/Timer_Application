import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import TimerItem from './TimerItem';

export default function TimerGroup({ category, timers, onTimerComplete }) {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);
  const [animation] = useState(new Animated.Value(1));

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const startAll = () => {
    timers.forEach(timer => timer.start());
  };

  const pauseAll = () => {
    timers.forEach(timer => timer.pause());
  };

  const resetAll = () => {
    timers.forEach(timer => timer.reset());
  };

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={[styles.categoryTitle, { color: colors.text }]}>
          {category}
        </Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={startAll} style={styles.actionButton}>
            <Text>Start All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pauseAll} style={styles.actionButton}>
            <Text>Pause All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetAll} style={styles.actionButton}>
            <Text>Reset All</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.content,
          {
            maxHeight: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1000],
            }),
          },
        ]}
      >
        {timers.map(timer => (
          <TimerItem
            key={timer.id}
            timer={timer}
            onComplete={() => onTimerComplete(timer)}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#EEEEEE',
  },
  content: {
    overflow: 'hidden',
  },
});