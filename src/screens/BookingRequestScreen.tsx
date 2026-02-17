import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import type { RootStackParamList } from "../navigation/AppNavigator";

const CATEGORY_OPTIONS = [
  { id: "plumbing", icon: "plumbing", nameKey: "home.plumbing" },
  { id: "electrical", icon: "bolt", nameKey: "home.electric" },
  { id: "carpentry", icon: "handyman", nameKey: "home.carpentry" },
  { id: "painting", icon: "format-paint", nameKey: "home.painting" },
];

const SERVICE_TYPES = [
  { id: "leak", icon: "plumbing", labelKey: "bookingRequest.serviceLeak" },
  { id: "clog", icon: "bolt", labelKey: "bookingRequest.serviceClog" },
  {
    id: "installation",
    icon: "construction",
    labelKey: "bookingRequest.serviceInstall",
  },
  {
    id: "inspection",
    icon: "search",
    labelKey: "bookingRequest.serviceInspection",
  },
  { id: "other", icon: "help-outline", labelKey: "bookingRequest.serviceOther" },
];

const BookingRequestScreen: React.FC = () => {
  const { t, isRTL, currentLanguage } = useLanguage();
  const { theme } = useTheme();
  const navigation = useNavigation<
    NativeStackNavigationProp<RootStackParamList>
  >();

  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0].id);
  const [selectedService, setSelectedService] = useState(SERVICE_TYPES[0].id);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const formattedDate = useMemo(() => {
    return selectedDate.toLocaleDateString(currentLanguage, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate, currentLanguage]);

  const formattedTime = useMemo(() => {
    return selectedTime.toLocaleTimeString(currentLanguage, {
      hour: "numeric",
      minute: "2-digit",
    });
  }, [selectedTime, currentLanguage]);

  const handleDatePress = () => {
    setSelectedDate((prev) => new Date(prev.getTime() + 86400000));
  };

  const handleTimePress = () => {
    setSelectedTime((prev) => new Date(prev.getTime() + 3600000));
  };

  const handleAddPhoto = () => {
    Alert.alert(t("common.comingSoon"), t("bookingRequest.addPhotos"));
  };

  const handleConfirm = () => {
    Alert.alert(
      t("bookingRequest.submitSuccessTitle"),
      t("bookingRequest.submitSuccessMessage"),
    );
  };

  const iconMarginStyle = isRTL ? { marginLeft: 10 } : { marginRight: 10 };
  const confirmIconMargin = isRTL ? { marginRight: 8 } : { marginLeft: 8 };
  const dateItemSpacing = isRTL ? { marginLeft: 12 } : { marginRight: 12 };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top", "bottom"]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.borderLight,
            flexDirection: isRTL ? "row-reverse" : "row",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={isRTL ? "arrow_forward_ios" : "arrow_back_ios_new"}
            size={20}
            color={theme.colors.text}
          />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text
            style={[
              styles.headerTitle,
              {
                color: theme.colors.text,
                textAlign: isRTL ? "right" : "left",
              },
            ]}
          >
            {t("bookingRequest.title")}
          </Text>
          <Text
            style={[
              styles.headerSubtitle,
              {
                color: theme.colors.textSecondary,
                textAlign: isRTL ? "right" : "left",
              },
            ]}
          >
            {t("bookingRequest.subtitle")}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {t("bookingRequest.selectCategory")}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          >
            {CATEGORY_OPTIONS.map((item) => {
              const isActive = selectedCategory === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedCategory(item.id)}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor: isActive
                        ? theme.colors.primary
                        : theme.colors.surface,
                      borderColor: isActive
                        ? theme.colors.primary
                        : theme.colors.borderLight,
                      flexDirection: isRTL ? "row-reverse" : "row",
                      marginRight: isRTL ? 0 : 12,
                      marginLeft: isRTL ? 12 : 0,
                    },
                  ]}
                >
                  <MaterialIcons
                    name={item.icon as any}
                    size={18}
                    color={isActive ? "#fff" : theme.colors.textSecondary}
                    style={iconMarginStyle}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color: isActive ? "#fff" : theme.colors.text,
                        textAlign: isRTL ? "right" : "left",
                      },
                    ]}
                  >
                    {t(item.nameKey)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {t("bookingRequest.serviceDetails")}
          </Text>

          <View style={styles.field}>
            <Text
              style={[
                styles.inputLabel,
                { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {t("bookingRequest.nameLabel")}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.colors.borderLight,
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  textAlign: isRTL ? "right" : "left",
                },
              ]}
              placeholder={t("bookingRequest.namePlaceholder")}
              placeholderTextColor={theme.colors.textSecondary}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.field}>
            <Text
              style={[
                styles.inputLabel,
                { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {t("bookingRequest.contactLabel")}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.colors.borderLight,
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  textAlign: isRTL ? "right" : "left",
                },
              ]}
              placeholder={t("bookingRequest.contactPlaceholder")}
              placeholderTextColor={theme.colors.textSecondary}
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.field}>
            <Text
              style={[
                styles.inputLabel,
                { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {t("bookingRequest.serviceTypeLabel")}
            </Text>
            <View
              style={[
                styles.serviceOptions,
                { justifyContent: isRTL ? "flex-end" : "flex-start" },
              ]}
            >
              {SERVICE_TYPES.map((option) => {
                const isActive = selectedService === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.serviceOption,
                      {
                        borderColor: isActive
                          ? theme.colors.primary
                          : theme.colors.borderLight,
                        backgroundColor: isActive
                          ? `${theme.colors.primary}15`
                          : theme.colors.surface,
                        flexDirection: isRTL ? "row-reverse" : "row",
                        marginRight: isRTL ? 0 : 12,
                        marginLeft: isRTL ? 12 : 0,
                      },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedService(option.id)}
                  >
                    <MaterialIcons
                      name={option.icon as any}
                      size={18}
                      color={isActive ? theme.colors.primary : theme.colors.textSecondary}
                      style={iconMarginStyle}
                    />
                    <Text
                      style={[
                        styles.serviceOptionText,
                        {
                          color: theme.colors.text,
                          textAlign: isRTL ? "right" : "left",
                        },
                      ]}
                    >
                      {t(option.labelKey)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.field}>
            <Text
              style={[
                styles.inputLabel,
                { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {t("bookingRequest.locationLabel")}
            </Text>
            <View style={styles.locationWrapper}>
              <MaterialIcons
                name="location_on"
                size={20}
                color={theme.colors.primary}
                style={isRTL ? styles.locationIconRTL : styles.locationIcon}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.locationInput,
                  {
                    borderColor: theme.colors.borderLight,
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    textAlign: isRTL ? "right" : "left",
                    paddingLeft: isRTL ? 16 : 44,
                    paddingRight: isRTL ? 44 : 16,
                  },
                ]}
                placeholder={t("bookingRequest.locationPlaceholder")}
                placeholderTextColor={theme.colors.textSecondary}
                value={location}
                onChangeText={setLocation}
              />
              <TouchableOpacity
                style={[styles.locationAction, isRTL && styles.locationActionRTL]}
                activeOpacity={0.7}
              >
                <MaterialIcons name="my_location" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.mapCard}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvWNsLl8zxBQq2mNT4Ml0daxnNMSNPPXVq4CPnqASrZwEV6RYzePCHiVLrdwvErd7bYeJR-7I_EbcSfsL3APhqKfQ7vw1fogtVpF2tIhfV5mbt0A0MEA0dzltAJF0KY-9PKXHXD9P_Ul-7x5iS_C_3iShtg5cqt_0Xa_OkEMtnus2QjzljgXkEqVGRyWu6rzycYr1yf8PLqGPiESqg0S0C9mkDxfR1CYCdXejST_2GRXgxffDQolAdknbLHEASpxaNvmlGPwQUq2g",
                }}
                style={styles.mapImage}
                resizeMode="cover"
              />
              <View style={styles.mapOverlay}>
                <Text
                  style={[
                    styles.mapOverlayText,
                    {
                      color: theme.colors.text,
                      backgroundColor: theme.colors.surface,
                    },
                  ]}
                >
                  {t("bookingRequest.editOnMap")}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.field}>
            <Text
              style={[
                styles.inputLabel,
                { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {t("bookingRequest.dateTimeLabel")}
            </Text>
            <View
              style={[
                styles.dateRow,
                { flexDirection: isRTL ? "row-reverse" : "row" },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.dateCard,
                  dateItemSpacing,
                  { flexDirection: isRTL ? "row-reverse" : "row" },
                ]}
                activeOpacity={0.8}
                onPress={handleDatePress}
              >
                <MaterialIcons
                  name="calendar_today"
                  size={20}
                  color={theme.colors.primary}
                  style={iconMarginStyle}
                />
                <Text
                  style={[
                    styles.dateText,
                    { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
                  ]}
                >
                  {formattedDate}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.dateCard,
                  { flexDirection: isRTL ? "row-reverse" : "row" },
                ]}
                activeOpacity={0.8}
                onPress={handleTimePress}
              >
                <MaterialIcons
                  name="schedule"
                  size={20}
                  color={theme.colors.primary}
                  style={iconMarginStyle}
                />
                <Text
                  style={[
                    styles.dateText,
                    { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
                  ]}
                >
                  {formattedTime}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.field}>
            <Text
              style={[
                styles.inputLabel,
                { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {t("bookingRequest.notesLabel")}
            </Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  borderColor: theme.colors.borderLight,
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  textAlign: isRTL ? "right" : "left",
                },
              ]}
              placeholder={t("bookingRequest.notesPlaceholder")}
              placeholderTextColor={theme.colors.textSecondary}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.field}>
            <Text
              style={[
                styles.inputLabel,
                { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {t("bookingRequest.addPhotos")}
            </Text>
            <View style={styles.photoGrid}>
              <View
                style={[styles.photoCard, { backgroundColor: theme.colors.surface }]}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCefm5klCaI6JLHh06gmSWzL2snsOiR5x6LXqYGbo-wtvEqBIJZCaNZsYPbmyL4g0wBfcbF-Ftd8_Bgi74lB02fITCfUftSOAmLaF6K3Tu-Z0ANTn9o6CCKcecaeZQUU3P9_ShqqOrmryD6wnru8vtorhBVm2Y759Gor63IDfUgRs0Hw50lm1zxWJWeHuoIR5lbxHHgcqBBWEWpNk8M3YeuRYo8686slgrPOJf7lO9vKFORcvVPxXSo5I900NlL0QOInGAMdt3NaAU",
                  }}
                  style={styles.photoImage}
                  resizeMode="cover"
                />
                <TouchableOpacity style={styles.photoRemove} activeOpacity={0.8}>
                  <MaterialIcons name="close" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  styles.photoAddCard,
                  {
                    borderColor: theme.colors.borderLight,
                    backgroundColor: theme.colors.surface,
                  },
                ]}
                activeOpacity={0.8}
                onPress={handleAddPhoto}
              >
                <MaterialIcons
                  name="add_a_photo"
                  size={24}
                  color={theme.colors.textSecondary}
                />
                <Text style={[styles.photoAddText, { color: theme.colors.textSecondary }]}>
                  {t("bookingRequest.addButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.borderLight,
          },
        ]}
      >
        <View
          style={[
            styles.estimatedRow,
            { flexDirection: isRTL ? "row-reverse" : "row" },
          ]}
        >
          <Text style={[styles.estimatedLabel, { color: theme.colors.textSecondary }]}>
            {t("bookingRequest.estimatedCostTitle")}
          </Text>
          <Text style={[styles.estimatedValue, { color: theme.colors.text }]}>
            {t("bookingRequest.estimatedCostValue")}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            {
              backgroundColor: theme.colors.primary,
              flexDirection: isRTL ? "row-reverse" : "row",
            },
          ]}
          activeOpacity={0.9}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>{t("bookingRequest.confirmButton")}</Text>
          <MaterialIcons
            name={isRTL ? "arrow_back" : "arrow_forward"}
            size={20}
            color="#fff"
            style={confirmIconMargin}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitles: {
    flex: 1,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 180,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },
  categoryList: {
    paddingVertical: 4,
  },
  categoryButton: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },
  field: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    fontSize: 16,
    textAlignVertical: "top",
  },
  serviceOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceOption: {
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minWidth: "48%",
    alignItems: "center",
  },
  serviceOptionText: {
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1,
  },
  locationWrapper: {
    position: "relative",
  },
  locationIcon: {
    position: "absolute",
    left: 16,
    top: 18,
  },
  locationIconRTL: {
    position: "absolute",
    right: 16,
    top: 18,
  },
  locationInput: {
    paddingLeft: 44,
    paddingRight: 44,
  },
  locationAction: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  locationActionRTL: {
    position: "absolute",
    left: 16,
    top: 16,
  },
  mapCard: {
    marginTop: 12,
    borderRadius: 20,
    height: 150,
    overflow: "hidden",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  mapOverlay: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  mapOverlayText: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "700",
  },
  dateRow: {
    justifyContent: "space-between",
  },
  dateCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 16,
    backgroundColor: "rgba(83,210,45,0.05)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photoCard: {
    width: "46%",
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    marginBottom: 12,
  },
  photoImage: {
    width: "100%",
    height: "100%",
  },
  photoRemove: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 999,
    padding: 4,
  },
  photoAddCard: {
    width: "46%",
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  photoAddText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  footer: {
    borderTopWidth: 1,
    padding: 16,
  },
  estimatedRow: {
    marginBottom: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  estimatedLabel: {
    fontSize: 14,
  },
  estimatedValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  confirmButton: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default BookingRequestScreen;
