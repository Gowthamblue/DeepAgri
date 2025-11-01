import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import MonitoringScreen from './src/screens/MonitoringScreen';
import PlantDetailScreen from './src/screens/PlantDetailScreen';
import { initialPlants } from './src/data/plantsData';

const Stack = createNativeStackNavigator();

export default function App() {
  const [plants, setPlants] = useState(initialPlants);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    console.log('🔄 Plants updated:', plants.length, 'plants');
  }, [plants]);

  // Separate intervals for different timing requirements
  useEffect(() => {
    const decreaseInterval = setInterval(() => {
      setPlants(prevPlants => 
        prevPlants.map(plant => {
          if (!plant.isWatering) {
            const newMoisture = Math.max(0, plant.moistureLevel - 1);
            
            let newValveStatus = plant.valveStatus;
            let newIsWatering = plant.isWatering;
            
            if (newMoisture <= plant.threshold && plant.valveStatus === 'OFF') {
              newValveStatus = 'ON';
              newIsWatering = true;
            }

            return {
              ...plant,
              moistureLevel: newMoisture,
              valveStatus: newValveStatus,
              isWatering: newIsWatering,
              lastUpdated: new Date().toISOString()
            };
          }
          return plant;
        })
      );
    }, 60000);

    const increaseInterval = setInterval(() => {
      setPlants(prevPlants => 
        prevPlants.map(plant => {
          if (plant.isWatering) {
            const newMoisture = Math.min(100, plant.moistureLevel + 1);
            
            let newValveStatus = plant.valveStatus;
            let newIsWatering = plant.isWatering;
            
            if (newMoisture >= 100) {
              newValveStatus = 'OFF';
              newIsWatering = false;
            }

            return {
              ...plant,
              moistureLevel: newMoisture,
              valveStatus: newValveStatus,
              isWatering: newIsWatering,
              lastUpdated: new Date().toISOString()
            };
          }
          return plant;
        })
      );
    }, 15000);

    return () => {
      clearInterval(decreaseInterval);
      clearInterval(increaseInterval);
    };
  }, []);

  // Update threshold
  const updatePlantThreshold = (plantId, newThreshold) => {
    setPlants(prevPlants => 
      prevPlants.map(plant => {
        if (plant.id === plantId) {
          let newValveStatus = plant.valveStatus;
          let newIsWatering = plant.isWatering;
          
          if (plant.moistureLevel <= newThreshold && plant.valveStatus === 'OFF') {
            newValveStatus = 'ON';
            newIsWatering = true;
          }

          return { 
            ...plant, 
            threshold: newThreshold,
            valveStatus: newValveStatus,
            isWatering: newIsWatering
          };
        }
        return plant;
      })
    );
  };

  // Manual valve control
  const manualValveControl = (plantId, valveStatus) => {
    setPlants(prevPlants => 
      prevPlants.map(plant => 
        plant.id === plantId 
          ? { 
              ...plant, 
              valveStatus: valveStatus,
              isWatering: valveStatus === 'ON',
              lastUpdated: new Date().toISOString()
            }
          : plant
      )
    );
  };

  // Manual moisture adjustment
  const manualMoistureAdjustment = (plantId, newMoistureLevel) => {
    setPlants(prevPlants => 
      prevPlants.map(plant => {
        if (plant.id === plantId) {
          let newValveStatus = plant.valveStatus;
          let newIsWatering = plant.isWatering;
          
          if (newMoistureLevel <= plant.threshold && plant.valveStatus === 'OFF') {
            newValveStatus = 'ON';
            newIsWatering = true;
          } else if (newMoistureLevel > plant.threshold && plant.valveStatus === 'ON') {
            newValveStatus = 'OFF';
            newIsWatering = false;
          }

          return { 
            ...plant, 
            moistureLevel: Math.max(0, Math.min(100, newMoistureLevel)),
            valveStatus: newValveStatus,
            isWatering: newIsWatering,
            lastUpdated: new Date().toISOString()
          };
        }
        return plant;
      })
    );
  };

  // ADD NEW PLANT FUNCTION
  const addNewPlant = (newPlant) => {
    console.log('➕ Adding new plant:', newPlant);
    setPlants(prevPlants => [...prevPlants, newPlant]);
  };

  // DELETE PLANT FUNCTION - UPDATED WITH OPTIONAL CALLBACK
  const deletePlant = (plantId, onSuccess) => {
    console.log('🗑️ DELETE FUNCTION CALLED for plant ID:', plantId);
    
    setPlants(prevPlants => {
      const newPlants = prevPlants.filter(plant => plant.id !== plantId);
      console.log('✅ Plants after deletion:', newPlants.length);
      
      // Force refresh
      setRefreshKey(prev => prev + 1);
      
      // Call success callback after state update (if provided)
      if (onSuccess && typeof onSuccess === 'function') {
        setTimeout(() => {
          onSuccess();
        }, 100);
      }
      
      return newPlants;
    });
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="Monitoring" 
          options={{ title: 'Plant Monitoring' }}
        >
          {(props) => (
            <MonitoringScreen 
              {...props} 
              plants={plants}
              onAddPlant={addNewPlant}
              onDeletePlant={deletePlant}
              onPlantPress={(plant) => props.navigation.navigate('PlantDetail', { plant })}
              refreshKey={refreshKey}
            />
          )}
        </Stack.Screen>
        
        <Stack.Screen 
          name="PlantDetail" 
          options={{ title: 'Plant Details' }}
        >
          {(props) => (
            <PlantDetailScreen 
              {...props} 
              plants={plants}
              updatePlantThreshold={updatePlantThreshold}
              manualValveControl={manualValveControl}
              manualMoistureAdjustment={manualMoistureAdjustment}
              onDeletePlant={deletePlant}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}