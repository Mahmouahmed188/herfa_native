import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useAuthStore } from "../store/authStore";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

// Color constants from design
const COLORS = {
  primary: "#53D22D",
  primaryDark: "#46B426",
  charcoal: "#333333",
  lightGrey: "#F5F5F5",
  borderLight: "#E5E5E5",
  textSecondary: "#757575",
  white: "#FFFFFF",
  error: "#ef4444",
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
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { t } = useLanguage();

  return (
    <View style={styles.tabSwitcherContainer}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "login" && styles.tabButtonActive,
        ]}
        onPress={() => onTabChange("login")}
        activeOpacity={0.9}
      >
        <Text
          style={[
            styles.tabButtonText,
            activeTab === "login" && styles.tabButtonTextActive,
          ]}
        >
          {t("auth.login")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "signup" && styles.tabButtonActive,
        ]}
        onPress={() => onTabChange("signup")}
        activeOpacity={0.9}
      >
        <Text
          style={[
            styles.tabButtonText,
            activeTab === "signup" && styles.tabButtonTextActive,
          ]}
        >
          {t("auth.signUp")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Divider Component
const Divider: React.FC = () => {
  const { t } = useLanguage();

  return (
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{t("auth.orContinueWith")}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
};

const LoginScreen: React.FC = () => {
  const { t } = useLanguage();
  const { theme, isDark } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { login, isLoading: authLoading } = useAuthStore();

  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  // Theme colors
  const backgroundColor = theme.colors.background;
  const textColor = theme.colors.text;
  const inputBgColor = theme.colors.surfaceSecondary;

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired");
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t("validation.emailInvalid");
    }

    if (!formData.password) {
      newErrors.password = t("validation.passwordRequired");
    } else if (formData.password.length < 6) {
      newErrors.password = t("validation.passwordMinLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input change handlers
  const handleEmailChange = (text: string) => {
    setFormData((prev) => ({ ...prev, email: text }));
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setFormData((prev) => ({ ...prev, password: text }));
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Tab change handler
  const handleTabChange = (tab: "login" | "signup") => {
    if (tab === "signup") {
      navigation.navigate("Registration");
    }
  };

  // Login handler
  const handleLogin = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
      // Navigation to Home is handled automatically by AppNavigator
      // when isAuthenticated becomes true
    } catch (error) {
      Alert.alert(t("common.error"), t("auth.loginError"));
    }
  }, [formData, login, t]);

  // Face ID handler
  const handleFaceIDLogin = useCallback(() => {
    Alert.alert(
      t("common.comingSoon"),
      `${t("auth.loginWithFaceId")} ${t("common.comingSoon").toLowerCase()}`,
    );
  }, [t]);

  // Forgot password handler
  const handleForgotPassword = useCallback(() => {
    Alert.alert(
      t("common.comingSoon"),
      `${t("auth.resetPassword")} ${t("common.comingSoon").toLowerCase()}`,
    );
  }, [t]);

  // Social login handlers
  const handleGoogleLogin = useCallback(() => {
    Alert.alert(
      t("common.comingSoon"),
      `${t("auth.google")} ${t("common.comingSoon").toLowerCase()}`,
    );
  }, [t]);

  const handleAppleLogin = useCallback(() => {
    Alert.alert(
      t("common.comingSoon"),
      `${t("auth.apple")} ${t("common.comingSoon").toLowerCase()}`,
    );
  }, [t]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
              <View
                style={[
                  styles.logoContainer,
                  { backgroundColor: inputBgColor },
                ]}
              >
                <MaterialIcons
                  name="construction"
                  size={48}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.logoTextContainer}>
                <Text style={[styles.logoTitle, { color: textColor }]}>
                  {t("common.appName")}
                </Text>
                <Text
                  style={[
                    styles.logoSubtitle,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {t("common.appTagline")}
                </Text>
              </View>
            </View>

            {/* Tab Switcher */}
            <TabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Login Form */}
            <View style={styles.form}>
              {/* Email Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: textColor }]}>
                  {t("auth.email")}
                </Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <MaterialIcons
                      name="mail"
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: inputBgColor,
                        color: textColor,
                        borderColor: errors.email
                          ? theme.colors.error
                          : "transparent",
                      },
                    ]}
                    placeholder={t("auth.emailPlaceholder")}
                    placeholderTextColor={theme.colors.textSecondary}
                    value={formData.email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!authLoading}
                  />
                </View>
                {errors.email && (
                  <Text
                    style={[styles.errorText, { color: theme.colors.error }]}
                  >
                    {errors.email}
                  </Text>
                )}
              </View>

              {/* Password Field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: textColor }]}>
                  {t("auth.password")}
                </Text>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputIconContainer}>
                    <MaterialIcons
                      name="lock"
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: inputBgColor,
                        color: textColor,
                        borderColor: errors.password
                          ? theme.colors.error
                          : "transparent",
                        paddingRight: 48,
                      },
                    ]}
                    placeholder={t("auth.passwordPlaceholder")}
                    placeholderTextColor={theme.colors.textSecondary}
                    value={formData.password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    editable={!authLoading}
                  />
                  <TouchableOpacity
                    style={styles.visibilityButton}
                    onPress={togglePasswordVisibility}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons
                      name={showPassword ? "visibility-off" : "visibility"}
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text
                    style={[styles.errorText, { color: theme.colors.error }]}
                  >
                    {errors.password}
                  </Text>
                )}

                {/* Forgot Password Link */}
                <View style={styles.forgotPasswordContainer}>
                  <TouchableOpacity
                    onPress={handleForgotPassword}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.forgotPasswordText,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      {t("auth.forgotPassword")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={handleLogin}
                disabled={authLoading}
                activeOpacity={0.9}
              >
                {authLoading ? (
                  <ActivityIndicator color={theme.colors.background} />
                ) : (
                  <>
                    <Text
                      style={[
                        styles.loginButtonText,
                        { color: theme.colors.background },
                      ]}
                    >
                      {t("auth.login")}
                    </Text>
                    <MaterialIcons
                      name="arrow-forward"
                      size={20}
                      color={theme.colors.background}
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <Divider />

            {/* Social Login Buttons */}
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.socialButton,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={handleGoogleLogin}
                activeOpacity={0.8}
              >
                <View style={styles.googleIconContainer}>
                  <Text style={styles.googleIconText}>G</Text>
                </View>
                <Text
                  style={[
                    styles.socialButtonText,
                    { color: theme.colors.text },
                  ]}
                >
                  {t("auth.google")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.socialButton,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={handleAppleLogin}
                activeOpacity={0.8}
              >
                <MaterialIcons
                  name="apple"
                  size={22}
                  color={isDark ? "#FFFFFF" : theme.colors.text}
                />
                <Text
                  style={[
                    styles.socialButtonText,
                    { color: theme.colors.text },
                  ]}
                >
                  {t("auth.apple")}
                </Text>
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
    alignSelf: "center",
    width: "100%",
  },

  // Logo Section
  logoSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  logoTextContainer: {
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.5,
    color: COLORS.charcoal,
    marginBottom: 4,
  },
  logoSubtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },

  // Tab Switcher
  tabSwitcherContainer: {
    flexDirection: "row",
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
    alignItems: "center",
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  tabButtonTextActive: {
    color: COLORS.white,
    fontWeight: "700",
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
    fontWeight: "500",
    marginLeft: 4,
    marginBottom: 8,
    color: COLORS.charcoal,
  },
  inputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  inputIconContainer: {
    position: "absolute",
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
    borderColor: "transparent",
  },
  visibilityButton: {
    position: "absolute",
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
    alignItems: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },

  // Login Button
  loginButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "700",
    color: COLORS.white,
  },

  // Face ID
  faceIdContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  faceIdText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textSecondary,
    marginTop: 8,
  },

  // Divider
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "600",
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // Social Buttons
  socialButtonsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "center",
  },
  googleIconText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4285F4",
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.charcoal,
  },

  // Bottom Spacer
  bottomSpacer: {
    height: 32,
  },
});

export default LoginScreen;
