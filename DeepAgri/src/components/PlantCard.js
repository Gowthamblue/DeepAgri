import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PlantCard = ({ plant, onPress }) => {
  const getBackgroundColor = () => {
    if (plant.isWatering) {
      return '#4CAF50'; // Green when watering
    }
    
    // Color based on moisture level
    if (plant.moistureLevel < 30) return '#FFCDD2'; // Light red
    if (plant.moistureLevel < 60) return '#FFF9C4'; // Light yellow
    return '#C8E6C9'; // Light green
  };

  const getMoistureColor = () => {
    if (plant.moistureLevel < 30) return '#f44336';
    if (plant.moistureLevel < 60) return '#ffc107';
    return '#4caf50';
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: getBackgroundColor() }]} 
      onPress={() => onPress(plant)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.plantName}>{plant.name}</Text>
        <Ionicons 
          name={plant.valveStatus === 'ON' ? 'water' : 'water-outline'} 
          size={24} 
          color={plant.valveStatus === 'ON' ? '#2196F3' : '#666'} 
        />
      </View>
      
      <View style={styles.moistureInfo}>
        <Text style={[styles.moistureText, { color: getMoistureColor() }]}>
          {plant.moistureLevel}%
        </Text>
        <Text style={styles.thresholdText}>
          Threshold: {plant.threshold}%
        </Text>
      </View>
      
      <View style={styles.statusContainer}>
        <View style={[
          styles.statusIndicator, 
          { backgroundColor: plant.valveStatus === 'ON' ? '#4CAF50' : '#9E9E9E' }
        ]}>
          <Text style={styles.statusText}>
            Valve: {plant.valveStatus}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 120,
    width: '45%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  moistureInfo: {
    marginBottom: 8,
  },
  moistureText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  thresholdText: {
    fontSize: 12,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default PlantCard;