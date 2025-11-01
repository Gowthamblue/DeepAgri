import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  StyleSheet,
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const AddPlantModal = ({ visible, onClose, onAddPlant }) => {
  const [plantName, setPlantName] = useState('');
  const [moistureLevel, setMoistureLevel] = useState(50);
  const [threshold, setThreshold] = useState(30);

  const handleAddPlant = () => {
    if (plantName.trim() === '') {
      alert('Please enter a plant name');
      return;
    }

    const newPlant = {
      id: Date.now(), // Use timestamp as unique ID
      name: plantName.trim(),
      moistureLevel: parseInt(moistureLevel),
      threshold: parseInt(threshold),
      valveStatus: moistureLevel <= threshold ? 'ON' : 'OFF',
      isWatering: moistureLevel <= threshold,
      lastUpdated: new Date().toISOString()
    };

    onAddPlant(newPlant);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setPlantName('');
    setMoistureLevel(50);
    setThreshold(30);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Plant</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.formContainer}>
            {/* Plant Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Plant Name</Text>
              <TextInput
                style={styles.textInput}
                value={plantName}
                onChangeText={setPlantName}
                placeholder="Enter plant name"
                placeholderTextColor="#999"
              />
            </View>

            {/* Moisture Level Slider */}
            <View style={styles.sliderGroup}>
              <Text style={styles.label}>
                Initial Moisture Level: {moistureLevel}%
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={moistureLevel}
                onValueChange={setMoistureLevel}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#2196F3"
              />
              <View style={styles.rangeLabels}>
                <Text style={styles.rangeText}>0%</Text>
                <Text style={styles.rangeText}>50%</Text>
                <Text style={styles.rangeText}>100%</Text>
              </View>
            </View>

            {/* Threshold Slider */}
            <View style={styles.sliderGroup}>
              <Text style={styles.label}>
                Watering Threshold: {threshold}%
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={5}
                value={threshold}
                onValueChange={setThreshold}
                minimumTrackTintColor="#FF9800"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#2196F3"
              />
              <View style={styles.rangeLabels}>
                <Text style={styles.rangeText}>0%</Text>
                <Text style={styles.rangeText}>50%</Text>
                <Text style={styles.rangeText}>100%</Text>
              </View>
              <Text style={styles.thresholdInfo}>
                Valve will turn ON automatically when moisture drops below {threshold}%
              </Text>
            </View>

            {/* Preview */}
            <View style={styles.previewCard}>
              <Text style={styles.previewTitle}>Preview</Text>
              <View style={styles.previewInfo}>
                <Text style={styles.previewText}>Name: {plantName || 'New Plant'}</Text>
                <Text style={styles.previewText}>Moisture: {moistureLevel}%</Text>
                <Text style={styles.previewText}>Threshold: {threshold}%</Text>
                <Text style={[
                  styles.previewText, 
                  { color: moistureLevel <= threshold ? '#4CAF50' : '#f44336' }
                ]}>
                  Valve: {moistureLevel <= threshold ? 'ON' : 'OFF'}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddPlant}
            >
              <Ionicons name="add" size={20} color="white" />
              <Text style={styles.addButtonText}>Add Plant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  sliderGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  rangeText: {
    fontSize: 12,
    color: '#666',
  },
  thresholdInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  previewCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  previewInfo: {
    gap: 4,
  },
  previewText: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  addButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

const handleAddPlant = () => {
  if (plantName.trim() === '') {
    alert('Please enter a plant name');
    return;
  }

  const newPlant = {
    id: Date.now(), // Use timestamp as unique ID
    name: plantName.trim(),
    moistureLevel: parseInt(moistureLevel),
    threshold: parseInt(threshold),
    valveStatus: moistureLevel <= threshold ? 'ON' : 'OFF',
    isWatering: moistureLevel <= threshold,
    lastUpdated: new Date().toISOString()
  };

  console.log('AddPlantModal: Creating new plant', newPlant);
  
  if (onAddPlant) {
    onAddPlant(newPlant);
  } else {
    console.error('onAddPlant function is not available in modal');
  }
  
  resetForm();
  onClose();
};

export default AddPlantModal;