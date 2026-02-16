import React, { useState } from 'react';
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
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';

const { width } = Dimensions.get('window');

// Color constants from design
const COLORS = {
  primary: '#53D22D',
  primaryDark: '#46B426',
  backgroundWhite: '#FFFFFF',
  surfaceLight: '#F9FAFB',
  charcoal: '#333333',
  textSecondary: '#6B7280',
  borderLight: '#E5E7EB',
  red: '#EF4444',
  purple: '#8B5CF6',
  yellow: '#EAB308',
};

// Types
interface Category {
  id: string;
  name: string;
  icon: string;
  isActive?: boolean;
}

interface Technician {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  status: 'available' | 'busy';
  avatar: string;
}

// Mock data
const CATEGORIES: Category[] = [
  { id: '1', name: 'Plumbing', icon: 'water-drop', isActive: true },
  { id: '2', name: 'Electric', icon: 'bolt', isActive: false },
  { id: '3', name: 'Carpentry', icon: 'handyman', isActive: false },
  { id: '4', name: 'AC Repair', icon: 'ac-unit', isActive: false },
  { id: '5', name: 'Painting', icon: 'format-paint', isActive: false },
];

const TECHNICIANS: Technician[] = [
  {
    id: '1',
    name: 'Karim Hassan',
    specialty: 'Master Electrician',
    rating: 4.9,
    status: 'available',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQBaxCUNZ_rYT3bR9Am-4Vb1uRu43tLpnBGF6YbnB21wYfNw9PI81B5tAelRGzgIP2BBmoAM_5MpnnNV4N5sM_tqxaVHTKxpKNK8T_Um5QcKGNb6K3xEGwGspzammGC1ZUxAHpTD5lDqUTycbkqKeWQ8YkI5Z_HNFit64ZfZ1SyGh9Q16Yxkt1fPgjqoZqQDuCTeegbK-dx2Q-LZDq_dJxEf20d6FduT59POfZNQB08_KO6rkx6Yix6-mQb1GgQ2agArTX-JVSQUc',
  },
  {
    id: '2',
    name: 'Sara Mahmoud',
    specialty: 'Plumbing Expert',
    rating: 4.8,
    status: 'busy',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7TLo0vKMmMC57c4FDbyK_W99h4bRN7qKf4ucB2Lz5sZvNN_VYvzJ5SDxV8x5Zv4evkaOYh4QA5CFUmRBtaeevontmldNoAm3ksXWyr7MO7R9W3RTeUk1CkSO-Y1EDRqUGdnMu94XZd4DBLHTcg0ZgqMlGgS3kwrcCu3l0JAD6YkejI9Bhi4wCfiPHfJQ5Dht_wUK5vBYTdLiEikue2IEhTtJB6bJf6391-sBNd8no_4Zhz0FKrRLL2tFxR97GTNTzAd-Yhp8beuY',
  },
];

// Header Component
const Header: React.FC = () => {
  const { user } = useAuthStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <View style={[styles.header, isDark && styles.headerDark]}>
      <View style={styles.headerContent}>
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user?.avatar || 'https://via.placeholder.com/48' }}
              style={styles.avatar}
            />
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.greetingContainer}>
            <Text style={[styles.greetingName, isDark && styles.textDark]}>
              {getGreeting()}, {user?.name || 'Ahmed'}
            </Text>
            <Text style={styles.greetingSubtext}>Ready to build today?</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <MaterialIcons name="notifications" size={28} color={isDark ? '#FFFFFF' : COLORS.charcoal} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Search Bar Component
const SearchBar: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.searchContainer}>
      <View style={[styles.searchBar, isDark && styles.searchBarDark]}>
        <MaterialIcons name="search" size={24} color={COLORS.textSecondary} />
        <TextInput
          style={[styles.searchInput, isDark && styles.textDark]}
          placeholder="Search electricians, plumbers..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
          <MaterialIcons name="tune" size={20} color={COLORS.backgroundWhite} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Quick Action Card Component
interface QuickActionCardProps {
  icon: string;
  title: string;
  subtitle: string;
  variant: 'primary' | 'danger' | 'purple';
  onPress?: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ icon, title, subtitle, variant, onPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const getIconColor = () => {
    switch (variant) {
      case 'danger': return COLORS.red;
      case 'purple': return COLORS.purple;
      default: return COLORS.primary;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.quickActionCard, isDark && styles.quickActionCardDark]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: `${getIconColor()}15` }]}>
        <MaterialIcons name={icon as any} size={24} color={getIconColor()} />
      </View>
      <View>
        <Text style={[styles.quickActionTitle, isDark && styles.textDark]}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Quick Actions Grid
const QuickActionsGrid: React.FC = () => {
  const handleBookService = () => Alert.alert('Coming Soon', 'Booking feature coming soon!');
  const handleUrgentRepair = () => Alert.alert('Coming Soon', 'Urgent repair feature coming soon!');
  const handleMyProjects = () => Alert.alert('Coming Soon', 'Projects feature coming soon!');
  const handleSupport = () => Alert.alert('Coming Soon', 'Support chat coming soon!');

  return (
    <View style={styles.quickActionsContainer}>
      <View style={styles.quickActionsGrid}>
        <QuickActionCard
          icon="add-circle"
          title="Book Service"
          subtitle="Schedule new"
          variant="primary"
          onPress={handleBookService}
        />
        <QuickActionCard
          icon="home"
          title="Urgent Repair"
          subtitle="Priority help"
          variant="danger"
          onPress={handleUrgentRepair}
        />
        <QuickActionCard
          icon="engineering"
          title="My Projects"
          subtitle="2 Active"
          variant="primary"
          onPress={handleMyProjects}
        />
        <QuickActionCard
          icon="support-agent"
          title="Support"
          subtitle="24/7 Chat"
          variant="purple"
          onPress={handleSupport}
        />
      </View>
    </View>
  );
};

// Active Project Card
const ActiveProjectCard: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.activeProjectSection}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Active Project</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.projectCard, isDark && styles.projectCardDark]}>
        <View style={styles.projectImageContainer}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1QIlA8i16qvP6ecpiQ-hk90KR7E4PpgXB5u_dkxn0wdLp6UeZ7NtgfByoPTyLb-If1vUv49IfTkbzpJ4CuqwG_PApe7I-bcBhK9Pk-TPN74yXOGlYcmjsoOeWl4UOzA3Xj8TXAZl-pzsFBF-QPT1vRaiJLF--X6tw7RnCPnUZGsS11SJWRO3uUpOBYzQkrIv2CXrSVgYmWdM0AowFpWJSoN33AkRS5KgP3ZctWCoUeKzUzHGOriW93w2Imhb1_4kj6xjXJMZt52g' }}
            style={styles.projectImage}
          />
          <View style={styles.projectImageOverlay} />
          <View style={styles.projectHeader}>
            <Text style={styles.projectTitle}>Kitchen Renovation</Text>
            <View style={styles.phaseBadge}>
              <Text style={styles.phaseText}>Phase 2</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.projectDetails}>
          <View style={styles.timeline}>
            <View style={styles.timelineTrack}>
              <View style={styles.timelineDotActive} />
              <View style={styles.timelineLine} />
              <View style={styles.timelineDotInactive} />
            </View>
            <View style={styles.timelineContent}>
              <View>
                <Text style={[styles.timelineTitle, isDark && styles.textDark]}>Technician arriving in 15 mins</Text>
                <Text style={styles.timelineSubtitle}>Electrical wiring installation</Text>
              </View>
              <View>
                <Text style={[styles.timelineTitleInactive, isDark && styles.textDark]}>Inspection Pending</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.trackButton} activeOpacity={0.9}>
            <MaterialIcons name="location-on" size={20} color={COLORS.backgroundWhite} />
            <Text style={styles.trackButtonText}>Track Technician</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Categories Section
const CategoriesSection: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.categoriesSection}>
      <Text style={[styles.sectionTitle, isDark && styles.textDark, { marginBottom: 12 }]}>Categories</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoriesScroll}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryItem} activeOpacity={0.8}>
            <View style={[styles.categoryIconContainer, isDark && styles.categoryIconContainerDark]}>
              <MaterialIcons 
                name={category.icon as any} 
                size={32} 
                color={category.isActive ? COLORS.primary : COLORS.textSecondary} 
              />
            </View>
            <Text style={[styles.categoryName, category.isActive && styles.categoryNameActive]}>
              {category.name}
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.technicianCard, isDark && styles.technicianCardDark]}>
      <Image source={{ uri: technician.avatar }} style={styles.technicianAvatar} />
      <View style={styles.technicianInfo}>
        <View style={styles.technicianHeader}>
          <Text style={[styles.technicianName, isDark && styles.textDark]} numberOfLines={1}>
            {technician.name}
          </Text>
          <View style={[
            styles.statusBadge,
            technician.status === 'available' ? styles.statusAvailable : styles.statusBusy
          ]}>
            <Text style={[
              styles.statusText,
              technician.status === 'available' ? styles.statusTextAvailable : styles.statusTextBusy
            ]}>
              {technician.status === 'available' ? 'Available' : 'Busy'}
            </Text>
          </View>
        </View>
        <View style={styles.technicianMeta}>
          <Text style={styles.technicianSpecialty}>{technician.specialty}</Text>
          <View style={styles.dotSeparator} />
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={14} color={COLORS.yellow} />
            <Text style={[styles.ratingText, isDark && styles.textDark]}>{technician.rating}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        style={[
          styles.technicianAction,
          technician.status === 'available' ? styles.technicianActionPrimary : styles.technicianActionSecondary
        ]} 
        activeOpacity={0.8}
      >
        <MaterialIcons 
          name={technician.status === 'available' ? 'arrow-forward' : 'calendar-month'} 
          size={20} 
          color={technician.status === 'available' ? COLORS.backgroundWhite : COLORS.textSecondary} 
        />
      </TouchableOpacity>
    </View>
  );
};

// Top Rated Section
const TopRatedSection: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.topRatedSection}>
      <Text style={[styles.sectionTitle, isDark && styles.textDark, { marginBottom: 12 }]}>Top Rated Nearby</Text>
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Header />
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar />
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
    backgroundColor: COLORS.backgroundWhite,
  },
  containerDark: {
    backgroundColor: '#0A0F08',
  },
  textDark: {
    color: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  bottomSpacer: {
    height: 100,
  },

  // Header Styles
  header: {
    backgroundColor: COLORS.backgroundWhite,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  headerDark: {
    backgroundColor: '#0A0F08',
    borderBottomColor: '#1A2318',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: `${COLORS.primary}20`,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.backgroundWhite,
  },
  greetingContainer: {
    gap: 2,
  },
  greetingName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.charcoal,
    lineHeight: 22,
  },
  greetingSubtext: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.backgroundWhite,
  },

  // Search Bar Styles
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    height: 48,
    paddingLeft: 16,
    paddingRight: 4,
  },
  searchBarDark: {
    backgroundColor: '#1A2318',
    borderColor: '#1A2318',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: COLORS.charcoal,
    marginLeft: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Quick Actions Styles
  quickActionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: (width - 56) / 2,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    gap: 12,
  },
  quickActionCardDark: {
    backgroundColor: '#1A2318',
    borderColor: '#1A2318',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.charcoal,
    lineHeight: 20,
  },
  quickActionSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Active Project Styles
  activeProjectSection: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.charcoal,
    letterSpacing: -0.2,
  },
  viewAllLink: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  projectCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.backgroundWhite,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  projectCardDark: {
    backgroundColor: '#1A2318',
    borderColor: '#1A2318',
  },
  projectImageContainer: {
    height: 160,
    position: 'relative',
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  projectImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  projectHeader: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.backgroundWhite,
  },
  phaseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  phaseText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.backgroundWhite,
  },
  projectDetails: {
    padding: 16,
    gap: 16,
  },
  timeline: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineTrack: {
    alignItems: 'center',
    gap: 4,
  },
  timelineDotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
  },
  timelineLine: {
    width: 2,
    height: 32,
    backgroundColor: COLORS.borderLight,
  },
  timelineDotInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
  },
  timelineContent: {
    flex: 1,
    gap: 24,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.charcoal,
  },
  timelineTitleInactive: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.charcoal,
    opacity: 0.5,
  },
  timelineSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.backgroundWhite,
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
    alignItems: 'center',
    gap: 8,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  categoryIconContainerDark: {
    backgroundColor: '#1A2318',
    borderColor: '#1A2318',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryNameActive: {
    color: COLORS.charcoal,
    fontWeight: '700',
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.backgroundWhite,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  technicianCardDark: {
    backgroundColor: '#1A2318',
    borderColor: '#1A2318',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  technicianName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.charcoal,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusAvailable: {
    backgroundColor: `${COLORS.primary}15`,
  },
  statusBusy: {
    backgroundColor: '#F3F4F6',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  statusTextAvailable: {
    color: COLORS.primary,
  },
  statusTextBusy: {
    color: COLORS.textSecondary,
  },
  technicianMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  technicianSpecialty: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  technicianAction: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  technicianActionPrimary: {
    backgroundColor: COLORS.primary,
  },
  technicianActionSecondary: {
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
});

export default HomeScreen;
