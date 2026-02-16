type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold';

export interface Theme {
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    background: string;
    backgroundLight: string;
    backgroundDark: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
    placeholder: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  typography: {
    h1: { fontSize: number; fontWeight: FontWeight; lineHeight: number };
    h2: { fontSize: number; fontWeight: FontWeight; lineHeight: number };
    h3: { fontSize: number; fontWeight: FontWeight; lineHeight: number };
    body: { fontSize: number; fontWeight: FontWeight; lineHeight: number };
    bodySmall: { fontSize: number; fontWeight: FontWeight; lineHeight: number };
    caption: { fontSize: number; fontWeight: FontWeight; lineHeight: number };
    button: { fontSize: number; fontWeight: FontWeight; lineHeight: number };
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#53D22D',
    primaryDark: '#46B426',
    primaryLight: '#6EE04B',
    secondary: '#88A381',
    background: '#f8f7f5',
    backgroundLight: '#f8f7f5',
    backgroundDark: '#0A0F08',
    surface: '#FFFFFF',
    text: '#1a1a1a',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    placeholder: '#9ca3af',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 44, fontWeight: '700', lineHeight: 48 },
    h2: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
    h3: { fontSize: 22, fontWeight: '600', lineHeight: 28 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    button: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#53D22D',
    primaryDark: '#46B426',
    primaryLight: '#6EE04B',
    secondary: '#88A381',
    background: '#0A0F08',
    backgroundLight: '#f8f7f5',
    backgroundDark: '#0A0F08',
    surface: '#1A2318',
    text: '#FFFFFF',
    textSecondary: '#88A381',
    border: '#1A2318',
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    placeholder: '#6b7280',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 44, fontWeight: '700', lineHeight: 48 },
    h2: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
    h3: { fontSize: 22, fontWeight: '600', lineHeight: 28 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    bodySmall: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    button: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  },
};
