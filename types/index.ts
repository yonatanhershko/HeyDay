// Global type definitions for HeyDay app

export interface UserStore {
    language: 'en' | 'he';
    darkTheme: boolean;
    isLoggedIn: boolean;
    setLanguage: (language: 'en' | 'he') => void;
    setDarkTheme: (darkTheme: boolean) => void;
    setLoggedIn: (isLoggedIn: boolean) => void;
}

export interface ThemeColors {
    primary: string;
    primaryAlt: string;
    secondary: string;
    white: string;
    textPrimary: string;
    border: string;
    greyExstraLight: string;
}

export interface FontFamily {
    rubikRegular: string;
    rubikMedium: string;
    rubikBold: string;
    rubikExstraBold: string;
}

export interface FontSize {
    base: number;
    md: number;
    xl: number;
}

export interface Theme {
    colors: ThemeColors;
    fontFamily: FontFamily;
    fontSize: FontSize;
}

export interface I18nConfig {
    t: (key: string) => string;
    locale: string;
    events: any;
}

// Route types
export type AppRoutes = '/' | '/settings' | '/policy' | '/acc_policy';

// Component props
export interface HeyDayTextProps {
    children: React.ReactNode;
    style?: any;
}

// Navigation types
export interface RouterParams {
    push: (route: AppRoutes) => void;
    back: () => void;
    replace: (route: AppRoutes) => void;
}
