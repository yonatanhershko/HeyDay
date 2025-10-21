import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Pressable,
    View,
    ScrollView,
    TextInput,
    Alert,
} from "react-native";
import { useTheme } from "../../styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useUserStore } from "../../contexts/store/UserStore";
import HeyDayText from "../../components/general/low_level/Text/HeyDayText";
import i18n, { setLocaleAsync, isRTL } from "../../i18n.config";
import { clearAllStorage } from "../../api/services/AsyncStorageService";

/**
 * Settings screen component
 */
export default function Settings() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useLocalSearchParams();
    const t = useTheme();
    const styles = makeStyles(t);
    const { language, isLoggedIn, darkTheme, setLanguage, setLoggedIn, setDarkTheme, initializeThemePreference } = useUserStore();

    // Add local state only for what's not in Zustand yet
    const [isEditing, setIsEditing] = React.useState(false);
    const [name, setName] = React.useState("User Name"); // Default value

    // Initialize theme preference on mount
    React.useEffect(() => {
        initializeThemePreference();
    }, []);

    // Handle navigation back
    const handleGoBack = () => {
        router.push("/");
    };

    // Handle language change using Zustand
    const handleLanguageChange = async (newLanguage) => {
        try {
            setLanguage(newLanguage);

            // Force immediate re-render by updating i18n locale
            i18n.locale = newLanguage;

            // Then handle persistence and app-level changes
            const queryString = Object.keys(searchParams)
                .map(
                    (key) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`
                )
                .join("&");
            await setLocaleAsync(
                newLanguage,
                queryString ? `${pathname}?${queryString}` : pathname
            );
        } catch (error) {
            console.error(
                "LanguageToggle: changeLanguage() - error occurred",
                error
            );
        }
    };

    // Handle theme change
    const handleThemeChange = async (isDark) => {
        await setDarkTheme(isDark);
    };

    // Handle save profile
    const handleSaveProfile = () => {
        // In a real app, you'd update the user profile in your Zustand store
        // and then call an API to save it
        // For example: userStore.updateUserProfile({ name });
        setIsEditing(false);
        Alert.alert(i18n.t("Settings.profileUpdated"));
    };

    // Handle terms and privacy
    const handleViewTerms = () => {
        router.push("/policy"); // Updated to use the new policy page
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={["#ffff", "#5852F2"]}
                // colors={['#F8FAFC', '#F8FAFC']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
            <View style={styles.header}>
                <Pressable onPress={handleGoBack} style={styles.backButton}>
                    <MaterialIcons
                        name={isRTL ? "arrow-forward" : "arrow-back"}
                        size={24}
                        color="white"
                    />
                </Pressable>
                <HeyDayText style={styles.title}>
                    {i18n.t("Settings.title")}
                </HeyDayText>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                style={styles.contentContainer}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Language Selection Section */}
                <View style={styles.section}>
                    <HeyDayText style={styles.sectionTitle}>
                        {i18n.t("Settings.language")}
                    </HeyDayText>
                    <View style={styles.languageOptions}>
                        <Pressable
                            style={[
                                styles.languageOption,
                                language === "en" && styles.selectedLanguage,
                            ]}
                            onPress={() => handleLanguageChange("en")}
                        >
                            <HeyDayText
                                style={[
                                    styles.languageText,
                                    language === "en" &&
                                        styles.selectedLanguageText,
                                ]}
                            >
                                English
                            </HeyDayText>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.languageOption,
                                language === "he" && styles.selectedLanguage,
                            ]}
                            onPress={() => handleLanguageChange("he")}
                        >
                            <HeyDayText
                                style={[
                                    styles.languageText,
                                    language === "he" &&
                                        styles.selectedLanguageText,
                                ]}
                            >
                                עברית
                            </HeyDayText>
                        </Pressable>
                    </View>
                </View>

                {/* Theme Section */}
                <View style={styles.section}>
                    <HeyDayText style={styles.sectionTitle}>
                        Theme
                    </HeyDayText>
                    <View style={styles.themeOptions}>
                        <Pressable
                            style={[
                                styles.themeOption,
                                darkTheme === false && styles.selectedTheme,
                            ]}
                            onPress={() => handleThemeChange(false)}
                        >
                            <MaterialIcons
                                name="light-mode"
                                size={24}
                                color={darkTheme === false ? "#5852F2" : "white"}
                            />
                            <HeyDayText
                                style={[
                                    styles.themeText,
                                    darkTheme === false && styles.selectedThemeText,
                                ]}
                            >
                                Light
                            </HeyDayText>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.themeOption,
                                darkTheme === true && styles.selectedTheme,
                            ]}
                            onPress={() => handleThemeChange(true)}
                        >
                            <MaterialIcons
                                name="dark-mode"
                                size={24}
                                color={darkTheme === true ? "#5852F2" : "white"}
                            />
                            <HeyDayText
                                style={[
                                    styles.themeText,
                                    darkTheme === true && styles.selectedThemeText,
                                ]}
                            >
                                Dark
                            </HeyDayText>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.themeOption,
                                darkTheme === null && styles.selectedTheme,
                            ]}
                            onPress={() => handleThemeChange(null)}
                        >
                            <MaterialIcons
                                name="brightness-auto"
                                size={24}
                                color={darkTheme === null ? "#5852F2" : "white"}
                            />
                            <HeyDayText
                                style={[
                                    styles.themeText,
                                    darkTheme === null && styles.selectedThemeText,
                                ]}
                            >
                                System
                            </HeyDayText>
                        </Pressable>
                    </View>
                </View>

                {/* Profile Section */}
                <View style={styles.section}>
                    <View style={styles.sectionTitleContainer}>
                        <HeyDayText style={styles.sectionTitle}>
                            {i18n.t("Settings.profile")}
                        </HeyDayText>
                        {!isEditing && (
                            <Pressable onPress={clearAllStorage}>
                                <MaterialIcons
                                    name="edit"
                                    size={20}
                                    color="white"
                                />
                            </Pressable>
                        )}
                    </View>

                    <View style={styles.profileField}>
                        <HeyDayText style={styles.fieldLabel}>
                            {i18n.t("Settings.name")}
                        </HeyDayText>
                        {isEditing ? (
                            <TextInput
                                style={styles.fieldInput}
                                value={name}
                                onChangeText={setName}
                                placeholder={i18n.t("Settings.enterName")}
                                placeholderTextColor="rgba(255,255,255,0.5)"
                            />
                        ) : (
                            <HeyDayText style={styles.fieldValue}>
                                {name}
                            </HeyDayText>
                        )}
                    </View>

                    {isEditing && (
                        <Pressable
                            style={styles.saveButton}
                            onPress={handleSaveProfile}
                        >
                            <HeyDayText style={styles.saveButtonText}>
                                {i18n.t("Settings.save")}
                            </HeyDayText>
                        </Pressable>
                    )}
                </View>

                {/* Terms & Privacy */}
                <Pressable style={styles.section} onPress={handleViewTerms}>
                    <View style={styles.settingRow}>
                        <HeyDayText style={styles.sectionTitle}>
                            {i18n.t("Settings.termsPrivacy")}
                        </HeyDayText>
                        <MaterialIcons
                            name={isRTL ? "chevron-left" : "chevron-right"}
                            size={24}
                            color="white"
                        />
                    </View>
                </Pressable>

                {/* Login/Logout */}
                <Pressable
                    style={[
                        styles.authButton,
                        isLoggedIn ? styles.logoutButton : styles.loginButton,
                    ]}
                    onPress={clearAllStorage}
                >
                    <HeyDayText style={styles.authButtonText}>
                        {isLoggedIn
                            ? i18n.t("Settings.logout")
                            : i18n.t("Settings.login")}
                    </HeyDayText>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const makeStyles = (t) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "transparent",
            gap: 16,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
        },
        backButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            justifyContent: "center",
            alignItems: "center",
        },
        title: {
            color: "white",
            fontSize: 20,
            fontFamily: t.fontFamily.rubikMedium,
        },
        contentContainer: {
            flex: 1,
        },
        scrollContent: {
            paddingHorizontal: 20,
            paddingBottom: 30,
            gap: 16,
        },
        section: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 10,
            padding: 16,
            gap: 12,
        },
        sectionTitle: {
            color: "white",
            fontSize: 18,
            fontFamily: t.fontFamily.rubikMedium,
        },
        sectionTitleContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        languageOptions: {
            flexDirection: "row",
            justifyContent: "space-evenly",
        },
        languageOption: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "white",
        },
        selectedLanguage: {
            backgroundColor: "white",
        },
        languageText: {
            color: "white",
            fontFamily: t.fontFamily.rubikRegular,
        },
        selectedLanguageText: {
            color: "#5852F2",
        },
        themeOptions: {
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
        },
        themeOption: {
            flex: 1,
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "white",
            gap: 8,
        },
        selectedTheme: {
            backgroundColor: "white",
        },
        themeText: {
            color: "white",
            fontSize: 14,
            fontFamily: t.fontFamily.rubikRegular,
        },
        selectedThemeText: {
            color: "#5852F2",
        },
        settingRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        settingLabel: {
            color: "white",
            fontSize: 16,
            fontFamily: t.fontFamily.rubikRegular,
        },
        profileField: {
            marginBottom: 12,
        },
        fieldLabel: {
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 14,
            fontFamily: t.fontFamily.rubikRegular,
            marginBottom: 4,
        },
        fieldValue: {
            color: "white",
            fontSize: 16,
            fontFamily: t.fontFamily.rubikMedium,
        },
        fieldInput: {
            color: "white",
            fontSize: 16,
            fontFamily: t.fontFamily.rubikRegular,
            borderBottomWidth: 1,
            borderBottomColor: "white",
            paddingBottom: 4,
        },
        saveButton: {
            backgroundColor: "white",
            borderRadius: 20,
            padding: 10,
            alignItems: "center",
            marginTop: 10,
        },
        saveButtonText: {
            color: "#5852F2",
            fontFamily: t.fontFamily.rubikMedium,
            fontSize: 16,
        },
        authButton: {
            borderRadius: 25,
            padding: 15,
            alignItems: "center",
            marginVertical: 20,
        },
        loginButton: {
            backgroundColor: "white",
        },
        logoutButton: {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            borderColor: "white",
        },
        authButtonText: {
            fontSize: 16,
            fontFamily: t.fontFamily.rubikMedium,
            color: (props) => (props.isLoggedIn ? "white" : "#5852F2"),
        },
    });
