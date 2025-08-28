import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ref, set } from "firebase/database";
import { useUserStore } from "../../../contexts/store/UserStore";
import HeyDayText from "@/components/general/low_level/Text/HeyDayText";
import OnboardingStageOne from "../../OnboardingStages/OnboardingStageOne";
import OnboardingStageTwo from "../../OnboardingStages/OnboardingStageTwo";
import OnboardingStageThree from "../../OnboardingStages/OnboardingStageThree";

interface OnboardingData {
    name: string;
    termsAccepted: boolean;
    notificationHour: number;
    onboardingCompleted?: boolean;
    completedAt?: Date;
}

const OnboardingPage = () => {
    const [currentStage, setCurrentStage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [onboardingData, setOnboardingData] = useState<OnboardingData>({
        name: "",
        termsAccepted: false,
        notificationHour: -1,
    });

    // Get user store state and actions
    const { firebaseUser, setOnboardingCompleted } = useUserStore();

    // --- Stage handlers ---
    const handleStageOneNext = (name: string) => {
        setOnboardingData((prev) => ({ ...prev, name }));
        setCurrentStage(2);
    };

    const handleStageTwoNext = (termsAccepted: boolean) => {
        setOnboardingData((prev) => ({ ...prev, termsAccepted }));
        setCurrentStage(3);
    };

    const handleStageThreeComplete = async (notificationHour: number) => {
        const finalData: OnboardingData = {
            ...onboardingData,
            notificationHour,
            onboardingCompleted: true,
            completedAt: new Date(),
        };

        try {
            setIsLoading(true);

            if (firebaseUser) {

                const data = await (finalData);
                console.log("Onboarding saved successfully for user:", data);

                // Update the user store to reflect onboarding completion
                setOnboardingCompleted(true);
            } else {
                console.error("No authenticated user found - cannot save onboarding data");
                setIsLoading(false);
                return;
            }
        } catch (error) {
            console.error("Error saving onboarding data:", error);
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        if (currentStage > 1) {
            setCurrentStage(currentStage - 1);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <HeyDayText style={styles.loadingText}>Loading...</HeyDayText>
            </View>
        );
    }

    // --- Render stages ---
    const renderCurrentStage = () => {
        switch (currentStage) {
            case 1:
                return (
                    <OnboardingStageOne
                        onNext={handleStageOneNext}
                        initialName={onboardingData.name}
                    />
                );
            case 2:
                return (
                    <OnboardingStageTwo
                        onNext={handleStageTwoNext}
                        onBack={handleBack}
                        initialAccepted={onboardingData.termsAccepted}
                    />
                );
            case 3:
                return (
                    <OnboardingStageThree
                        onComplete={handleStageThreeComplete}
                        onBack={handleBack}
                        userName={onboardingData.name}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Progress bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    {[1, 2, 3].map((stage) => (
                        <View
                            key={stage}
                            style={[
                                styles.progressDot,
                                currentStage >= stage && styles.progressDotActive,
                            ]}
                        />
                    ))}
                </View>
                <HeyDayText style={styles.progressText}>
                    Step {currentStage} of 3
                </HeyDayText>
            </View>

            {renderCurrentStage()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    progressContainer: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: "center",
    },
    progressBar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#ddd",
        marginHorizontal: 4,
    },
    progressDotActive: { backgroundColor: "#007AFF" },
    progressText: { fontSize: 14, color: "#666" },
});

export default OnboardingPage;
