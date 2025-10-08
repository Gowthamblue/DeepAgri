import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThresholdSlider from '../components/ThresholdSlider';
import MoistureAdjuster from '../components/MoistureAdjuster';

const PlantDetailScreen = ({ 
  route, 
  navigation,
  plants, 
  updatePlantThreshold, 
  manualValveControl, 
  manualMoistureAdjustment,
  onDeletePlant
}) => {
  const { plant } = route.params;
  
  const currentPlant = plants.find(p => p.id === plant.id) || plant;

  // DEBUG: Log all props when component renders
  console.log('🔍 PlantDetailScreen Props:', {
    hasRoute: !!route,
    hasNavigation: !!navigation,
    hasPlants: !!plants,
    plantsCount: plants?.length,
    hasUpdatePlantThreshold: !!updatePlantThreshold,
    hasManualValveControl: !!manualValveControl,
    hasManualMoistureAdjustment: !!manualMoistureAdjustment,
    hasOnDeletePlant: !!onDeletePlant,
    currentPlantId: currentPlant?.id
  });

  const getStatusColor = () => {
    return currentPlant.valveStatus === 'ON' ? '#4CAF50' : '#f44336';
  };

  const getMoistureColor = () => {
    if (currentPlant.moistureLevel < 30) return '#f44336';
    if (currentPlant.moistureLevel < 60) return '#ffc107';
    return '#4caf50';
  };

  const handleThresholdChange = (newThreshold) => {
    if (updatePlantThreshold) {
      updatePlantThreshold(currentPlant.id, newThreshold);
    }
  };

  const handleValveToggle = () => {
    const newValveStatus = currentPlant.valveStatus === 'ON' ? 'OFF' : 'ON';
    if (manualValveControl) {
      manualValveControl(currentPlant.id, newValveStatus);
    }
  };

  const handleMoistureAdjust = (newMoistureLevel) => {
    if (manualMoistureAdjustment) {
      manualMoistureAdjustment(currentPlant.id, newMoistureLevel);
    }
  };

  // TEST DELETE FUNCTION - SIMPLE VERSION
  const handleDelete = () => {
    console.log('🎯 DELETE BUTTON CLICKED');
    console.log('📋 onDeletePlant available:', !!onDeletePlant);
    console.log('🆔 Plant ID to delete:', currentPlant.id);
    
    Alert.alert(
      'Delete Plant',
      `Are you sure you want to delete "${currentPlant.name}"?`,
      [
        { text: 'Cancel', style: 'cancel', onPress: () => console.log('❌ Delete cancelled') },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            console.log('✅ User confirmed deletion');
            
            if (onDeletePlant) {
              console.log('🚀 Calling onDeletePlant...');
              onDeletePlant(currentPlant.id, () => {
                console.log('🎉 Delete callback executed');
                if (navigation && navigation.goBack) {
                  console.log('🔙 Navigating back...');
                  navigation.goBack();
                }
              });
            } else {
              console.error('💥 onDeletePlant is NOT available');
              Alert.alert('Error', 'Delete function not available. Check console for details.');
            }
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.plantName}>{currentPlant.name}</Text>
        <Text style={styles.plantId}>ID: {currentPlant.id}</Text>
        <Text style={styles.lastUpdated}>
          Updated: {new Date(currentPlant.lastUpdated).toLocaleTimeString()}
        </Text>
      </View>

      {/* Moisture Display */}
      <View style={styles.moistureCard}>
        <View style={styles.moistureHeader}>
          <Ionicons name="thermometer" size={24} color={getMoistureColor()} />
          <Text style={styles.moistureTitle}>Soil Moisture: {currentPlant.moistureLevel}%</Text>
        </View>
        <View style={styles.moistureBar}>
          <View 
            style={[
              styles.moistureFill, 
              { 
                width: `${currentPlant.moistureLevel}%`,
                backgroundColor: getMoistureColor()
              }
            ]} 
          />
        </View>
      </View>

      {/* Manual Controls */}
      <View style={styles.controlCard}>
        <Text style={styles.controlTitle}>Manual Moisture Control</Text>
        <MoistureAdjuster 
          moistureLevel={currentPlant.moistureLevel}
          onMoistureChange={handleMoistureAdjust}
        />
      </View>

      {/* Valve Control */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Ionicons 
            name={currentPlant.valveStatus === 'ON' ? 'water' : 'water-outline'} 
            size={24} 
            color={getStatusColor()} 
          />
          <Text style={styles.statusTitle}>Water Valve Control</Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.valveButton, 
            { backgroundColor: getStatusColor() }
          ]}
          onPress={handleValveToggle}
        >
          <Ionicons 
            name={currentPlant.valveStatus === 'ON' ? 'pause' : 'play'} 
            size={20} 
            color="white" 
          />
          <Text style={styles.valveButtonText}>
            {currentPlant.valveStatus === 'ON' ? 'TURN VALVE OFF' : 'TURN VALVE ON'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.statusText}>
          Status: {currentPlant.valveStatus} {currentPlant.isWatering ? '(Watering...)' : ''}
        </Text>
      </View>

      {/* Threshold Setting */}
      <View style={styles.thresholdCard}>
        <ThresholdSlider 
          threshold={currentPlant.threshold}
          onThresholdChange={handleThresholdChange}
        />
        <Text style={styles.thresholdInfo}>
          Auto-watering threshold: {currentPlant.threshold}%
        </Text>
      </View>

      {/* DELETE BUTTON */}
      <View style={styles.deleteSection}>
        <Text style={styles.deleteTitle}>Delete Plant</Text>
        <Text style={styles.deleteWarning}>
          Warning: This action cannot be undone
        </Text>
        {/* <TouchableOpacity 
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Ionicons name="trash" size={20} color="white" />
          <Text style={styles.deleteButtonText}>DELETE PLANT</Text>
        </TouchableOpacity> */}
        
        {/* Test Button */}
        <TouchableOpacity 
          style={[styles.deleteButton, { backgroundColor: '#f44336', marginTop: 10 }]}
          onPress={() => {
            console.log('🧪 TEST: Direct function call');
            if (onDeletePlant) {
              onDeletePlant(currentPlant.id, () => {
                console.log('🧪 TEST: Direct call completed');
                navigation.goBack();
              });
            }
          }}
        >
          <Ionicons name="trash" size={20} color="white" />
          <Text style={styles.deleteButtonText}>DELETE PLANT</Text>
        </TouchableOpacity>
      </View>

      {/* Debug Info
      <View style={styles.debugCard}>
        <Text style={styles.debugTitle}>Debug Info</Text>
        <Text style={styles.debugText}>Plant ID: {currentPlant.id}</Text>
        <Text style={styles.debugText}>Total Plants: {plants.length}</Text>
        <Text style={styles.debugText}>onDeletePlant: {onDeletePlant ? '✅ AVAILABLE' : '❌ NOT AVAILABLE'}</Text>
        <Text style={styles.debugText}>updatePlantThreshold: {updatePlantThreshold ? '✅' : '❌'}</Text>
        <Text style={styles.debugText}>manualValveControl: {manualValveControl ? '✅' : '❌'}</Text>
        <Text style={styles.debugText}>manualMoistureAdjustment: {manualMoistureAdjustment ? '✅' : '❌'}</Text>
      </View> */}
    </ScrollView>
  );
};

// Keep all the same styles from previous version
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  plantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  plantId: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  moistureCard: {
    backgroundColor: 'white',
    padding: 20,
    margin: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moistureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  moistureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  moistureBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  moistureFill: {
    height: '100%',
    borderRadius: 4,
  },
  controlCard: {
    backgroundColor: 'white',
    padding: 20,
    margin: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: 'white',
    padding: 20,
    margin: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  valveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  valveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  thresholdCard: {
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thresholdInfo: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  deleteSection: {
    backgroundColor: 'white',
    padding: 20,
    margin: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  deleteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f44336',
    marginBottom: 8,
  },
  deleteWarning: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f44336',
    gap: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debugCard: {
    backgroundColor: '#ffeaa7',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#fdcb6e',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
  },
});

export default PlantDetailScreen;