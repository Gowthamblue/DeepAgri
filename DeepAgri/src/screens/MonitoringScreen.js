import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PlantCard from '../components/PlantCard';
import AddPlantModal from '../components/AddPlantModal';

const MonitoringScreen = ({ plants, onPlantPress, onAddPlant, onDeletePlant, refreshKey }) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [localPlants, setLocalPlants] = useState(plants);

  // Update local plants when plants prop changes OR refreshKey changes
  useEffect(() => {
    console.log('🔄 MonitoringScreen: Updating plants, count:', plants.length);
    setLocalPlants(plants);
  }, [plants, refreshKey]);

  const renderPlantItem = ({ item }) => (
    <PlantCard plant={item} onPress={onPlantPress} />
  );

  const wateringCount = localPlants.filter(plant => plant.isWatering).length;

  const handleAddPlant = (newPlant) => {
    console.log('MonitoringScreen: Adding plant', newPlant);
    if (onAddPlant) {
      onAddPlant(newPlant);
    }
  };

  // Add a temporary test delete button
  const TestDeleteButton = () => {
    if (localPlants.length > 0) {
      return (
        <TouchableOpacity 
          style={[styles.testDeleteButton, { backgroundColor: 'red' }]}
          onPress={() => {
            const firstPlant = localPlants[0];
            console.log('🧪 TEST: Deleting first plant:', firstPlant.name);
            if (onDeletePlant) {
              onDeletePlant(firstPlant.id, () => {
                console.log('Test delete completed');
              });
            }
          }}
        >
          <Ionicons name="trash" size={16} color="white" />
          <Text style={styles.testDeleteText}>TEST DELETE</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Plant Monitoring</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Ionicons name="water" size={20} color="#2196F3" />
            <Text style={styles.statText}>{wateringCount} Watering</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="leaf" size={20} color="#4CAF50" />
            <Text style={styles.statText}>{localPlants.length} Plants</Text>
          </View>
        </View>
      </View>

      {/* Plants Grid */}
      <FlatList
        data={localPlants}
        renderItem={renderPlantItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        extraData={refreshKey}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="leaf-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No plants yet</Text>
            <Text style={styles.emptyStateSubtext}>Tap the + button to add your first plant</Text>
          </View>
        }
      />

      {/* Add Plant Floating Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setIsAddModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Test Delete Button (temporary)
      <TestDeleteButton /> */}

      {/* Add Plant Modal */}
      <AddPlantModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddPlant={handleAddPlant}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  listContent: {
    padding: 8,
    paddingBottom: 80,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    fontWeight: 'bold',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  testDeleteButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  testDeleteText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MonitoringScreen;