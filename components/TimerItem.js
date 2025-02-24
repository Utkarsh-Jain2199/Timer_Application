// components/TimerItem.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useTimer } from '../hooks/useTimer';

export default function TimerItem({ timer, onComplete }) {
  const { colors } = useTheme();
  const {
    remaining,
    isRunning,
    isCompleted,
    progress,
    start,
    pause,
    reset,
  } = useTimer(timer.duration);

  useEffect(() => {
    if (isCompleted && !timer.completed) {
      onComplete(timer);
    }
  }, [isCompleted, timer, onComplete]);

  const progressAnimation = new Animated.Value(progress);

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const getStatusColor = () => {
    if (isCompleted) return '#4CAF50';
    if (isRunning) return '#2196F3';
    return '#FFA000';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.name, { color: colors.text }]}>{timer.name}</Text>
        <View style={[styles.status, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>
            {isCompleted ? 'Completed' : isRunning ? 'Running' : 'Paused'}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: colors.primary,
            },
          ]}
        />
      </View>

      <View style={styles.details}>
        <Text style={[styles.time, { color: colors.text }]}>
          {Math.floor(remaining / 60)}:{(remaining % 60).toString().padStart(2, '0')}
        </Text>
        <View style={styles.controls}>
          {!isCompleted && (
            <>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={isRunning ? pause : start}
              >
                <Text style={styles.buttonText}>
                  {isRunning ? 'Pause' : 'Start'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.secondary }]}
                onPress={reset}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {timer.enableHalfwayAlert && remaining === Math.floor(timer.duration / 2) && (
        <View style={[styles.alert, { backgroundColor: colors.secondary }]}>
          <Text style={styles.alertText}>Halfway Point!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  alert: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
  },
  alertText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});