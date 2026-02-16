import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useThemeStore } from '../store/themeStore';
import Card from '../components/Card';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { theme } = useThemeStore();
  const { id, title } = route.params;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Card
          title="Item Details"
          subtitle={`ID: ${id}`}
        >
          <View style={styles.detailSection}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Title
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {title || 'No title provided'}
            </Text>
          </View>

          <View style={styles.detailSection}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Description
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              This is a detailed view of the selected item. In a real application, 
              you would fetch the complete details from your API and display them here.
            </Text>
          </View>

          <View style={styles.detailSection}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Created At
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </View>

          <View style={styles.detailSection}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Status
            </Text>
            <View style={styles.statusBadge}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: theme.colors.success },
                ]}
              />
              <Text style={[styles.statusText, { color: theme.colors.text }]}>
                Active
              </Text>
            </View>
          </View>
        </Card>

        <Card title="Actions" style={styles.actionsCard}>
          <View style={styles.actionsContainer}>
            <Button
              title="Share"
              variant="secondary"
              onPress={() => {
                // Implement share functionality
                console.log('Share pressed');
              }}
              style={styles.actionButton}
            />
            <Button
              title="Edit"
              variant="outline"
              onPress={() => {
                // Implement edit functionality
                console.log('Edit pressed');
              }}
              style={styles.actionButton}
            />
          </View>
        </Card>

        <Button
          title="Go Back"
          variant="ghost"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  detailSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    lineHeight: 24,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
  },
  actionsCard: {
    marginTop: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  backButton: {
    marginTop: 24,
    marginHorizontal: 16,
  },
});

export default DetailsScreen;
