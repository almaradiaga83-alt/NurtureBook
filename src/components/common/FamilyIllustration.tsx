/**
 * Family Illustration Component
 * Better representation of the diverse family from the design
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

const FamilyIllustration: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.familyGroup}>
        {/* Father */}
        <View style={[styles.person, styles.father]}>
          <View style={styles.fatherHead}>
            <Text style={styles.fatherFace}>👨🏽</Text>
          </View>
          <View style={[styles.body, styles.fatherBody]} />
        </View>
        
        {/* Mother */}
        <View style={[styles.person, styles.mother]}>
          <View style={styles.motherHead}>
            <Text style={styles.motherFace}>👩🏽</Text>
          </View>
          <View style={[styles.body, styles.motherBody]} />
        </View>
        
        {/* Child 1 */}
        <View style={[styles.person, styles.child1]}>
          <View style={styles.childHead}>
            <Text style={styles.childFace}>👦🏽</Text>
          </View>
          <View style={[styles.body, styles.child1Body]} />
        </View>
        
        {/* Child 2 (baby) */}
        <View style={[styles.person, styles.child2]}>
          <View style={styles.babyHead}>
            <Text style={styles.babyFace}>👶🏽</Text>
          </View>
          <View style={[styles.body, styles.child2Body]} />
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
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  person: {
    alignItems: 'center',
  },
  father: {
    marginRight: spacing.xs,
  },
  mother: {
    marginLeft: spacing.xs,
  },
  child1: {
    marginTop: spacing.md,
    marginRight: spacing.sm,
  },
  child2: {
    marginTop: spacing.lg,
    marginLeft: spacing.sm,
  },
  fatherHead: {
    marginBottom: spacing.xs,
  },
  motherHead: {
    marginBottom: spacing.xs,
  },
  childHead: {
    marginBottom: spacing.xs,
  },
  babyHead: {
    marginBottom: spacing.xs,
  },
  fatherFace: {
    fontSize: 32,
  },
  motherFace: {
    fontSize: 32,
  },
  childFace: {
    fontSize: 28,
  },
  babyFace: {
    fontSize: 24,
  },
  body: {
    borderRadius: 8,
  },
  fatherBody: {
    width: 24,
    height: 32,
    backgroundColor: '#2d5a3d', // Green shirt
  },
  motherBody: {
    width: 24,
    height: 32,
    backgroundColor: '#f4a261', // Orange/yellow top
  },
  child1Body: {
    width: 20,
    height: 24,
    backgroundColor: '#457b9d', // Blue shirt
  },
  child2Body: {
    width: 16,
    height: 20,
    backgroundColor: '#f1faee', // Light clothing
  },
});

export default FamilyIllustration;