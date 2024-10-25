import { defaultColors } from "@/constants/Colors";
import { globalStyles } from "@/constants/styles";
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const ShatterPlayButton = () => {
  const [shattered, setShattered] = useState(false);
  const scale = useSharedValue(1);

  // Predefined shatter styles for pieces
  const piecesStyles = Array.from({ length: 12 }).map(() => {
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    const rotation = Math.random() * 360;

    return useAnimatedStyle(() => ({
      transform: [
        { translateX: shattered ? withTiming(randomX, { duration: 650 }) : 0 },
        { translateY: shattered ? withTiming(randomY, { duration: 650 }) : 0 },
        { rotate: shattered ? withTiming(`${rotation}deg`, { duration: 650 }) : "0deg" },
      ],
      opacity: shattered ? withTiming(0, { duration: 850 }) : 1,
    }));
  });

  // Animation style for button scaling
  const scaleStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(scale.value, { duration: 100, easing: Easing.inOut(Easing.ease) }) },
    ],
  }));

  const handlePress = () => {
    scale.value = 0.9;
    setTimeout(() => {
      scale.value = 1;
      setShattered(true);
    }, 100);
  };

  return (
    <View style={styles.container}>
      {!shattered ? (
        <Pressable onPress={handlePress}>
          <Animated.View style={[styles.button, scaleStyle]}>
            <Text style={styles.buttonText}>Play</Text>
          </Animated.View>
        </Pressable>
      ) : (
        <View style={styles.piecesContainer}>
          {piecesStyles.map((style, index) => (
            <Animated.View key={index} style={[styles.piece, style]}>
              <Text style={styles.pieceText}>P</Text>
            </Animated.View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ShatterPlayButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#590080",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    color: defaultColors.gold,
    // fontWeight: "bold",
    fontFamily: globalStyles.text.fontFamily,
  },
  piecesContainer: {
    position: "absolute",
  },
  piece: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "#590080",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  pieceText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
});