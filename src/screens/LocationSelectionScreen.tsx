import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

const MAP_PLACEHOLDER_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuApJhqgS_OgtqetBBjVx4lZ6P2sLWRXT2uN6mtnNZe5qpsihC2WOicVuwTFjN8X7E1u6GPaCcuVM2pUgmSC5vPGwG2Ir2KQrihiMDK_Dpo4GM207UTDPFPP22Drzt4ppKIq0gp-0IbzM2cHc5Jf3FI9BDs_amGbIoq0k0tx6O_Y6fu-NFct4zfZBIaXgpsHzFaPVfQSEllr7jU6IlfWNJopHReh0milQhw8u8ONK3r3_3IWZELyA1KXs1kr8PWD3aWTp0CnLE8Bkpc";

type Props = NativeStackScreenProps<RootStackParamList, "LocationSelection">;

const LocationSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const { currentPlace, onLocationSelected, currentCoords } = route.params ?? {};

  const [address, setAddress] = useState(
    currentPlace || t("locationSelection.defaultAddress"),
  );
  const [details, setDetails] = useState("");
  const [coords, setCoords] = useState(
    currentCoords ?? { lat: 24.7136, lng: 46.6753 },
  );

  const screenWidth = Dimensions.get("window").width;
  const mapHeight = useMemo(() => {
    return Math.max(260, screenWidth * 0.65);
  }, [screenWidth]);

  const handleCurrentLocation = useCallback(() => {
    const updatedCoords = { lat: 24.7136, lng: 46.6753 };
    setCoords(updatedCoords);
    setAddress(t("locationSelection.currentLocationAddress"));
  }, [t]);

  const handleConfirmLocation = useCallback(() => {
    onLocationSelected?.(address, coords);
    navigation.goBack();
  }, [address, coords, navigation, onLocationSelected]);

  const iconSpacing = isRTL ? { marginLeft: 8 } : { marginRight: 8 };
  const tagIconSpacing = isRTL ? { marginLeft: 6 } : { marginRight: 6 };
  const confirmIconMargin = isRTL ? { marginRight: 6 } : { marginLeft: 6 };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundSecondary },
      ]}
      edges={["top", "bottom"]}
    >
      <View
        style={[
          styles.header,
          {
            flexDirection: isRTL ? "row-reverse" : "row",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.headerButton,
            { backgroundColor: theme.colors.surfaceSecondary },
          ]}
        >
          <MaterialIcons
            name={isRTL ? "arrow_forward" : "arrow_back"}
            size={22}
            color={theme.colors.text}
          />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text
            style={[
              styles.headerTitle,
              { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
            ]}
          >
            {t("locationSelection.title")}
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
            {t("locationSelection.subtitle")}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.borderLight,
            marginHorizontal: 20,
            flexDirection: isRTL ? "row-reverse" : "row",
          },
        ]}
      >
        <MaterialIcons
          name="search"
          size={20}
          color={theme.colors.textSecondary}
          style={iconSpacing}
        />
        <TextInput
          style={[
            styles.searchInput,
            {
              color: theme.colors.text,
              marginLeft: isRTL ? 0 : 10,
              marginRight: isRTL ? 10 : 0,
            },
          ]}
          placeholder={t("locationSelection.searchPlaceholder")}
          placeholderTextColor={theme.colors.textSecondary}
          value={address}
          onChangeText={setAddress}
        />
      </View>

  <View style={[styles.mapContainer, { height: mapHeight }]}>
        <View
          style={[
            styles.mapPlaceholder,
            {
              backgroundColor: theme.colors.surfaceSecondary,
              borderColor: theme.colors.borderLight,
            },
          ]}
        >
          <Image
            source={{ uri: MAP_PLACEHOLDER_URL }}
            style={[styles.mapPattern, { opacity: isRTL ? 0.9 : 1 }]}
            resizeMode="cover"
          />
        </View>
        <View style={styles.pinWrapper}>
          <View
            style={[
              styles.pinHead,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <View style={styles.pinInner} />
          </View>
          <View
            style={[
              styles.pinPoint,
              { backgroundColor: theme.colors.primary },
            ]}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.currentLocationButton,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.borderLight,
            },
          ]}
          activeOpacity={0.8}
          onPress={handleCurrentLocation}
        >
          <MaterialIcons name="my_location" size={20} color={theme.colors.primary} />
          <Text
            style={[
              styles.currentLocationText,
              { color: theme.colors.text },
              iconSpacing,
            ]}
          >
            {t("locationSelection.useCurrentLocation")}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.bottomCard,
          {
            backgroundColor: theme.colors.surface,
            shadowColor: theme.colors.shadow,
          },
        ]}
      >
        <View
          style={[
            styles.handle,
            { backgroundColor: theme.colors.borderLight },
          ]}
        />
        <View style={styles.addressBlock}>
          <View
            style={[
              styles.addressRow,
              { flexDirection: isRTL ? "row-reverse" : "row" },
            ]}
          >
            <Text style={styles.addressLabel}>
              {t("locationSelection.selectedLocation")}
            </Text>
            <TouchableOpacity>
              <Text style={styles.changeButton}>
                {t("locationSelection.change")}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.addressTitle}>{address}</Text>
          <Text style={styles.addressSubtitle}>
            {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
          </Text>
        </View>

          <View
            style={[
              styles.detailsInputWrapper,
              {
                borderColor: theme.colors.borderLight,
                backgroundColor: theme.colors.surfaceSecondary,
              },
            ]}
          >
            <MaterialIcons
              name="apartment"
              size={20}
              color={theme.colors.textSecondary}
              style={tagIconSpacing}
            />
            <TextInput
            style={[
              styles.detailsInput,
              { color: theme.colors.text, textAlign: isRTL ? "right" : "left" },
            ]}
            placeholder={t("locationSelection.detailsPlaceholder")}
            placeholderTextColor={theme.colors.textSecondary}
            value={details}
            onChangeText={setDetails}
          />
        </View>

        <View
          style={[
            styles.tagRow,
            { flexDirection: isRTL ? "row-reverse" : "row" },
          ]}
        >
          <View
            style={[
              styles.tag,
              styles.tagPrimary,
              {
                borderColor: theme.colors.primary,
                backgroundColor: `${theme.colors.primary}22`,
              },
            ]}
          >
            <MaterialIcons
              name="home"
              size={14}
              color={theme.colors.primary}
              style={tagIconSpacing}
            />
            <Text style={[styles.tagText, { color: theme.colors.primary }]}>
              {t("locationSelection.tagHome")}
            </Text>
          </View>
          <View
            style={[
              styles.tag,
              {
                borderColor: theme.colors.borderLight,
                backgroundColor: theme.colors.surfaceSecondary,
                ...(isRTL ? { marginRight: 12 } : { marginLeft: 12 }),
              },
            ]}
          >
            <MaterialIcons
              name="work"
              size={14}
              color={theme.colors.textSecondary}
              style={tagIconSpacing}
            />
            <Text style={[styles.tagText, { color: theme.colors.textSecondary }]}>
              {t("locationSelection.tagWork")}
            </Text>
          </View>
          <View
            style={[
              styles.tag,
              {
                borderColor: theme.colors.borderLight,
                backgroundColor: theme.colors.surfaceSecondary,
                ...(isRTL ? { marginRight: 12 } : { marginLeft: 12 }),
              },
            ]}
          >
            <MaterialIcons
              name="add"
              size={14}
              color={theme.colors.textSecondary}
              style={tagIconSpacing}
            />
            <Text style={[styles.tagText, { color: theme.colors.textSecondary }]}>
              {t("locationSelection.tagOther")}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            {
              backgroundColor: theme.colors.primary,
              flexDirection: isRTL ? "row-reverse" : "row",
            },
          ]}
          activeOpacity={0.95}
          onPress={handleConfirmLocation}
        >
          <Text style={styles.confirmText}>
            {t("locationSelection.confirmButton")}
          </Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: "center",
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  mapContainer: {
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  mapPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    borderWidth: 1,
    overflow: "hidden",
  },
  mapPattern: {
    width: "100%",
    height: "100%",
  },
  pinWrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  pinHead: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  pinInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  pinPoint: {
    width: 28,
    height: 28,
    transform: [{ rotate: "45deg" }],
    borderRadius: 6,
    marginTop: -14,
  },
  currentLocationButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
  },
  currentLocationText: {
    fontSize: 14,
    fontWeight: "600",
  },
  bottomCard: {
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 10,
  },
  handle: {
    width: 60,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    alignSelf: "center",
    marginBottom: 18,
  },
  addressBlock: {
    marginBottom: 16,
  },
  addressRow: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressLabel: {
    fontSize: 10,
    letterSpacing: 1,
    color: "#94A3B8",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  changeButton: {
    fontSize: 12,
    fontWeight: "700",
    color: "#53D22D",
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  addressSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  detailsInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  detailsInput: {
    flex: 1,
    fontSize: 14,
  },
  tagRow: {
    marginBottom: 18,
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  tagPrimary: {
    backgroundColor: "#ECFDF3",
    borderColor: "rgba(83,210,45,0.3)",
  },
  tagText: {
    fontSize: 12,
    color: "#475467",
    fontWeight: "600",
  },
  confirmButton: {
    marginTop: 8,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default LocationSelectionScreen;
