import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthStore } from "../store/authStore";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";

const { width } = Dimensions.get("window");

// Types
interface Category {
  id: string;
  nameKey: string;
  icon: string;
  isActive?: boolean;
}

interface Technician {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  status: "available" | "busy";
  avatar: string;
}

// Mock data with translation keys
const CATEGORIES: Category[] = [
  { id: "1", nameKey: "home.plumbing", icon: "water-drop", isActive: true },
  { id: "2", nameKey: "home.electric", icon: "bolt", isActive: false },
  { id: "3", nameKey: "home.carpentry", icon: "handyman", isActive: false },
  { id: "4", nameKey: "home.acRepair", icon: "ac-unit", isActive: false },
  { id: "5", nameKey: "home.painting", icon: "format-paint", isActive: false },
];

const TECHNICIANS: Technician[] = [
  {
    id: "1",
    name: "Karim Hassan",
    specialty: "Master Electrician",
    rating: 4.9,
    status: "available",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQBaxCUNZ_rYT3bR9Am-4Vb1uRu43tLpnBGF6YbnB21wYfNw9PI81B5tAelRGzgIP2BBmoAM_5MpnnNV4N5sM_tqxaVHTKxpKNK8T_Um5QcKGNb6K3xEGwGspzammGC1ZUxAHpTD5lDqUTycbkqKeWQ8YkI5Z_HNFit64ZfZ1SyGh9Q16Yxkt1fPgjqoZqQDuCTeegbK-dx2Q-LZDq_dJxEf20d6FduT59POfZNQB08_KO6rkx6Yix6-mQb1GgQ2agArTX-JVSQUc",
  },
  {
    id: "2",
    name: "Sara Mahmoud",
    specialty: "Plumbing Expert",
    rating: 4.8,
    status: "busy",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7TLo0vKMmMC57c4FDbyK_W99h4bRN7qKf4ucB2Lz5sZvNN_VYvzJ5SDxV8x5Zv4evkaOYh4QA5CFUmRBtaeevontmldNoAm3ksXWyr7MO7R9W3RTeUk1CkSO-Y1EDRqUGdnMu94XZd4DBLHTcg0ZgqMlGgS3kwrcCu3l0JAD6YkejI9Bhi4wCfiPHfJQ5Dht_wUK5vBYTdLiEikue2IEhTtJB6bJf6391-sBNd8no_4Zhz0FKrRLL2tFxR97GTNTzAd-Yhp8beuY",
  },
];

// Header Component
const Header: React.FC = () => {
  const { user } = useAuthStore();
  const { t } = useLanguage();
  const { theme, isDark } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("home.goodMorning");
    if (hour < 17) return t("home.goodAfternoon");
    return t("home.goodEvening");
  };

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContent}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user?.avatar || "https://via.placeholder.com/48" }}
              style={styles.avatar}
            />
            <View
              style={[
                styles.onlineIndicator,
                { backgroundColor: theme.colors.primary },
              ]}
            />
          </View>
          <View style={styles.greetingContainer}>
            <Text style={[styles.greetingName, { color: theme.colors.text }]}>
              {getGreeting()}, {user?.name || "Ahmed"}
            </Text>
            <Text
              style={[
                styles.greetingSubtext,
                { color: theme.colors.textSecondary },
              ]}
            >
              {t("home.readyToBuild")}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <MaterialIcons
            name="notifications"
            size={28}
            color={isDark ? "#FFFFFF" : theme.colors.text}
          />
          <View
            style={[
              styles.notificationBadge,
              { backgroundColor: theme.colors.primary },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Search Bar Component
const SearchBarComponent: React.FC = () => {
  const { t } = useLanguage();
  const { theme, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.searchContainer}>
      <View
        style={[
          styles.searchBar,
          {
            backgroundColor: theme.colors.surfaceSecondary,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <MaterialIcons
          name="search"
          size={24}
          color={theme.colors.textSecondary}
        />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder={t("home.searchPlaceholder")}
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: theme.colors.primary },
          ]}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name="tune"
            size={20}
            color={theme.colors.background}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Quick Action Card Component
interface QuickActionCardProps {
  icon: string;
  titleKey: string;
  subtitleKey: string;
  variant: "primary" | "danger" | "purple";
  onPress?: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  titleKey,
  subtitleKey,
  variant,
  onPress,
}) => {
  const { t } = useLanguage();
  const { theme, isDark } = useTheme();

  const getIconColor = () => {
    switch (variant) {
      case "danger":
        return theme.colors.error;
      case "purple":
        return "#8B5CF6";
      default:
        return theme.colors.primary;
    }
  };

  const getBackgroundColor = (opacity: string) => {
    switch (variant) {
      case "danger":
        return `${theme.colors.error}${opacity}`;
      case "purple":
        return `#8B5CF6${opacity}`;
      default:
        return `${theme.colors.primary}${opacity}`;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.quickActionCard,
        {
          backgroundColor: theme.colors.surfaceSecondary,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.quickActionIcon,
          { backgroundColor: getBackgroundColor("15") },
        ]}
      >
        <MaterialIcons name={icon as any} size={24} color={getIconColor()} />
      </View>
      <View>
        <Text style={[styles.quickActionTitle, { color: theme.colors.text }]}>
          {t(titleKey)}
        </Text>
        <Text
          style={[
            styles.quickActionSubtitle,
            { color: theme.colors.textSecondary },
          ]}
        >
          {t(subtitleKey)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Quick Actions Grid
const QuickActionsGrid: React.FC = () => {
  const { t } = useLanguage();
  const navigation = useNavigation<
    NativeStackNavigationProp<RootStackParamList>
  >();
  const handlePress = (feature: string) =>
    Alert.alert(
      t("common.comingSoon"),
      `${feature} ${t("common.comingSoon").toLowerCase()}`,
    );

  return (
    <View style={styles.quickActionsContainer}>
      <View style={styles.quickActionsGrid}>
        <QuickActionCard
          icon="add-circle"
          titleKey="home.bookService"
          subtitleKey="home.scheduleNew"
          variant="primary"
          onPress={() => navigation.navigate("BookingRequest")}
        />
        <QuickActionCard
          icon="home"
          titleKey="home.urgentRepair"
          subtitleKey="home.priorityHelp"
          variant="danger"
          onPress={() => handlePress("Urgent Repair")}
        />
        <QuickActionCard
          icon="engineering"
          titleKey="home.myProjects"
          subtitleKey="home.activeProjects"
          variant="primary"
          onPress={() => handlePress("My Projects")}
        />
        <QuickActionCard
          icon="support-agent"
          titleKey="home.support"
          subtitleKey="home.support247"
          variant="purple"
          onPress={() => handlePress("Support")}
        />
      </View>
    </View>
  );
};

// Active Project Card
const ActiveProjectCard: React.FC = () => {
  const { t } = useLanguage();
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.activeProjectSection}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {t("home.activeProject")}
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={[styles.viewAllLink, { color: theme.colors.primary }]}>
            {t("common.viewAll")}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.projectCard,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.projectImageContainer}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1QIlA8i16qvP6ecpiQ-hk90KR7E4PpgXB5u_dkxn0wdLp6UeZ7NtgfByoPTyLb-If1vUv49IfTkbzpJ4CuqwG_PApe7I-bcBhK9Pk-TPN74yXOGlYcmjsoOeWl4UOzA3Xj8TXAZl-pzsFBF-QPT1vRaiJLF--X6tw7RnCPnUZGsS11SJWRO3uUpOBYzQkrIv2CXrSVgYmWdM0AowFpWJSoN33AkRS5KgP3ZctWCoUeKzUzHGOriW93w2Imhb1_4kj6xjXJMZt52g",
            }}
            style={styles.projectImage}
          />
          <View style={styles.projectImageOverlay} />
          <View style={styles.projectHeader}>
            <Text style={styles.projectTitle}>Kitchen Renovation</Text>
            <View style={styles.phaseBadge}>
              <Text style={styles.phaseText}>
                {t("home.phase", { number: 2 })}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.projectDetails}>
          <View style={styles.timeline}>
            <View style={styles.timelineTrack}>
              <View
                style={[
                  styles.timelineDotActive,
                  { backgroundColor: theme.colors.primary },
                ]}
              />
              <View
                style={[
                  styles.timelineLine,
                  { backgroundColor: theme.colors.border },
                ]}
              />
              <View style={styles.timelineDotInactive} />
            </View>
            <View style={styles.timelineContent}>
              <View>
                <Text
                  style={[styles.timelineTitle, { color: theme.colors.text }]}
                >
                  {t("home.arrivingIn", { time: "15 mins" })}
                </Text>
                <Text
                  style={[
                    styles.timelineSubtitle,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Electrical wiring installation
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.timelineTitleInactive,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  {t("home.inspectionPending")}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.trackButton,
              { backgroundColor: theme.colors.primary },
            ]}
            activeOpacity={0.9}
          >
            <MaterialIcons
              name="location-on"
              size={20}
              color={theme.colors.background}
            />
            <Text
              style={[
                styles.trackButtonText,
                { color: theme.colors.background },
              ]}
            >
              {t("home.trackTechnician")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Categories Section
const CategoriesSection: React.FC = () => {
  const { t } = useLanguage();
  const { theme, isDark } = useTheme();

  return (
    <View style={styles.categoriesSection}>
      <Text
        style={[
          styles.sectionTitle,
          { color: theme.colors.text, marginBottom: 12 },
        ]}
      >
        {t("home.categories")}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.categoryIconContainer,
                {
                  backgroundColor: theme.colors.surfaceSecondary,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <MaterialIcons
                name={category.icon as any}
                size={32}
                color={
                  category.isActive
                    ? theme.colors.primary
                    : theme.colors.textSecondary
                }
              />
            </View>
            <Text
              style={[
                styles.categoryName,
                category.isActive
                  ? { color: theme.colors.text, fontWeight: "700" }
                  : { color: theme.colors.textSecondary },
              ]}
            >
              {t(category.nameKey)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Technician Card
interface TechnicianCardProps {
  technician: Technician;
}

const TechnicianCard: React.FC<TechnicianCardProps> = ({ technician }) => {
  const { t } = useLanguage();
  const { theme, isDark } = useTheme();

  return (
    <View
      style={[
        styles.technicianCard,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <Image
        source={{ uri: technician.avatar }}
        style={styles.technicianAvatar}
      />
      <View style={styles.technicianInfo}>
        <View style={styles.technicianHeader}>
          <Text
            style={[styles.technicianName, { color: theme.colors.text }]}
            numberOfLines={1}
          >
            {technician.name}
          </Text>
          <View
            style={[
              styles.statusBadge,
              technician.status === "available"
                ? { backgroundColor: `${theme.colors.primary}15` }
                : { backgroundColor: theme.colors.surfaceSecondary },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                technician.status === "available"
                  ? { color: theme.colors.primary }
                  : { color: theme.colors.textSecondary },
              ]}
            >
              {technician.status === "available"
                ? t("home.available")
                : t("home.busy")}
            </Text>
          </View>
        </View>
        <View style={styles.technicianMeta}>
          <Text
            style={[
              styles.technicianSpecialty,
              { color: theme.colors.textSecondary },
            ]}
          >
            {technician.specialty}
          </Text>
          <View
            style={[
              styles.dotSeparator,
              { backgroundColor: theme.colors.border },
            ]}
          />
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={14} color="#EAB308" />
            <Text style={[styles.ratingText, { color: theme.colors.text }]}>
              {technician.rating}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.technicianAction,
          technician.status === "available"
            ? { backgroundColor: theme.colors.primary }
            : { borderColor: theme.colors.border },
        ]}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name={
            technician.status === "available"
              ? "arrow-forward"
              : "calendar-month"
          }
          size={20}
          color={
            technician.status === "available"
              ? theme.colors.background
              : theme.colors.textSecondary
          }
        />
      </TouchableOpacity>
    </View>
  );
};

// Top Rated Section
const TopRatedSection: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <View style={styles.topRatedSection}>
      <Text
        style={[
          styles.sectionTitle,
          { color: theme.colors.text, marginBottom: 12 },
        ]}
      >
        {t("home.topRatedNearby")}
      </Text>
      <View style={styles.techniciansList}>
        {TECHNICIANS.map((technician) => (
          <TechnicianCard key={technician.id} technician={technician} />
        ))}
      </View>
    </View>
  );
};

// Main Home Screen
const HomeScreen: React.FC = () => {
  const { theme, isDark } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={["top"]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBarComponent />
        <QuickActionsGrid />
        <ActiveProjectCard />
        <CategoriesSection />
        <TopRatedSection />
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  bottomSpacer: {
    height: 100,
  },

  // Header Styles
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "rgba(83,210,45,0.1)",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  greetingContainer: {
    gap: 2,
  },
  greetingName: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
  },
  greetingSubtext: {
    fontSize: 12,
    fontWeight: "500",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  // Search Bar Styles
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    height: 48,
    paddingLeft: 16,
    paddingRight: 4,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    marginLeft: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  // Quick Actions Styles
  quickActionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickActionCard: {
    width: (width - 56) / 2,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    gap: 12,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
  quickActionSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },

  // Active Project Styles
  activeProjectSection: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  viewAllLink: {
    fontSize: 14,
    fontWeight: "600",
  },
  projectCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  projectImageContainer: {
    height: 160,
    position: "relative",
  },
  projectImage: {
    width: "100%",
    height: "100%",
  },
  projectImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  projectHeader: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  phaseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  phaseText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  projectDetails: {
    padding: 16,
    gap: 16,
  },
  timeline: {
    flexDirection: "row",
    gap: 12,
  },
  timelineTrack: {
    alignItems: "center",
    gap: 4,
  },
  timelineDotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  timelineLine: {
    width: 2,
    height: 32,
  },
  timelineDotInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E5E7EB",
  },
  timelineContent: {
    flex: 1,
    gap: 24,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  timelineTitleInactive: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.5,
  },
  timelineSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  trackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    borderRadius: 12,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },

  // Categories Styles
  categoriesSection: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  categoryItem: {
    alignItems: "center",
    gap: 8,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "600",
  },

  // Top Rated Styles
  topRatedSection: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  techniciansList: {
    gap: 12,
  },
  technicianCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  technicianAvatar: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  technicianInfo: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  technicianHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  technicianName: {
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  technicianMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  technicianSpecialty: {
    fontSize: 12,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
  },
  technicianAction: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});

export default HomeScreen;
