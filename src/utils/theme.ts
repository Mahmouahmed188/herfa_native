type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold';

export interface Theme {
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    background: string;
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
    primary: '#007AFF',
    primaryDark: '#0056B3',
    primaryLight: '#4A9EFF',
    secondary: '#5856D6',
    background: '#F2F2F7',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#6C6C6C',
    border: '#C6C6C8',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    placeholder: '#8E8E93',
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
    h1: { fontSize: 34, fontWeight: '700', lineHeight: 41 },
    h2: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
    h3: { fontSize: 22, fontWeight: '600', lineHeight: 28 },
    body: { fontSize: 17, fontWeight: '400', lineHeight: 22 },
    bodySmall: { fontSize: 15, fontWeight: '400', lineHeight: 20 },
    caption: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
    button: { fontSize: 17, fontWeight: '600', lineHeight: 22 },
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: '#0A84FF',
    primaryDark: '#0056B3',
    primaryLight: '#4A9EFF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    error: '#FF453A',
    success: '#30D158',
    warning: '#FF9F0A',
    placeholder: '#636366',
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
    h1: { fontSize: 34, fontWeight: '700', lineHeight: 41 },
    h2: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
    h3: { fontSize: 22, fontWeight: '600', lineHeight: 28 },
    body: { fontSize: 17, fontWeight: '400', lineHeight: 22 },
    bodySmall: { fontSize: 15, fontWeight: '400', lineHeight: 20 },
    caption: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
    button: { fontSize: 17, fontWeight: '600', lineHeight: 22 },
  },
};
