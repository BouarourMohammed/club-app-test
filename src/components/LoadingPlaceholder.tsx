import React from "react";
import { View, StyleSheet, Animated } from "react-native";

interface LoadingPlaceholderProps {
  width?: number | string;
  height?: number;
  style?: object;
}

const LoadingPlaceholder: React.FC<LoadingPlaceholderProps> = ({
  width = "100%",
  height = 20,
  style,
}) => {
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[styles.placeholder, { width, height, opacity }, style]}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
});

export default LoadingPlaceholder;
