# RNStarterTemplate

A modern, scalable, production-ready React Native starter template built with Expo and TypeScript.

## ✨ Features

- **TypeScript** - Full type safety and IntelliSense support
- **Expo** - Fast development and easy deployment
- **React Navigation** - Stack and Bottom Tab navigation setup
- **Zustand** - Lightweight state management with persistence
- **Theme System** - Light/Dark mode support
- **Axios** - API service with interceptors
- **Clean Architecture** - Well-organized folder structure
- **Reusable Components** - Button and Card components ready to use
- **Environment Config** - .env support for different environments

## 📁 Project Structure

```
src/
├── navigation/         # Navigation configuration
├── screens/            # Screen components
├── components/         # Reusable UI components
├── services/           # API services
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── utils/              # Utility functions and theme
└── assets/             # Images, icons, fonts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS only) or Android Emulator

### Installation

1. **Clone or download this template**
   ```bash
   cd RNStarterTemplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API endpoints and configuration
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on your device**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on physical device

## 🏗️ Architecture

### Navigation

The app uses a combination of Stack and Bottom Tab navigators:
- **MainTabs**: Home, Profile, Settings (Bottom Tabs)
- **RootStack**: MainTabs + Details screen

### State Management

Uses Zustand for global state management:
- `useThemeStore`: Theme state with persistence
- `useAppStore`: User authentication and app state

### Theming

Comprehensive theme system with:
- Light and Dark mode support
- Consistent colors, spacing, and typography
- Easy theme switching with persistence

### API Service

Axios-based API service with:
- Request/response interceptors
- Error handling
- Token refresh logic (ready to implement)

## 🎨 Customization

### Adding New Screens

1. Create screen component in `src/screens/`
2. Add to navigation in `src/navigation/AppNavigator.tsx`
3. Update type definitions in navigation params

### Adding New Components

1. Create component in `src/components/`
2. Export from `src/components/index.ts`
3. Import and use in screens

### Modifying Theme

Edit `src/utils/theme.ts` to customize:
- Colors
- Spacing
- Border radius
- Typography

## 📦 Dependencies

```json
{
  "@react-navigation/native": "Navigation library",
  "@react-navigation/native-stack": "Stack navigator",
  "@react-navigation/bottom-tabs": "Bottom tab navigator",
  "zustand": "State management",
  "axios": "HTTP client",
  "@react-native-async-storage/async-storage": "Local storage",
  "react-native-screens": "Screen optimization",
  "react-native-safe-area-context": "Safe area handling"
}
```

## 🔧 Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
```

## 📝 Environment Variables

Create a `.env` file with:

```
API_BASE_URL=https://your-api.com
APP_NAME=YourAppName
APP_VERSION=1.0.0
ENABLE_ANALYTICS=true
DEBUG_MODE=false
```

## 🧪 Testing

Add your test files in `__tests__/` directory and run:

```bash
npm test
```

## 📱 Building for Production

### Expo Build

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android
```

### EAS Build (Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure build
eas build:configure

# Build for production
eas build --platform ios
eas build --platform android
```

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email support@example.com or open an issue in the repository.

---

Happy coding! 🚀
