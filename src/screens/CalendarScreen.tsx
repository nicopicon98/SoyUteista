import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Temporary placeholder view
export const CalendarScreen = () => (
  <View style={styles.container}>
    <Text>Calendar</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});