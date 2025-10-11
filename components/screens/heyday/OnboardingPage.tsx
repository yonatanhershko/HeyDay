import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useUserStore } from "../../../contexts/store/UserStore";
import OnboardingStageOne from "../../OnboardingStages/OnboardingStageOne";
import OnboardingStageTwo from "../../OnboardingStages/OnboardingStageTwo";
import OnboardingStageThree from "../../OnboardingStages/OnboardingStageThree";
import HeyDayText from "@/components/general/low_level/Text/HeyDayText";
import { AutoImageCarousel } from "../../../components/general/high_level/AutoImageCarousel.js";
import { useTheme } from "../../../styles/theme";

interface OnboardingData {
    name: string;
    termsAccepted: boolean;
    notificationHour: number;
    onboardingCompleted?: boolean;
    completedAt?: Date;
}

const OnboardingPage = () => {
    const [currentStage, setCurrentStage] = useState(1);
    const [onboardingData, setOnboardingData] = useState<OnboardingData>({
        name: "",
        termsAccepted: false,
        notificationHour: -1,
    });
   const t = useTheme();
    const styles = makeStyles(t);
    // Get user store state and actions
    const { newUser, setNewUser, authLoading } = useUserStore();

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
            // Call setNewUser which will save to Firebase RTDB and update userInfo
            // authLoading is handled inside setNewUser
            await setNewUser(finalData);
            
            console.log("Onboarding completed and saved successfully!");
            
        } catch (error) {
            console.error("Error saving onboarding data:", error);
        }
    };

    const handleBack = () => {
        if (currentStage > 1) {
            setCurrentStage(currentStage - 1);
        }
    };

    if (authLoading) {
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
            <AutoImageCarousel />
            {renderCurrentStage()}

            {/* Progress bar */}
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
        </View>
    );
};

const makeStyles = (t) =>
    StyleSheet.create({
    container: { flex: 1,
         backgroundColor: t.colors.background,
         },
          loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: t.colors.background,
    },
    loadingText: {
        marginTop: 10,
        fontSize: t.fontSize.base,
        color: t.colors.textPrimary,
    },
    progressBar: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        marginBottom: 10,
    },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: t.colors.border,
        marginHorizontal: 4,
    },
    progressDotActive: { backgroundColor: t.colors.primary },
    progressText: { fontSize: t.fontSize.sm, 
        color: t.colors.textSecondary },
});

export default OnboardingPage;
