import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/AppNavigator';

// Color constants from design
const COLORS = {
  primary: '#53D22D',
  primaryDark: '#46B426',
  charcoal: '#333333',
  lightGrey: '#F5F5F5',
  borderLight: '#E5E5E5',
  textSecondary: '#757575',
  white: '#FFFFFF',
  error: '#ef4444',
};

// Interface for form data
interface LoginFormData {
  email: string;
  password: string;
}

// Interface for form errors
interface FormErrors {
  email?: string;
  password?: string;
}

// Tab Switcher Component
interface TabSwitcherProps {
  activeTab: 'login' | 'signup';
  onTabChange: (tab: 'login' | 'signup') => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.tabSwitcherContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'login' && styles.tabButtonActive]}
        onPress={() => onTabChange('login')}
        activeOpacity={0.9}
      >
        <Text style={[styles.tabButtonText, activeTab === 'login' && styles.tabButtonTextActive]}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'signup' && styles.tabButtonActive]}
        onPress={() => onTabChange('signup')}
        activeOpacity={0.9}
      >
        <Text style={[styles.tabButtonText, activeTab === 'signup' && styles.tabButtonTextActive]}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Divider Component
const Divider: React.FC = () => (
  <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerText}>Or continue with</Text>
    <View style={styles.dividerLine} />
  </View>
);

const LoginScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  // Theme colors
  const backgroundColor = isDark ? '#0A0F08' : COLORS.white;
  const textColor = isDark ? '#FFFFFF' : COLORS.charcoal;
  const inputBgColor = isDark ? '#1A2318' : COLORS.lightGrey;

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input change handlers
  const handleEmailChange = (text: string) => {
    setFormData(prev => ({ ...prev, email: text }));
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setFormData(prev => ({ ...prev, password: text }));
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Tab change handler
  const handleTabChange = (tab: 'login' | 'signup') => {
    if (tab === 'signup') {
      navigation.navigate('Registration');
    }
  };

  // Login handler
  const handleLogin = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // TODO: Replace with actual authentication logic
      console.log('Login successful:', formData);

      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  // Face ID handler
  const handleFaceIDLogin = useCallback(() => {
    Alert.alert('Coming Soon', 'Face ID login will be available soon!');
  }, []);

  // Forgot password handler
  const handleForgotPassword = useCallback(() => {
    Alert.alert('Coming Soon', 'Password reset will be available soon!');
  }, []);

  // Social login handlers
  const handleGoogleLogin = useCallback(() => {
    Alert.alert('Coming Soon', 'Google login will be available soon!');
  }, []);

  const handleAppleLogin = useCallback(() => {
    Alert.alert('Coming Soon', 'Apple login will be available soon!');
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={[styles.logoContainer, { backgroundColor: inputBgColor }]}>
                <MaterialIcons name="construction" size={48} color={COLORS.primary} />
              </View>
              <View style={styles.logoTextContainer}>
                <Text style={[styles.logoTitle, { color: textColor }]}>Herfa</Text>
                <Text style={[styles.logoSubtitle, { color: isDark ? '#88A381' : COLORS.textSecondary }]}>
                  Build better, faster.
                </Text>
              </View>
            </View>

            {/* Tab Switcher */}
            <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Login Form */}
            <View style={styles.form}>
              {/* Email Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: isDark ? '#FFFFFF' : COLORS.charcoal }]}>
                  Email Address
                </Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <MaterialIcons name="mail" size={20} color={COLORS.textSecondary} />
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: inputBgColor,
                        color: textColor,
                        borderColor: errors.email ? COLORS.error : 'transparent',
                      }
                    ]}
                    placeholder="technician@herfa.com"
                    placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                    value={formData.email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                  />
                </View>
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: isDark ? '#FFFFFF' : COLORS.charcoal }]}>
                  Password
                </Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <MaterialIcons name="lock" size={20} color={COLORS.textSecondary} />
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: inputBgColor,
                        color: textColor,
                        borderColor: errors.password ? COLORS.error : 'transparent',
                        paddingRight: 48,
                      }
                    ]}
                    placeholder="••••••••"
                    placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
                    value={formData.password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    style={styles.visibilityButton}
                    onPress={togglePasswordVisibility}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons
                      name={showPassword ? 'visibility-off' : 'visibility'}
                      size={20}
                      color={COLORS.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Forgot Password Link */}
                <View style={styles.forgotPasswordContainer}>
                  <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.7}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.9}
              >
                {isLoading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <>
                    <Text style={styles.loginButtonText}>Login</Text>
                    <MaterialIcons name="arrow-forward" size={20} color={COLORS.white} />
                  </>
                )}
              </TouchableOpacity>
            </View>
              {/* 
              <TouchableOpacity
                style={styles.faceIdContainer}
                onPress={handleFaceIDLogin}
                activeOpacity={0.8}
              >
                <MaterialIcons name="face" size={40} color={COLORS.primary} />
            <Text style={styles.faceIdText}>Login with Face ID</Text>
              </TouchableOpacity>
            </View> */}

              {/* Divider */}
              <Divider />

              {/* Social Login Buttons */}
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin} activeOpacity={0.8}>
                  <View style={styles.googleIconContainer}>
                    <Text style={styles.googleIconText}>G</Text>
                  </View>
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin} activeOpacity={0.8}>
                  <MaterialIcons name="apple" size={22} color={isDark ? '#FFFFFF' : COLORS.charcoal} />
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>
              </View>

              {/* Bottom Spacer */}
              <View style={styles.bottomSpacer} />
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },

  // Logo Section
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  logoTextContainer: {
    alignItems: 'center',
  },
  logoTitle: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: COLORS.charcoal,
    marginBottom: 4,
  },
  logoSubtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },

  // Tab Switcher
  tabSwitcherContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGrey,
    padding: 4,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  tabButtonTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },

  // Form
  form: {
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
    marginBottom: 8,
    color: COLORS.charcoal,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIconContainer: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  visibilityButton: {
    position: 'absolute',
    right: 16,
    padding: 8,
    zIndex: 1,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginLeft: 4,
    marginTop: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },

  // Login Button
  loginButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },

  // Face ID
  faceIdContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  faceIdText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 8,
  },

  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.borderLight,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Social Buttons
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 12,
    paddingVertical: 14,
  },
  googleIconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIconText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4285F4',
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.charcoal,
  },

  // Bottom Spacer
  bottomSpacer: {
    height: 32,
  },
});

export default LoginScreen;
