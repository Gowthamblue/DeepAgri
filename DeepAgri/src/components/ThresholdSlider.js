import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const ThresholdSlider = ({ threshold, onThresholdChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Moisture Threshold: {threshold}%</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={5}
        value={threshold}
        onValueChange={onThresholdChange}
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
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
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
});

export default ThresholdSlider;