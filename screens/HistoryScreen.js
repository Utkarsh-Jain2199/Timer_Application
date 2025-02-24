// screens/HistoryScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Storage } from '../utils/storage';

export default function HistoryScreen() {
  const { colors } = useTheme();
  const [history, setHistory] = useState([]);
  const [groupBy, setGroupBy] = useState('date'); // 'date' or 'category'

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const savedHistory = await Storage.getHistory();
    setHistory(savedHistory);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const groupHistoryItems = () => {
    if (groupBy === 'date') {
      return history.reduce((groups, item) => {
        const date = new Date(item.completedAt).toLocaleDateString();
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(item);
        return groups;
      }, {});
    } else {
      return history.reduce((groups, item) => {
        const category = item.category;
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(item);
        return groups;
      }, {});
    }
  };

  const exportHistory = async () => {
    try {
      const jsonString = JSON.stringify(history, null, 2);
      await Share.share({
        message: jsonString,
        title: 'Timer History Export',
      });
    } catch (error) {
      console.error('Error exporting history:', error);
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={[styles.historyItem, { backgroundColor: colors.border }]}>
      <View style={styles.historyItemHeader}>
        <Text style={[styles.historyItemName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.historyItemCategory, { color: colors.secondary }]}>
          {item.category}
        </Text>
      </View>
      <View style={styles.historyItemDetails}>
        <Text style={[styles.historyItemTime, { color: colors.text }]}>
          Duration: {item.duration} seconds
        </Text>
        <Text style={[styles.historyItemDate, { color: colors.text }]}>
          Completed: {formatDate(item.completedAt)}
        </Text>
      </View>
    </View>
  );

  const renderGroupHeader = (title) => (
    <View style={[styles.groupHeader, { backgroundColor: colors.primary }]}>
      <Text style={styles.groupHeaderText}>{title}</Text>
    </View>
  );

  const groupedHistory = groupHistoryItems();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Timer History</Text>
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.groupingButton, { backgroundColor: colors.secondary }]}
            onPress={() => setGroupBy(groupBy === 'date' ? 'category' : 'date')}
          >
            <Text style={styles.buttonText}>
              Group by: {groupBy === 'date' ? 'Date' : 'Category'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.exportButton, { backgroundColor: colors.primary }]}
            onPress={exportHistory}
          >
            <Text style={styles.buttonText}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={Object.entries(groupedHistory)}
        keyExtractor={([group]) => group}
        renderItem={({ item: [group, items] }) => (
          <View>
            {renderGroupHeader(group)}
            <FlatList
              data={items}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              renderItem={renderHistoryItem}
              scrollEnabled={false}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  groupingButton: {
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  exportButton: {
    padding: 10,
    borderRadius: 8,
    width: 100,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  groupHeader: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  groupHeaderText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  historyItem: {
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyItemCategory: {
    fontSize: 14,
  },
  historyItemDetails: {
    gap: 4,
  },
  historyItemTime: {
    fontSize: 14,
  },
  historyItemDate: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

