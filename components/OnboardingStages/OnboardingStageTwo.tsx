import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import HeyDayText from "../general/low_level/Text/HeyDayText";

interface OnboardingStageTwoProps {
    onNext: (accepted: boolean) => void;
    onBack: () => void;
    initialAccepted?: boolean;
}

const OnboardingStageTwo: React.FC<OnboardingStageTwoProps> = ({ onNext, onBack, initialAccepted = false }) => {
    const [accepted, setAccepted] = useState(initialAccepted);

    const handleNext = () => {
        onNext(accepted);
    };

    return (
        <View style={styles.container}>
            <HeyDayText style={styles.title}>Terms & Conditions</HeyDayText>
            
            <ScrollView style={styles.termsContainer} showsVerticalScrollIndicator={true}>
                <HeyDayText style={styles.termsText}>
                    Welcome to HeyDay! By using our app, you agree to the following terms:
                    {'\n\n'}
                    1. Privacy: We respect your privacy and will protect your personal information.
                    {'\n\n'}
                    2. Usage: Use this app responsibly and in accordance with applicable laws.
                    {'\n\n'}
                    3. Content: You are responsible for any content you create or share.
                    {'\n\n'}
                    4. Updates: We may update these terms from time to time.
                    {'\n\n'}
                    5. Support: Contact us if you have any questions or concerns.
                    {'\n\n'}
                    By continuing, you acknowledge that you have read and agree to these terms.
                </HeyDayText>
            </ScrollView>

            <TouchableOpacity 
                style={[styles.checkbox, accepted && styles.checkboxChecked]}
                onPress={() => setAccepted(!accepted)}
            >
                <HeyDayText style={[styles.checkboxText, accepted && styles.checkboxTextChecked]}>
                    {accepted ? '✓' : ''} I agree to the Terms & Conditions
                </HeyDayText>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <HeyDayText style={styles.backButtonText}>Back</HeyDayText>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, !accepted && styles.buttonDisabled]} 
                    onPress={handleNext}
                    disabled={!accepted}
                >
                    <HeyDayText style={styles.buttonText}>Continue</HeyDayText>
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
        marginBottom: 20,
    },
    termsContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        maxHeight: 300,
    },
    termsText: {
        fontSize: 14,
        lineHeight: 20,
    },
    checkbox: {
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    checkboxChecked: {
        borderColor: '#007AFF',
        backgroundColor: '#f0f8ff',
    },
    checkboxText: {
        fontSize: 16,
        textAlign: 'center',
    },
    checkboxTextChecked: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    backButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 40,
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

export default OnboardingStageTwo;
