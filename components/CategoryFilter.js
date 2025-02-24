import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Categories</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: !selectedCategory ? colors.primary : colors.border,
            },
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <Text
            style={[
              styles.filterText,
              { color: !selectedCategory ? '#FFFFFF' : colors.text },
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  selectedCategory === category ? colors.primary : colors.border,
              },
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <View style={styles.categoryInfo}>
              <Text
                style={[
                  styles.filterText,
                  {
                    color:
                      selectedCategory === category ? '#FFFFFF' : colors.text,
                  },
                ]}
              >
                {category}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scrollContent: {
    paddingRight: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

// Add this extra component for badge counts (optional enhancement)
const CategoryBadge = ({ count, isSelected }) => (
  <View
    style={[
      styles.badge,
      {
        backgroundColor: isSelected ? '#FFFFFF' : '#666666',
      },
    ]}
  >
    <Text
      style={[
        styles.badgeText,
        {
          color: isSelected ? '#000000' : '#FFFFFF',
        },
      ]}
    >
      {count}
    </Text>
  </View>
);

const badgeStyles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});