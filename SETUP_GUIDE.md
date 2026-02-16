# React Native Starter Template - Setup Guide

## 🚀 Quick Start

### 1. Navigate to Project
```bash
cd RNStarterTemplate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your configuration
```

### 4. Start Development Server
```bash
npx expo start
```

### 5. Run on Device
- Press **i** for iOS Simulator
- Press **a** for Android Emulator
- Scan QR code with Expo Go app

---

## 📁 Project Structure

```
RNStarterTemplate/
├── src/
│   ├── navigation/          # Navigation configuration
│   │   ├── AppNavigator.tsx # Main navigator (Stack + Tabs)
│   │   └── index.ts         # Navigation exports
│   │
│   ├── screens/             # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── DetailsScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── index.ts
│   │
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx       # Customizable button
│   │   ├── Card.tsx         # Card container
│   │   └── index.ts
│   │
│   ├── services/            # API services
│   │   ├── api.ts          # Axios instance with interceptors
│   │   ├── apiService.ts   # API endpoints
│   │   └── index.ts
│   │
│   ├── hooks/              # Custom React hooks
│   │   └── useDebounce.ts
│   │
│   ├── store/              # Zustand state management
│   │   ├── themeStore.ts   # Theme (light/dark) state
│   │   ├── appStore.ts     # App/user state
│   │   └── index.ts
│   │
│   ├── utils/              # Utilities
│   │   ├── theme.ts        # Theme definitions
│   │   ├── helpers.ts      # Helper functions
│   │   └── index.ts
│   │
│   ├── assets/             # Static assets
│   │   ├── images/
│   │   └── icons/
│   │
│   └── types/              # TypeScript types
│       └── env.d.ts        # Environment types
│
├── App.tsx                 # App entry point
├── .env                    # Environment variables
├── .env.example            # Environment template
├── babel.config.js         # Babel configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Documentation
```

---

## 🧩 Key Features

### Navigation
- **Stack Navigator**: Root navigation with screen transitions
- **Bottom Tab Navigator**: Home, Profile, Settings tabs
- **Type-safe**: Full TypeScript support for navigation params

### Theming
- **Light/Dark Mode**: Toggle in Settings screen
- **Persistent**: Theme preference saved to AsyncStorage
- **Comprehensive**: Colors, spacing, typography, border radius

### State Management (Zustand)
```typescript
// Theme Store
const { theme, isDarkMode, toggleTheme } = useThemeStore();

// App Store
const { user, login, logout } = useAppStore();
```

### API Service (Axios)
```typescript
import { apiService } from './src/services';

// Fetch data
const posts = await apiService.getPosts();

// Create data
const newPost = await apiService.createPost({ title, body, userId });
```

### Reusable Components

#### Button
```typescript
import { Button } from './src/components';

<Button
  title="Click Me"
  onPress={() => console.log('Pressed')}
  variant="primary" // primary | secondary | outline | ghost
  size="medium"     // small | medium | large
  loading={false}
  disabled={false}
/>
```

#### Card
```typescript
import { Card } from './src/components';

<Card
  title="Card Title"
  subtitle="Card Subtitle"
>
  {/* Card content */}
</Card>
```

---

## 🎨 Customization Guide

### Adding a New Screen

1. **Create screen component** (`src/screens/NewScreen.tsx`):
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '../store/themeStore';

const NewScreen: React.FC = () => {
  const { theme } = useThemeStore();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text }}>New Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default NewScreen;
```

2. **Add to navigation** (`src/navigation/AppNavigator.tsx`):
```typescript
import NewScreen from '../screens/NewScreen';

// Add to MainTabParamList
type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  New: undefined;  // Add this
};

// Add to Tab.Navigator
<Tab.Screen
  name="New"
  component={NewScreen}
  options={{
    title: 'New',
    tabBarIcon: ({ focused, color }) => (
      <TabIcon name="✨" focused={focused} color={color} />
    ),
  }}
/>
```

3. **Export from index** (`src/screens/index.ts`):
```typescript
export { default as NewScreen } from './NewScreen';
```

### Adding a New Component

1. **Create component** (`src/components/NewComponent.tsx`):
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NewComponentProps {
  title: string;
}

const NewComponent: React.FC<NewComponentProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default NewComponent;
```

2. **Export from index** (`src/components/index.ts`):
```typescript
export { default as NewComponent } from './NewComponent';
```

### Customizing Theme

Edit `src/utils/theme.ts`:

```typescript
export const lightTheme: Theme = {
  colors: {
    primary: '#YOUR_COLOR',     // Change primary color
    background: '#YOUR_COLOR',  // Change background
    // ... other colors
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  // ... typography, borderRadius
};
```

### Adding API Endpoints

Edit `src/services/apiService.ts`:

```typescript
export interface YourModel {
  id: string;
  name: string;
}

export const apiService = {
  // ... existing methods
  
  getYourData: async (): Promise<YourModel[]> => {
    const response = await apiClient.get('/your-endpoint');
    return response.data;
  },
  
  createYourData: async (data: YourModel): Promise<YourModel> => {
    const response = await apiClient.post('/your-endpoint', data);
    return response.data;
  },
};
```

---

## 📦 Dependencies

### Core
- `expo` - Expo SDK
- `react` / `react-native` - React Native
- `typescript` - TypeScript

### Navigation
- `@react-navigation/native` - Navigation core
- `@react-navigation/native-stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Bottom tabs
- `react-native-screens` - Screen optimization
- `react-native-safe-area-context` - Safe area handling

### State Management
- `zustand` - Lightweight state management
- `@react-native-async-storage/async-storage` - Local storage

### Networking
- `axios` - HTTP client

### Environment
- `react-native-dotenv` - Environment variables

---

## 🛠️ Development Commands

```bash
# Start development server
npx expo start

# Run on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Clear cache
npx expo start -c

# Type check
npx tsc --noEmit

# Build for production (EAS)
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

---

## 🔧 Environment Variables

Create `.env` file:

```bash
# API Configuration
API_BASE_URL=https://your-api.com

# App Configuration
APP_NAME=YourAppName
APP_VERSION=1.0.0

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CRASHLYTICS=true

# Development
DEBUG_MODE=true
```

Access in code:
```typescript
import { API_BASE_URL } from '@env';

console.log(API_BASE_URL); // https://your-api.com
```

---

## 🧪 Testing

### Add Testing Libraries
```bash
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
```

### Create Test File
```typescript
// __tests__/Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../src/components/Button';

test('Button renders correctly', () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <Button title="Test" onPress={onPress} />
  );
  
  fireEvent.press(getByText('Test'));
  expect(onPress).toHaveBeenCalled();
});
```

### Run Tests
```bash
npm test
```

---

## 📱 Building for Production

### Using Expo Build (Legacy)
```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

### Using EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both
eas build --platform all
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` files**
   ```bash
   # Already in .gitignore
   .env
   ```

2. **Validate API responses**
   ```typescript
   import { z } from 'zod';
   
   const UserSchema = z.object({
     id: z.string(),
     name: z.string(),
     email: z.string().email(),
   });
   
   const validateUser = (data: unknown) => UserSchema.parse(data);
   ```

3. **Secure storage for sensitive data**
   ```bash
   npm install expo-secure-store
   ```

4. **Certificate pinning** (for production)
   - Use `react-native-ssl-pinning` or similar

---

## 🐛 Troubleshooting

### Metro bundler issues
```bash
# Clear cache
npx expo start -c

# Reset metro cache
rm -rf node_modules
npm install
npx expo start -c
```

### TypeScript errors
```bash
# Check types
npx tsc --noEmit

# Fix auto-fixable issues
npx tsc --noEmit --fix
```

### iOS build issues
```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..

# Reinstall pods
cd ios && pod install && cd ..
```

### Android build issues
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Reset gradle
rm -rf android/.gradle android/app/build
```

---

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Open Pull Request

---

## 📝 License

MIT License - feel free to use this template for any project!

---

## 💡 Next Steps

After setup, consider:

1. **Add authentication** - Implement login/logout flow
2. **Add more screens** - Build out your app features
3. **Add tests** - Ensure code quality
4. **Configure CI/CD** - Automate builds and deployments
5. **Add analytics** - Track user behavior
6. **Add error tracking** - Use Sentry or similar
7. **Optimize performance** - Profile and optimize

Happy coding! 🚀
