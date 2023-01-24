import React from 'react'
import { Dimensions, View } from 'react-native';
import { SkeletonAnimation } from '../skeleton-animation/skeleton-animation.component';
import { SkeletonNew } from '../skeleton-new/skeleton-new.component';


const { width, height } = Dimensions.get('window');

export const SkeletonNews = () => {

  const titleWidth = width * 0.68;
  const titleHeight = height * 0.05;

  return (
    <View>
      <View style={{ marginTop: 20, marginLeft: 20 }}>
        <SkeletonAnimation height={titleHeight} width={titleWidth} />
      </View>
      <SkeletonNew />
      <SkeletonNew />
    </View>
  )
}
