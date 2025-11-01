import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="leaf" size={80} color="#4CAF50" />
        <Text style={styles.title}>Heyy Birundha Loosu</Text>
        <Text style={styles.subtitle}>
          Smart Drip Irrigation System
        </Text>
      </View>
      
      <View style={styles.description}>
        <Text style={styles.descriptionText}>
          Monitor and control your drip irrigation system in real-time. 
          Automatic valve control based on soil moisture levels.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.startButton}
        onPress={() => navigation.navigate('Monitoring')}
      >
        <Text style={styles.startButtonText}>Start Monitoring</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
      
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Ionicons name="water" size={24} color="#2196F3" />
          <Text style={styles.featureText}>Automatic Valve Control</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="stats-chart" size={24} color="#4CAF50" />
          <Text style={styles.featureText}>Real-time Moisture Monitoring</Text>
        </View>
        <View style={styles.featureItem}>
          <Ionicons name="settings" size={24} color="#FF9800" />
          <Text style={styles.featureText}>Customizable Thresholds</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  features: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
});

export default HomeScreen;