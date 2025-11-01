// Simplified moisture simulator
export class MoistureSimulator {
  constructor(plants, updatePlant) {
    this.plants = plants;
    this.updatePlant = updatePlant;
    this.intervals = {};
    this.isWatering = {}; // Track watering state per plant
  }

  startSimulation() {
    this.plants.forEach(plant => {
      this.intervals[plant.id] = setInterval(() => {
        this.updatePlantState(plant.id);
      }, 2000); // Update every 2 seconds
    });
  }

  stopSimulation() {
    Object.values(this.intervals).forEach(interval => {
      clearInterval(interval);
    });
  }

  updatePlantState(plantId) {
    const plant = this.plants.find(p => p.id === plantId);
    if (!plant) return;

    let newMoisture = plant.moistureLevel;
    let newValveStatus = plant.valveStatus;
    let newIsWatering = plant.isWatering;

    // If watering, increase moisture by 2% every cycle
    if (plant.isWatering) {
      newMoisture = Math.min(100, plant.moistureLevel + 2);
      console.log(`🌊 Watering plant ${plantId}: ${plant.moistureLevel}% → ${newMoisture}%`);
      
      // Stop watering if reached 100%
      if (newMoisture >= 100) {
        newValveStatus = 'OFF';
        newIsWatering = false;
        console.log(`✅ Plant ${plantId} reached 100%, stopping watering`);
      }
    } 
    // If not watering, decrease moisture by 1% every cycle
    else {
      newMoisture = Math.max(0, plant.moistureLevel - 1);
      
      // Auto-start watering if below threshold
      if (newMoisture <= plant.threshold && plant.valveStatus === 'OFF') {
        newValveStatus = 'ON';
        newIsWatering = true;
        console.log(`🚰 Auto-start watering plant ${plantId}: ${newMoisture}% ≤ ${plant.threshold}%`);
      }
    }

    // Update plant if anything changed
    if (newMoisture !== plant.moistureLevel || newValveStatus !== plant.valveStatus) {
      this.updatePlant(plantId, {
        moistureLevel: newMoisture,
        valveStatus: newValveStatus,
        isWatering: newIsWatering,
        lastUpdated: new Date().toISOString()
      });
    }
  }

  // Manual valve control
  manualValveControl(plantId, valveStatus) {
    const plant = this.plants.find(p => p.id === plantId);
    if (!plant) return;

    console.log(`🎮 Manual valve control: plant ${plantId} → ${valveStatus}`);
    
    this.updatePlant(plantId, {
      valveStatus: valveStatus,
      isWatering: valveStatus === 'ON',
      lastUpdated: new Date().toISOString()
    });
  }

  // Manual moisture adjustment
  manualMoistureAdjustment(plantId, newMoistureLevel) {
    const plant = this.plants.find(p => p.id === plantId);
    if (!plant) return;

    console.log(`🎮 Manual moisture: plant ${plantId} → ${newMoistureLevel}%`);
    
    this.updatePlant(plantId, {
      moistureLevel: Math.max(0, Math.min(100, newMoistureLevel)),
      lastUpdated: new Date().toISOString()
    });

    // Check if we need to auto-start watering after manual adjustment
    setTimeout(() => {
      this.checkAutoWatering(plantId);
    }, 100);
  }

  // Check and trigger automatic watering
  checkAutoWatering(plantId) {
    const plant = this.plants.find(p => p.id === plantId);
    if (!plant || plant.isWatering) return;

    if (plant.moistureLevel <= plant.threshold && plant.valveStatus === 'OFF') {
      console.log(`🔍 Auto-check: Starting watering for plant ${plantId}`);
      this.manualValveControl(plantId, 'ON');
    }
  }

  // Update threshold
  updateThreshold(plantId, newThreshold) {
    const plant = this.plants.find(p => p.id === plantId);
    if (!plant) return;

    console.log(`📊 Threshold update: plant ${plantId} → ${newThreshold}%`);
    
    this.updatePlant(plantId, {
      threshold: newThreshold
    });

    // Check watering after threshold change
    setTimeout(() => {
      this.checkAutoWatering(plantId);
    }, 100);
  }
}