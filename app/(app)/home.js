import React from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { useTheme } from "../../styles/theme.js";
import { useStreakStore } from "../../contexts/store/StreakStore.js";
import HeyDayText from "../../components/general/low_level/Text/HeyDayText.js";
import HeyDayIcon from "../../components/general/low_level/HeyDayIcon.js";
import i18n from "@/i18n.config.js";
import BottomNavMain from "../../components/bottomNavs/bottomNavMain.tsx";
import {
    OkeyMoodOne,
    BadMoodOne,
    GoodMoodOne,
    AmazingMoodOne,
    AwfulMoodOne,
} from "../../components/general/low_level/MoodPack";

const Home = () => {
    const t = useTheme();
    const styles = makeStyles(t);
    const { streakCount, coins } = useStreakStore();

    // Get daily quote that's the same for all users (random but no repeats in 12-day cycle)
    const getDailyQuote = () => {
        const today = new Date();
        const dayOfYear = Math.floor(
            (today - new Date(today.getFullYear(), 0, 0)) / 86400000
        );

        // Create a shuffled sequence of 1-12 that repeats every 12 days
        const createShuffledSequence = (seed) => {
            const sequence = Array.from({ length: 12 }, (_, i) => i + 1);//here change thr 12 if add more qoutes :)
            // Simple seeded shuffle using the cycle number as seed
            const random = (seed) => {
                const x = Math.sin(seed) * 10000;
                return x - Math.floor(x);
            };

            for (let i = sequence.length - 1; i > 0; i--) {
                const j = Math.floor(random(seed + i) * (i + 1));
                [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
            }
            return sequence;
        };

        const cycleNumber = Math.floor(dayOfYear / 12);
        const dayInCycle = dayOfYear % 12;
        const shuffledSequence = createShuffledSequence(cycleNumber);
        const quoteNumber = shuffledSequence[dayInCycle];

        const quote = i18n.t(`DayQoutes.quote${quoteNumber}`);
        return quote;
    };

    const dailyQuote = getDailyQuote();

    const moodData = [
        { mood: "Amazing", count: 4, emoji: AmazingMoodOne },
        { mood: "Okay", count: 3, emoji: OkeyMoodOne },
        { mood: "Good", count: 2, emoji: GoodMoodOne },
        { mood: "Bad", count: 1, emoji: BadMoodOne },
        { mood: "Awful", count: 1, emoji: AwfulMoodOne },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* Daily Motivation Section */}
                <View style={styles.motivationSection}>
                    <HeyDayText style={styles.sectionTitle}>
                        Daily Motivation
                    </HeyDayText>
                    <HeyDayText style={styles.motivationText}>
                        {dailyQuote}
                    </HeyDayText>
                </View>

                {/* Time Period Selector */}
                <View style={styles.periodSelector}>
                    <TouchableOpacity
                        style={[styles.periodButton, styles.activePeriod]}
                    >
                        <HeyDayIcon name="history" size={32} fill="#333" />
                        <HeyDayText style={styles.periodText}>
                            Weekly
                        </HeyDayText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.periodButton}>
                        <HeyDayIcon name="profile" size={32} fill="#333" />
                        <HeyDayText style={styles.periodText}>Month</HeyDayText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.periodButton}>
                        <HeyDayIcon name="mainIcon" size={32} fill="#333" />
                        <HeyDayText style={styles.periodText}>Year</HeyDayText>
                    </TouchableOpacity>
                </View>

                {/* Mood Trends Chart */}
                <View style={styles.trendsSection}>
                    <HeyDayText style={styles.sectionTitle}>
                        Mood Trends
                    </HeyDayText>

                    {/* Circular Progress Placeholder */}
                    <View style={styles.chartContainer}>
                        <View style={styles.circularChart}>
                            <View style={styles.chartCenter}>
                                <HeyDayIcon
                                    name="cuteFlower"
                                    size={24}
                                    fill="#FFD700"
                                />
                                <HeyDayText style={styles.chartCenterText}>
                                    6
                                </HeyDayText>
                            </View>
                        </View>
                    </View>

                    {/* Mood Legend */}
                    <View style={styles.moodLegend}>
                        {moodData.map((item, index) => {
                            const EmojiComponent = item.emoji;
                            return (
                                <View key={index} style={styles.moodItem}>
                                    <View style={styles.moodIconContainer}>
                                        {/* <EmojiComponent width={32} height={32} /> */}
                                        <View style={styles.moodBadge}>
                                            <HeyDayText
                                                style={styles.moodCount}
                                            >
                                                {item.count}
                                            </HeyDayText>
                                        </View>
                                    </View>
                                    <HeyDayText style={styles.moodLabel}>
                                        {item.mood}
                                    </HeyDayText>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Ad Placeholder */}
                <View style={styles.adSection}>
                    <HeyDayText style={styles.adText}>AD Here</HeyDayText>
                </View>

                {/* Streak & Coins Display */}
                <View style={styles.statsSection}>
                    <View style={styles.statItem}>
                        <HeyDayIcon
                            name="cuteFlower"
                            size={24}
                            fill="#FFD700"
                        />
                        <HeyDayText style={styles.statText}>
                            Streak: {streakCount}
                        </HeyDayText>
                    </View>
                    <View style={styles.statItem}>
                        <HeyDayIcon
                            name="cuteFlower"
                            size={24}
                            fill="#FFD700"
                        />
                        <HeyDayText style={styles.statText}>
                            Coins: {coins}
                        </HeyDayText>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <BottomNavMain />
        </SafeAreaView>
    );
};

const makeStyles = (t) =>
    StyleSheet.create({
        container: {
            // flex: 1,
            backgroundColor: t.colors.background,
        },
        scrollView: {
            // flex: 1,
            paddingHorizontal: 0,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 20,
        },
        headerTitle: {
            fontSize: t.fontSize.large,
            fontFamily: t.fontFamily.rubikMedium,
            color: t.colors.textPrimary,
        },
        motivationSection: {
            backgroundColor: t.colors.blueGrey,
            borderRadius: 0,
            padding: 20,
            marginBottom: 20,
            marginHorizontal: 0,
        },
        sectionTitle: {
            fontSize: t.fontSize.large,
            fontFamily: t.fontFamily.rubikBold,
            color: t.colors.textPrimary,
            marginBottom: 10,
        },
        motivationText: {
            fontSize: t.fontSize.base,
            fontFamily: t.fontFamily.rubikRegular,
            color: t.colors.textSecondary,
            lineHeight: 22,
        },
        periodSelector: {
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: t.colors.primary,
            borderRadius: 16,
            padding: 15,
            marginBottom: 20,
        },
        periodButton: {
            alignItems: "center",
            padding: 10,
            borderRadius: 12,
        },
        activePeriod: {
            backgroundColor: "rgba(255,255,255,0.2)",
        },
        periodText: {
            fontSize: t.fontSize.small,
            fontFamily: t.fontFamily.rubikMedium,
            color: t.colors.textPrimary,
            marginTop: 5,
        },
        trendsSection: {
            marginBottom: 20,
        },
        chartContainer: {
            alignItems: "center",
            marginVertical: 20,
        },
        circularChart: {
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: t.colors.primary,
            justifyContent: "center",
            alignItems: "center",
        },
        chartCenter: {
            alignItems: "center",
        },
        chartCenterText: {
            fontSize: 32,
            fontFamily: t.fontFamily.rubikBold,
            color: t.colors.textPrimary,
            marginTop: 5,
        },
        moodLegend: {
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
        },
        moodItem: {
            alignItems: "center",
            marginBottom: 15,
        },
        moodIconContainer: {
            position: "relative",
        },
        moodBadge: {
            position: "absolute",
            top: -5,
            right: -5,
            backgroundColor: t.colors.secondary,
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        moodCount: {
            fontSize: 12,
            fontFamily: t.fontFamily.rubikBold,
            color: t.colors.textPrimary,
        },
        moodLabel: {
            fontSize: t.fontSize.small,
            fontFamily: t.fontFamily.rubikMedium,
            color: t.colors.textPrimary,
            marginTop: 5,
        },
        adSection: {
            backgroundColor: t.colors.secondary,
            borderRadius: 16,
            padding: 40,
            alignItems: "center",
            marginBottom: 20,
        },
        adText: {
            fontSize: t.fontSize.base,
            fontFamily: t.fontFamily.rubikMedium,
            color: t.colors.textSecondary,
        },
        statsSection: {
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: t.colors.blueGrey,
            borderRadius: 16,
            // padding: 20,
            // marginBottom: 100, // Space for bottom nav
        },
        statItem: {
            flexDirection: "row",
            alignItems: "center",
        },
        statText: {
            fontSize: t.fontSize.base,
            fontFamily: t.fontFamily.rubikMedium,
            color: t.colors.textPrimary,
            marginLeft: 8,
        },
    });

export default Home;
