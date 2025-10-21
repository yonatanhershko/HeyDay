import { useColorScheme, Platform, useWindowDimensions } from "react-native";
import {
    GlobalStyles,
    GlobalStylesDark,
    ColorsLight,
    ColorsDark,
    FontFamily,
    FontSize,
    Padding,
    Border,
    Gap,
    clamp,
} from "./index";
import { useUserStore } from "../contexts/store/UserStore";
import config from "../config.json";

/* ---------- factory ---------- */
/* ---------- responsive breakpoints ---------- */
const getResponsiveInfo = (width) => {
    const isTablet = width >= 768 && width < 1024;

    const isDesktop = width >= 1024 && width < 1280;

    const isLargeDesktop = width >= 1280;

    const isMobile = !isTablet && !isDesktop && !isLargeDesktop;

    return {
        isTablet,
        isDesktop,
        isLargeDesktop,
        isMobile,
        isWeb: Platform.OS === "web",
    };
};

/* ---------- responsive dimensions ---------- */
const getResponsiveDimensions = (width, height) => {
    const { isTablet, isDesktop, isLargeDesktop, isMobile } =
        getResponsiveInfo(width);

    // Calculate modal width based on screen size
    const getModalWidth = () => {
        if (isLargeDesktop) return Math.min(800, width * 0.5); // Desktop: 50% of screen width, max 800px
        if (isDesktop) return Math.min(600, width * 0.7); // Tablet: 70% of screen width, max 600px
        if (isTablet) return Math.min(400, width * 0.5); // Mobile: 50% of screen width, max 400px
        return width * 0.9; // Mobile: 90% of screen width
    };

    // Calculate modal max height based on screen size
    const getModalMaxHeight = () => {
        if (isLargeDesktop) return height * 0.8; // Desktop: 80% of screen height
        if (isDesktop) return height * 0.85; // Tablet: 85% of screen height
        if (isTablet) return height * 0.9; // Mobile: 90% of screen height
        return height * 0.9; // Mobile: 90% of screen height
    };

    // Calculate modal min height based on screen size
    const getModalMinHeight = () => {
        if (isLargeDesktop) return 400; // Desktop: minimum 400px
        if (isDesktop) return 350; // Tablet: minimum 350px
        if (isTablet) return 300; // Tablet: minimum 300px
        return 250; // Mobile: minimum 250px
    };

    return {
        getModalWidth,
        getModalMaxHeight,
        getModalMinHeight,
        screenWidth: width,
        screenHeight: height,
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
    };
};

export const getTheme = (isDark = false, width, height, isMobile) => {
    const dimensions =
        width && height ? getResponsiveDimensions(width, height) : {};
    const responsiveInfo = width ? getResponsiveInfo(width) : {};

    return {
        isDark,
        globalStyles: isDark ? GlobalStylesDark : GlobalStyles,
        colors: isDark ? ColorsDark : ColorsLight,
        fontSize: FontSize,
        fontFamily: FontFamily,
        padding: Padding,
        border: Border,
        gap: Gap,
        clamp: clamp,
        ...dimensions,
        ...responsiveInfo,
    };
};

export const useTheme = () => {
    // Get color scheme and user preferences
    const scheme = useColorScheme(); // 'light' | 'dark' | null
    const { getDarkTheme } = useUserStore();
    const userPref = getDarkTheme(); // nullable boolean

    // Get window dimensions
    const { width, height } = useWindowDimensions();

    // Pick the final truthy source of truth
    // If user has set preference, use it; otherwise follow system
    const isDark = userPref !== null ? userPref : (scheme === "dark");

    // check if mobile
    const isMobile = width < config.mobileWidth;

    // Return theme with responsive dimensions
    return getTheme(isDark, width, height, isMobile);
};
