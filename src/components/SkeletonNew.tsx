import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SkeletonAnimation } from './SkeletonAnimation';

const { width, height } = Dimensions.get('window');

export const SkeletonNew = () => {

  const categoryWidth = width * 0.13;
  const categoryHeight = height * 0.02;

  const imageWidth = width * 0.9;
  const imageHeight = height * 0.2;

  const newTitleWidth = width * 0.9;
  const newTitleHeight = height * 0.05;

  const excerptWidth = width * 0.9;
  const excerptHeight = height * 0.04;

  const dateWidth = width * 0.2;
  const dateHeight = height * 0.01;

  const authorWidth = width * 0.4;
  const authorHeight = height * 0.01;


  return (
    <View>
      {/* Category */}
      <View style={{ marginTop: 20, marginLeft: 20 }}>
        <SkeletonAnimation height={categoryHeight} width={categoryWidth} />
      </View>
      {/* Feature Image */}
      <View style={{ marginTop: 10, marginLeft: 20 }}>
        <SkeletonAnimation height={imageHeight} width={imageWidth} />
      </View>
      {/* News Title */}
      <View style={{ marginTop: 10, marginLeft: 20 }}>
        <SkeletonAnimation height={newTitleHeight} width={newTitleWidth} />
      </View>
      {/* Excerpt */}
      <View style={{ marginTop: 10, marginLeft: 20 }}>
        <SkeletonAnimation height={excerptHeight} width={excerptWidth} />
      </View>

      {/* Date */}
      <View style={styles.row}>
        <View style={{ marginTop: 10, marginLeft: 20 }}>
          <SkeletonAnimation variant='circle' height={20} width={20} />
        </View>
        <View style={{ marginTop: 10, marginLeft: 6 }}>
          <SkeletonAnimation height={dateHeight} width={dateWidth} />
        </View>
      </View>

      {/* Author */}
      <View style={{ ...styles.row }}>
        <View style={{ marginTop: 10, marginLeft: 20 }}>
          <SkeletonAnimation variant='circle' height={20} width={20} />
        </View>
        <View style={{ marginTop: 10, marginLeft: 6 }}>
          <SkeletonAnimation height={authorHeight} width={authorWidth} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
