import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import HeyDayText from "../general/low_level/Text/HeyDayText";
import { useTheme } from "../../styles/theme";

interface OnboardingStageTwoProps {
    onNext: (accepted: boolean) => void;
    onBack: () => void;
    initialAccepted?: boolean;
}

const OnboardingStageTwo: React.FC<OnboardingStageTwoProps> = ({ onNext, onBack, initialAccepted = false }) => {
    const [accepted, setAccepted] = useState(initialAccepted);
    const t = useTheme();
    const styles = makeStyles(t);
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
                    {accepted ? '' : ''} I agree to the Terms & Conditions
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
        marginBottom: 20,
        color: t.colors.textPrimary,
    },
    termsContainer: {
        flex: 1,
        backgroundColor: t.colors.greyExstraLight,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        maxHeight: 300,
        color: t.colors.textPrimary,
    },
    termsText: {
        fontSize: t.fontSize.sm,
        lineHeight: 20,
        color: t.colors.textPrimary,
    },
    checkbox: {
        borderWidth: 2,
        borderColor: t.colors.border,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        backgroundColor: t.colors.background,
        color: t.colors.textPrimary,
    },
    checkboxChecked: {
        borderColor: t.colors.primary,
        backgroundColor: t.colors.background,
    },
    checkboxText: {
        fontSize: t.fontSize.base,
        textAlign: 'center',
        color: t.colors.textPrimary,
    },
    checkboxTextChecked: {
        color: t.colors.primary,
        fontFamily: t.fontFamily.rubikRegular,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    backButtonText: {
        color: t.colors.textMuted,
        fontSize: t.fontSize.base,
        fontFamily: t.fontFamily.rubikMedium,
    },
    button: {
        backgroundColor: t.colors.primary,
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonDisabled: {
        backgroundColor: t.colors.disabled,
    },
    buttonText: {
        color: t.colors.textLight,
        fontSize: t.fontSize.base,
        fontFamily: t.fontFamily.rubikMedium,
    },
});

export default OnboardingStageTwo;
