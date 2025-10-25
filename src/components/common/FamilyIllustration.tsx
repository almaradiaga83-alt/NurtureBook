/**
 * Family Illustration Component
 * Illustrated family matching the design mockup
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

const FamilyIllustration: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.familyGroup}>
        {/* Father - back center */}
        <View style={[styles.person, styles.father]}>
          {/* Hair */}
          <View style={styles.fatherHair} />
          {/* Head */}
          <View style={styles.fatherHead}>
            {/* Eyes */}
            <View style={styles.fatherEyes}>
              <View style={styles.eye} />
              <View style={styles.eye} />
            </View>
            {/* Smile */}
            <View style={styles.smile} />
          </View>
          {/* Body */}
          <View style={styles.fatherBody} />
          {/* Arms */}
          <View style={styles.fatherLeftArm} />
          <View style={styles.fatherRightArm} />
        </View>
        
        {/* Mother - right */}
        <View style={[styles.person, styles.mother]}>
          {/* Hair */}
          <View style={styles.motherHair} />
          {/* Head */}
          <View style={styles.motherHead}>
            {/* Eyes */}
            <View style={styles.motherEyes}>
              <View style={styles.eye} />
              <View style={styles.eye} />
            </View>
            {/* Smile */}
            <View style={styles.smile} />
          </View>
          {/* Body */}
          <View style={styles.motherBody} />
          {/* Arms */}
          <View style={styles.motherLeftArm} />
          <View style={styles.motherRightArm} />
        </View>
        
        {/* Older Child - front left */}
        <View style={[styles.person, styles.olderChild]}>
          {/* Hair */}
          <View style={styles.childHair} />
          {/* Head */}
          <View style={styles.childHead}>
            {/* Eyes */}
            <View style={styles.childEyes}>
              <View style={styles.eyeSmall} />
              <View style={styles.eyeSmall} />
            </View>
            {/* Smile */}
            <View style={styles.smileSmall} />
          </View>
          {/* Body */}
          <View style={styles.olderChildBody} />
        </View>
        
        {/* Younger Child - center front */}
        <View style={[styles.person, styles.youngerChild]}>
          {/* Hair */}
          <View style={styles.babyHair} />
          {/* Head */}
          <View style={styles.babyHead}>
            {/* Eyes */}
            <View style={styles.babyEyes}>
              <View style={styles.eyeSmall} />
              <View style={styles.eyeSmall} />
            </View>
            {/* Smile */}
            <View style={styles.smileSmall} />
          </View>
          {/* Body */}
          <View style={styles.youngerChildBody} />
        </View>
      </View>
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
  familyGroup: {
    position: 'relative',
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  person: {
    position: 'absolute',
    alignItems: 'center',
  },
  
  // Father - back center
  father: {
    top: 5,
    left: 50,
    zIndex: 1,
  },
  fatherHair: {
    width: 50,
    height: 30,
    backgroundColor: '#2C1810',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    top: -5,
  },
  fatherHead: {
    width: 48,
    height: 52,
    backgroundColor: '#8B5A3C',
    borderRadius: 26,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fatherEyes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  eye: {
    width: 6,
    height: 6,
    backgroundColor: '#2C1810',
    borderRadius: 3,
  },
  smile: {
    width: 16,
    height: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#2C1810',
    marginTop: 6,
  },
  fatherBody: {
    width: 58,
    height: 72,
    backgroundColor: '#9CAF88',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  fatherLeftArm: {
    position: 'absolute',
    width: 18,
    height: 45,
    backgroundColor: '#9CAF88',
    borderRadius: 9,
    top: 55,
    left: -8,
    transform: [{ rotate: '20deg' }],
  },
  fatherRightArm: {
    position: 'absolute',
    width: 18,
    height: 45,
    backgroundColor: '#9CAF88',
    borderRadius: 9,
    top: 55,
    right: -8,
    transform: [{ rotate: '-20deg' }],
  },
  
  // Mother - right side
  mother: {
    top: 15,
    right: 10,
    zIndex: 2,
  },
  motherHair: {
    width: 48,
    height: 50,
    backgroundColor: '#2C1810',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'absolute',
    top: -8,
  },
  motherHead: {
    width: 44,
    height: 50,
    backgroundColor: '#A67C52',
    borderRadius: 25,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  motherEyes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  motherBody: {
    width: 54,
    height: 70,
    backgroundColor: '#F4C27C',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  motherLeftArm: {
    position: 'absolute',
    width: 16,
    height: 42,
    backgroundColor: '#F4C27C',
    borderRadius: 8,
    top: 52,
    left: -6,
    transform: [{ rotate: '15deg' }],
  },
  motherRightArm: {
    position: 'absolute',
    width: 16,
    height: 42,
    backgroundColor: '#F4C27C',
    borderRadius: 8,
    top: 52,
    right: -6,
    transform: [{ rotate: '-15deg' }],
  },
  
  // Older child - front left
  olderChild: {
    bottom: 10,
    left: 30,
    zIndex: 3,
  },
  childHair: {
    width: 38,
    height: 25,
    backgroundColor: '#2C1810',
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    position: 'absolute',
    top: -5,
  },
  childHead: {
    width: 36,
    height: 40,
    backgroundColor: '#9B7653',
    borderRadius: 20,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childEyes: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  eyeSmall: {
    width: 5,
    height: 5,
    backgroundColor: '#2C1810',
    borderRadius: 2.5,
  },
  smileSmall: {
    width: 12,
    height: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderColor: '#2C1810',
    marginTop: 4,
  },
  olderChildBody: {
    width: 44,
    height: 52,
    backgroundColor: '#5A7C8C',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  
  // Younger child - center front
  youngerChild: {
    bottom: 15,
    left: 85,
    zIndex: 4,
  },
  babyHair: {
    width: 32,
    height: 20,
    backgroundColor: '#2C1810',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    top: -3,
  },
  babyHead: {
    width: 32,
    height: 35,
    backgroundColor: '#A67C52',
    borderRadius: 18,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  babyEyes: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 8,
  },
  youngerChildBody: {
    width: 38,
    height: 44,
    backgroundColor: '#F5F5DC',
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});

export default FamilyIllustration;