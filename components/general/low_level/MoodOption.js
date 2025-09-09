import React, { useRef } from "react";
import { Pressable, StyleSheet, Image, Animated } from "react-native";
import HeyDayText from "./Text/HeyDayText";
import { useTheme } from "../../../styles/theme.js";

const MoodOption = ({ img, label, onPress, isSelected }) => {
    const t = useTheme();
    const styles = makeStyles(t);
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const rotateAnimation = useRef(new Animated.Value(0)).current;

    const triggerShake = () => {
        shakeAnimation.setValue(0);
        rotateAnimation.setValue(0);
        
        Animated.parallel([
            // Shake animation
          
            // Rotation animation
            Animated.sequence([
                Animated.timing(rotateAnimation, {
                    toValue: 1,
                    duration: 60,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnimation, {
                    toValue: -1,
                    duration: 60,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnimation, {
                    toValue: 0,
                    duration: 60,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    };

    const handlePress = () => {
        triggerShake();
        onPress();
    };

    const rotateInterpolate = rotateAnimation.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-2deg', '2deg'],
    });

    return (
        <Animated.View
            style={{
                transform: [
                    { translateX: shakeAnimation },
                    { rotate: rotateInterpolate }
                ],
            }}
        >
            <Pressable
                onPress={handlePress}
                style={({ pressed }) => [
                  styles.container, isSelected && styles.selected,
                  pressed && { transform: [{ translateY: 2 }] },
                ]}
            >
                <Image style={styles.imageContainer} source={img} />
                <HeyDayText style={styles.label}>{label}</HeyDayText>
            </Pressable>
        </Animated.View>
    );
};

const makeStyles = (t) =>
    StyleSheet.create({
        container: {
            width: 120,
            height: 120,
            borderRadius: 16,
            borderWidth: 2,
            borderColor: t.colors.textPrimary,
            backgroundColor: t.colors.blueGrey,
            alignItems: "center",
            justifyContent: "center",
            margin: 8,
            padding: 12,
        },
        selected: {
            borderColor: t.colors.textPrimary,
            backgroundColor: t.colors.secondary,
        },
        imageContainer: {
            width: 70,
            height: 70,
            marginBottom: 8,
        },
        label: {
            fontSize: t.fontSize.base,
            fontFamily: t.fontFamily.rubikMedium,
            textAlign: "center",
            color: t.colors.textPrimary,
        },
    });

export default MoodOption;
