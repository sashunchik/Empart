import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const loadingText = 'Empart';
  const animatedValues = useRef(loadingText.split('').map(() => new Animated.Value(0))).current;
  const scaleValues = useRef(loadingText.split('').map(() => new Animated.Value(1))).current;


  useEffect(() => {
    const appearAnimations = animatedValues.map((animValue, index) =>
      Animated.timing(animValue, {
        toValue: 1,
        duration: 300,
        delay: index * 300,
        useNativeDriver: true,
      })
    );

    Animated.stagger(100, appearAnimations).start(() => {
      startWaveAnimation();
    });

  }, []);

  const startWaveAnimation = () => {
    const animations = scaleValues.map((scale, index) =>
      Animated.sequence([
        Animated.delay(index * 100),
        Animated.timing(scale, {
          toValue: 1.3,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.loop(Animated.stagger(100, animations)).start();
  };


  return (
    <LinearGradient colors={['#9880B5', '#FEBAA4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      {loadingText.split('').map((letter, index) => {
        const opacity = animatedValues[index];
        const translateX = opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [-10, 0],
        });

        return (
          <Animated.Text
            key={index}
            style={[
              styles.text,
              {
                opacity,
                transform: [
                  { translateX },
                  { scale: scaleValues[index] }
                ],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
});
