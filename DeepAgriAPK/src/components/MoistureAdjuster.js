import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MoistureAdjuster = ({ moistureLevel, onMoistureChange, onAutoCheck }) => {
  const adjustMoisture = (amount) => {
    const newLevel = Math.max(0, Math.min(100, moistureLevel + amount));
    onMoistureChange(newLevel);
    // Trigger automatic check after adjustment
    if (onAutoCheck) {
      setTimeout(() => onAutoCheck(), 100);
    }
  };

  const setMoisture = (level) => {
    onMoistureChange(level);
    // Trigger automatic check after setting moisture
    if (onAutoCheck) {
      setTimeout(() => onAutoCheck(), 100);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Adjust Moisture Level</Text>
      
      <View style={styles.quickButtons}>
        <TouchableOpacity 
          style={[styles.quickButton, { backgroundColor: '#f44336' }]}
          onPress={() => setMoisture(20)}
        >
          <Text style={styles.quickButtonText}>20%</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.quickButton, { backgroundColor: '#ffc107' }]}
          onPress={() => setMoisture(50)}
        >
          <Text style={styles.quickButtonText}>50%</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.quickButton, { backgroundColor: '#4caf50' }]}
          onPress={() => setMoisture(80)}
        >
          <Text style={styles.quickButtonText}>80%</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.adjustmentControls}>
        <TouchableOpacity 
          style={styles.adjustButton}
          onPress={() => adjustMoisture(-10)}
        >
          <Ionicons name="remove" size={24} color="#f44336" />
          <Text style={styles.adjustButtonText}>-10%</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.adjustButton}
          onPress={() => adjustMoisture(-5)}
        >
          <Ionicons name="remove" size={20} color="#ff9800" />
          <Text style={styles.adjustButtonText}>-5%</Text>
        </TouchableOpacity>

        <Text style={styles.currentLevel}>{moistureLevel}%</Text>

        <TouchableOpacity 
          style={styles.adjustButton}
          onPress={() => adjustMoisture(5)}
        >
          <Ionicons name="add" size={20} color="#4caf50" />
          <Text style={styles.adjustButtonText}>+5%</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.adjustButton}
          onPress={() => adjustMoisture(10)}
        >
          <Ionicons name="add" size={24} color="#4caf50" />
          <Text style={styles.adjustButtonText}>+10%</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.autoButton}
        onPress={() => onAutoCheck && onAutoCheck()}
      >
        <Ionicons name="refresh" size={16} color="#2196F3" />
        <Text style={styles.autoButtonText}>Check Automatic Watering</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  quickButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  quickButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  adjustmentControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adjustButton: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    minWidth: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  adjustButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  currentLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 50,
    textAlign: 'center',
  },
  autoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    marginTop: 12,
  },
  autoButtonText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default MoistureAdjuster;