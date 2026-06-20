# Build Guide - Herfa Native App

## Prerequisites

- Node.js >= 18
- npm >= 9
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)
- Android Studio (for local builds)
- A physical device or emulator (for testing)

## Installation

```bash
# Install dependencies
npm install

# Install EAS CLI globally (if not already installed)
npm install -g eas-cli
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# API Configuration
API_BASE_URL=https://your-api-url.com

# App Configuration
APP_NAME=Herfa
APP_VERSION=1.0.0

# Feature Flags
ENABLE_ANALYTICS=false
ENABLE_CRASHLYTICS=false

# Development
DEBUG_MODE=false
```

## Development

```bash
# Start Expo development server
npx expo start

# Run on Android emulator/device
npx expo run:android

# Run on iOS simulator
npx expo run:ios
```

## Build Commands

### EAS Build (Recommended for Production)

First, log in to your Expo account:

```bash
eas login
```

Then build:

```bash
# Development build (APK)
eas build --platform android --profile development

# Preview build (APK - for internal testing)
eas build --platform android --profile preview

# Production build (AAB - for Google Play Store)
eas build --platform android --profile production
```

### Local APK Generation

```bash
# Generate APK locally
cd android
./gradlew assembleRelease
```

### Local AAB Generation

```bash
# Generate AAB locally
cd android
./gradlew bundleRelease
```

### Using Expo for APK

```bash
# Export the web bundle
npx expo export --platform android

# Then build with Gradle
cd android
./gradlew assembleRelease
```

## APK Generation Steps

1. **Prepare the build:**
   ```bash
   npx expo prebuild --clean
   ```

2. **Build APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Locate the APK:**
   The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Production Deployment Steps

1. **Update version and build number in `app.json`:**
   ```json
   {
     "expo": {
       "version": "1.0.0",
       "android": {
         "versionCode": 1
       }
     }
   }
   ```

2. **Build production AAB:**
   ```bash
   eas build --platform android --profile production
   ```

3. **Submit to Google Play Console:**
   ```bash
   eas submit --platform android --profile production
   ```

## TypeScript & Linting

```bash
# Type-check
npx tsc --noEmit

# Lint
npx eslint src/
```

## Project Structure

```
herfa_native/
├── android/          # Native Android project
├── assets/           # App icons, splash screen, etc.
├── src/
│   ├── components/   # Reusable UI components
│   ├── contexts/     # React context providers (Theme, Language)
│   ├── data/         # Mock data
│   ├── hooks/        # Custom hooks
│   ├── i18n/         # Internationalization
│   ├── navigation/   # Navigation setup
│   ├── screens/      # Screen components
│   ├── services/     # API services
│   ├── store/        # Zustand stores
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
├── app.json          # Expo configuration
├── eas.json          # EAS Build configuration
├── package.json
└── tsconfig.json
```

## Notes

- This project uses **Expo Prebuild Workflow** (also known as "bare workflow")
- The Android native project is pre-generated and committed
- For any native module changes, run `npx expo prebuild` to regenerate
- EAS Build is the recommended way for production builds
- Ensure `eas.json` is configured with the correct profiles before building
