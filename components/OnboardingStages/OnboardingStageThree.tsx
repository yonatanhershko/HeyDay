import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import HeyDayText from "../general/low_level/Text/HeyDayText";

interface OnboardingStageThreeProps {
    onComplete: (notificationHour: number) => void;
    onBack: () => void;
    userName: string;
}

const OnboardingStageThree: React.FC<OnboardingStageThreeProps> = ({ onComplete, onBack, userName }) => {
    const [selectedHour, setSelectedHour] = useState<number | null>(null);

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        opacity: 0.7,
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
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        margin: 5,
        minWidth: 80,
    },
    hourButtonSelected: {
        backgroundColor: '#007AFF',
    },
    hourText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
    },
    hourTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10,
    },
    backButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
    },
    skipButton: {
        backgroundColor: 'transparent',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10,
    },
    skipButtonText: {
        color: '#666',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OnboardingStageThree;
