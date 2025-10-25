/**
 * Family Illustration Component
 * Uses the uploaded family icon image
 */

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const FamilyIllustration: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/family-icon.png')}
        style={styles.familyImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  familyImage: {
    width: 200,
    height: 200,
  },
});

export default FamilyIllustration;