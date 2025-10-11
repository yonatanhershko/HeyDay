import React, { useState } from "react";
import { 
    View, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView 
} from "react-native";
import HeyDayText from "../general/low_level/Text/HeyDayText";
import { useTheme } from "../../styles/theme";

interface OnboardingStageOneProps {
    onNext: (name: string) => void;
    initialName?: string;
}

const OnboardingStageOne: React.FC<OnboardingStageOneProps> = ({ onNext, initialName = "" }) => {
    const [name, setName] = useState(initialName);
    const t = useTheme();
    const styles = makeStyles(t);

    const handleNext = () => {
        if (name.trim()) {
            onNext(name.trim());
        }
    };
    const handleTextChange = (text: string) => {
        // Remove forbidden characters: < > [ ] = || {}
        const cleanText = text.replace(/[<>\[\]=|{}]/g, "");
        setName(cleanText);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer} 
                keyboardShouldPersistTaps="handled"
            >
                <HeyDayText style={styles.title}>Welcome to HeyDay!</HeyDayText>
                <HeyDayText style={styles.subtitle}>Let's start by getting to know you</HeyDayText>
                
                <View style={styles.inputContainer}>
                    <HeyDayText style={styles.label}>What's your name?</HeyDayText>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={handleTextChange}
                        placeholder="Enter your name"
                        placeholderTextColor="#999"
                        returnKeyType="done"
                    />
                </View>

                <TouchableOpacity 
                    style={[styles.button, !name.trim() && styles.buttonDisabled]} 
                    onPress={handleNext}
                    disabled={!name.trim()}
                >
                    <HeyDayText style={styles.buttonText}>Continue</HeyDayText>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const makeStyles = (t) =>
    StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: t.fontSize.xl,
        fontFamily: t.fontFamily.rubikSemiBold,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: t.fontSize.base,
        textAlign: 'center',
        marginBottom: 40,
        opacity: 0.7,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 40,
    },
    label: {
        fontSize: t.fontSize.md,
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: t.colors.border,
        borderRadius: 10,
        padding: 15,
        fontSize: t.fontSize.base,
        textAlign: 'center',
        backgroundColor: t.colors.background,
    },
    button: {
        backgroundColor: t.colors.primary,
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
        minWidth: 120,
    },
    buttonDisabled: {
        backgroundColor: t.colors.disabled,
    },
    buttonText: {
        color: t.colors.textLight,
        fontSize: t.fontSize.base,
        fontFamily: t.fontFamily.rubikMedium,
        textAlign: 'center',
    },
});

export default OnboardingStageOne;