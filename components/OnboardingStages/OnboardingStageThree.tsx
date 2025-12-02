import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import HeyDayText from "../general/low_level/Text/HeyDayText";
import { useTheme } from "../../styles/theme";

interface OnboardingStageThreeProps {
    onComplete: (notificationHour: number) => void;
    onBack: () => void;
    userName: string;
}

const OnboardingStageThree: React.FC<OnboardingStageThreeProps> = ({ onComplete, onBack, userName }) => {
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const t = useTheme();
    const styles = makeStyles(t);
    const handleHourSelect = (hour: number) => {
        setSelectedHour(hour);
        console.log(`Selected notification hour: ${hour}:00`);
    };

    const handleComplete = () => {
        if (selectedHour !== null) {
            console.log(`Setting up daily reminder for ${selectedHour}:00`);
            onComplete(selectedHour);
        }
    };

    const handleSkip = () => {
        console.log('User skipped notification setup');
        onComplete(-1); // -1 indicates skipped
    };

    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    return (
        <View style={styles.container}>
            <HeyDayText style={styles.title}>Almost Done, {userName}!</HeyDayText>
            <HeyDayText style={styles.subtitle}>
                When would you like to receive your daily reminder?
            </HeyDayText>
            
            <View style={styles.hoursContainer}>
                {hours.map((hour) => (
                    <TouchableOpacity
                        key={hour}
                        style={[
                            styles.hourButton,
                            selectedHour === hour && styles.hourButtonSelected
                        ]}
                        onPress={() => handleHourSelect(hour)}
                    >
                        <HeyDayText style={[
                            styles.hourText,
                            selectedHour === hour && styles.hourTextSelected
                        ]}>
                            {hour}:00
                        </HeyDayText>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <HeyDayText style={styles.backButtonText}>Back</HeyDayText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <HeyDayText style={styles.skipButtonText}>Skip</HeyDayText>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, selectedHour === null && styles.buttonDisabled]} 
                    onPress={handleComplete}
                    disabled={selectedHour === null}
                >
                    <HeyDayText style={styles.buttonText}>Finish</HeyDayText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const makeStyles = (t) =>
    StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: t.fontSize.xl,
        fontFamily: t.fontFamily.rubikSemiBold,
        textAlign: 'center',
        marginBottom: 10,
        color: t.colors.textPrimary,
    },
    subtitle: {
        fontSize: t.fontSize.base,
        textAlign: 'center',
        marginBottom: 30,
        opacity: 0.7,
        color: t.colors.textPrimary,
    },
    hoursContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    hourButton: {
        backgroundColor: t.colors.greyExstraLight,
        paddingHorizontal: 18,
        paddingVertical: 15,
        borderRadius: 10,
        margin: 5,
        minWidth: 80,
    },
    hourButtonSelected: {
        backgroundColor: t.colors.primary,
    },
    hourText: {
        fontSize: t.fontSize.base,
        textAlign: 'center',
        color: t.colors.textPrimary,
    },
    hourTextSelected: {
        color: t.colors.white,
        fontFamily: t.fontFamily.rubikMedium,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10,
    },
    backButtonText: {
        color: t.colors.textMuted,
        fontSize: t.fontSize.base,
        fontFamily: t.fontFamily.rubikMedium,
        
    },
    skipButton: {
        backgroundColor: 'transparent',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10,
    },
    skipButtonText: {
        color: t.colors.textMuted,
        fontSize: t.fontSize.sm,
        fontFamily: t.fontFamily.rubikMedium,
    },
    button: {
        backgroundColor: t.colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonDisabled: {
        backgroundColor: t.colors.greyLine,
    },
    buttonText: {
        color: t.colors.textLight,
        fontSize: t.fontSize.base,
        fontFamily: t.fontFamily.rubikMedium,
    },
});

export default OnboardingStageThree;
