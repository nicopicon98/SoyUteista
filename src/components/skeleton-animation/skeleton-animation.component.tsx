import React, { useRef, useEffect } from 'react'
import { Dimensions, Animated, StyleSheet } from 'react-native';
import { colores } from '../../theme/appTheme';


interface SkeletonProps {
  variant?: 'box' | 'circle';
  width: string | number;
  height: string | number;
}

export const SkeletonAnimation = ({ width, height, variant = 'box' }: SkeletonProps) => {

  const opacity = useRef(new Animated.Value(0.3));

  let borderRadius = 3;

  if (variant === 'circle') {
    borderRadius = typeof height === 'string' ? parseInt(height) / 2 : height / 2;
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800
        })
      ])).start();

  }, [opacity])


  return (
    <Animated.View style={[{
      opacity: opacity.current,
      height,
      width,
      borderRadius,
    }, styles.skeleton]} />
  )
}


const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colores.Cool_Gray_5_C
  }
});