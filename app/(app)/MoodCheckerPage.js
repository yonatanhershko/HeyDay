/* eslint-disable react-native/no-unused-styles */
import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Modal,
    Animated,
    Dimensions,
    Image,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../styles/theme.js";
import { useUserStore } from "../../contexts/store/UserStore.js";
import { useMoodStore } from "../../contexts/store/MoodStore.js";
import { useStreakStore } from "../../contexts/store/StreakStore.js";
import HeyDayText from "../../components/general/low_level/Text/HeyDayText.js";
import MoodOption from "../../components/general/low_level/MoodOption.js";
import HeyDayIcon from "../../components/general/low_level/HeyDayIcon.js";
import i18n, { isRTL } from "../../i18n.config.js";
import {
    OkeyMoodOne,
    BadMoodOne,
    GoodMoodOne,
    AmazingMoodOne,
    AwfulMoodOne,
} from "../../components/general/low_level/MoodPack";
import FlowerBackground from "../../components/general/low_level/FlowerBackground.tsx";

const MOOD_OPTIONS = [
    { id: "1", label: "Awful", emoji: AwfulMoodOne },
    { id: "2", label: "Bad", emoji: BadMoodOne },
    { id: "3", label: "Okay", emoji: OkeyMoodOne },
    { id: "4", label: "Good", emoji: GoodMoodOne },
    { id: "5", label: "Amazing", emoji: AmazingMoodOne },
];

const { height } = Dimensions.get("window");

export default function MoodCheckerPage() {
    const router = useRouter();
    const t = useTheme();
    const styles = makeStyles(t);

    const { userInfo } = useUserStore();
    const {
        selectedMood,
        moodNote,
        isSubmitting,
        setSelectedMood,
        setMoodNote,
        submitMoodEntry,
        resetForm,
    } = useMoodStore();
    const { streakCount, loadStreak, logMood } = useStreakStore();

    // Modal state and animation
    const [showStreakModal, setShowStreakModal] = useState(false);
    const slideAnim = useRef(new Animated.Value(height)).current;

    // Load user streak data when component mounts
    useEffect(() => {
        if (userInfo?.userId) {
            console.log("Loading streak for user:", userInfo.userId);
            loadStreak(userInfo.userId);
        }
    }, [userInfo?.userId, loadStreak]);

    // Handle modal animations
    useEffect(() => {
        if (showStreakModal) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 50,
                friction: 8,
            }).start();
        }
    }, [showStreakModal]);

    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setShowStreakModal(false);
            resetForm();
            router.push("/home");
        });
    };

    const handleMoodSelect = (moodId) => {
        setSelectedMood(moodId);
    };

    const handleTextChange = (text) => {
        // Remove forbidden characters: < > [ ] = || {}
        const cleanText = text.replace(/[<>\[\]=|{}]/g, "");
        setMoodNote(cleanText);
    };

    const handleSave = async () => {
        if (!selectedMood) {
            Alert.alert(
                "Please select a mood",
                "Choose how you're feeling before saving."
            );
            return;
        }

        if (!userInfo?.userId) {
            Alert.alert("Error", "User not found. Please try again.");
            return;
        }

        try {
            // Save mood entry
            await submitMoodEntry(userInfo.userId);

            await logMood(userInfo.userId);
            await loadStreak(userInfo.userId);
            const currentStreak = useStreakStore.getState().streakCount;

            // Show streak modal only if user has a streak (streak > 0) change it for test
            if (currentStreak > -1) {
                setShowStreakModal(true);
            } else {
                resetForm();
                router.push("/home");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to save mood. Please try again.");
        }
    };

    const renderMoodOption = (mood) => (
        <MoodOption
            key={mood.id}
            img={mood.emoji}
            label={mood.label}
            onPress={() => handleMoodSelect(mood.id)}
            isSelected={selectedMood === mood.id}
        />
    );

    return (
        <View style={styles.container}>
            {/* Background Flowers */}
            <FlowerBackground count={8} />
            <View style={styles.content}>
                {/* Header */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.closeButton}
                >
                    <MaterialIcons name="close" size={26} color="#333" />
                </TouchableOpacity>
                <View style={styles.header}>
                    <HeyDayText style={styles.title}>
                        How are you Today?
                    </HeyDayText>
                </View>

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Mood Options Grid */}
                    <View style={styles.moodGrid}>
                        <View style={styles.moodRow}>
                            {renderMoodOption(MOOD_OPTIONS[0])}
                            {renderMoodOption(MOOD_OPTIONS[1])}
                        </View>
                        <View style={styles.moodRow}>
                            {renderMoodOption(MOOD_OPTIONS[2])}
                            {renderMoodOption(MOOD_OPTIONS[3])}
                        </View>
                        <View style={styles.moodRowCenter}>
                            {renderMoodOption(MOOD_OPTIONS[4])}
                        </View>
                    </View>

                    {/* Text Input */}
                    <View style={styles.noteSection}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="What's on your mind?"
                            placeholderTextColor={t.colors.textPrimary}
                            value={moodNote}
                            onChangeText={handleTextChange}
                            multiline
                            maxLength={200}
                        />
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            (!selectedMood || isSubmitting) &&
                                styles.saveButtonDisabled,
                        ]}
                        onPress={handleSave}
                        disabled={!selectedMood || isSubmitting}
                    >
                        <HeyDayText style={styles.saveButtonText}>
                            {isSubmitting ? "Saving..." : "Save"}
                        </HeyDayText>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Streak Modal */}
            <Modal
                visible={showStreakModal}
                transparent={true}
                animationType="none"
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <Animated.View
                        style={[
                            styles.modalContent,
                            {
                                transform: [{ translateY: slideAnim }],
                            },
                        ]}
                    >
                        {/* Bunny Image */}
                        <View style={styles.bunnyContainer}>
                            <Image
                                source={require("../../assets/images/MoodIcons/AmazingMoodOne.png")}
                                style={styles.bunnyImage}
                                resizeMode="contain"
                            />
                        </View>

                        {/* Congratulations Text */}
                        <HeyDayText style={styles.modalTitle}>
                            Amazing Streak!
                        </HeyDayText>

                        {/* Fire Icons Row */}
                        <View style={styles.fireIconsContainer}>
                            {Array.from({
                                length: Math.min(streakCount, 7),
                            }).map((_, index) => {
                                const isLastYellowFire =
                                    index === Math.min(streakCount, 7) - 1;

                                if (isLastYellowFire) {
                                    return (
                                        <View
                                            key={index}
                                            style={styles.fireIconWrapper}
                                        >
                                            <Image
                                                source={require("../../assets/gifs/StreakLoop.gif")}
                                                style={styles.streakGif}
                                                resizeMode="contain"
                                            />
                                            <HeyDayIcon
                                                name="fire"
                                                size={32}
                                                color="#FFC300"
                                            />
                                        </View>
                                    );
                                }

                                return (
                                    <HeyDayIcon
                                        key={index}
                                        name="fire"
                                        size={32}
                                        color="#FFC300"
                                    />
                                );
                            })}
                            {/* Show gray fires for remaining days up to 7 */}
                            {streakCount < 7 &&
                                Array.from({ length: 7 - streakCount }).map(
                                    (_, index) => (
                                        <HeyDayIcon
                                            key={`gray-${index}`}
                                            name="fire"
                                            size={32}
                                            color="#AAAAAA"
                                        />
                                    )
                                )}
                        </View>

                        {/* Streak Number */}
                        <HeyDayText style={styles.streakNumber}>
                            {streakCount} Day{streakCount !== 1 ? "s" : ""}{" "}
                            Streak!
                        </HeyDayText>

                        {/* Continue Button */}
                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={closeModal}
                        >
                            <HeyDayText style={styles.continueButtonText}>
                                Continue
                            </HeyDayText>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}

const makeStyles = (t) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 20,
        },
        content: {
            flex: 1,
            position: "relative",
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 60,
            paddingBottom: 20,
        },
        closeButton: {
            position: "absolute",
            ...(isRTL ? { left: 20 } : { right: 20 }),
            top: 20,
        },
        title: {
            fontSize: 20,
            fontWeight: "600",
            color: t.colors.textPrimary,
        },
        content: {
            flex: 1,
        },
        moodGrid: {
            alignItems: "center",
            marginBottom: 20,
        },
        moodRow: {
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 16,
        },
        moodRowCenter: {
            alignItems: "center",
        },
        emoji: {
            fontSize: 40,
        },
        noteSection: {
            marginBottom: 20,
        },
        textInput: {
            borderColor: t.colors.border,
            borderWidth: 1,
            borderRadius: 12,
            padding: 16,
            fontSize: t.fontSize.base,
            minHeight: 60,
            backgroundColor: t.colors.background,
            color: t.colors.textPrimary,
        },
        saveButton: {
            backgroundColor: t.colors.primary,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
            marginBottom: 20,
        },
        saveButtonDisabled: {
            backgroundColor: t.colors.disabled,
        },
        saveButtonText: {
            color: t.colors.textPrimary,
            fontSize: t.fontSize.base,
            fontFamily: t.fontFamily.rubikMedium,
        },
        // Modal styles
        modalOverlay: {
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
        },
        modalContent: {
            backgroundColor: "#D1F0E1",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 30,
            paddingTop: 40,
            paddingBottom: 40,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: -2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        bunnyImage: {
            width: 120,
            height: 120,
        },
        bunnyContainer: {
            backgroundColor: "#A6D9D9",
            padding: 12,
            borderRadius: 100,
        },
        modalTitle: {
            fontSize: 24,
            fontWeight: "700",
            color: "#333",
            marginVertical: 12,
            textAlign: "center",
        },
        fireIconsContainer: {
            flexDirection: "row-reverse",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: 8,
            marginBottom: 20,
            flexWrap: "wrap",
        },
        fireIconWrapper: {
            alignItems: "center",
            justifyContent: "center",
        },
        streakGif: {
            width: 40,
            height: 40,
        },
        streakNumber: {
            fontSize: 20,
            fontWeight: "600",
            color: "#FFC300",
            marginBottom: 30,
            textAlign: "center",
        },
        continueButton: {
            backgroundColor: t.colors.primary,
            borderRadius: 12,
            paddingVertical: 16,
            paddingHorizontal: 60,
            alignItems: "center",
        },
        continueButtonText: {
            color: t.colors.textPrimary,
            fontSize: t.fontSize.base,
            fontWeight: "600",
        },
    });
