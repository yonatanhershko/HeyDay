/* eslint-disable react-native/no-unused-styles */
import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../styles/theme.js";
import { useUserStore } from "../../contexts/store/UserStore.js";
import { useMoodStore } from "../../contexts/store/MoodStore.js";
import HeyDayText from "../../components/general/low_level/Text/HeyDayText.js";
import MoodOption from "../../components/general/low_level/MoodOption.js";
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
            await submitMoodEntry(userInfo.userId);
            Alert.alert("Success!", "Your mood has been saved.", [
                { text: "OK", onPress: () => resetForm() },
            ]);
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
            color: "#333",
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
            borderColor: "#D6E0E0",
            borderWidth: 1,
            borderRadius: 12,
            padding: 16,
            fontSize: t.fontSize.base,
            minHeight: 60,
            backgroundColor: "#FAFAFA",
        },
        saveButton: {
            backgroundColor: t.colors.primary,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: "center",
            marginBottom: 20,
        },
        saveButtonDisabled: {
            backgroundColor: "#CCCCCC",
        },
        saveButtonText: {
            color: t.colors.textPrimary,
            fontSize: t.fontSize.base,
            fontFamily: t.fontFamily.rubikMedium,
        },
    });
