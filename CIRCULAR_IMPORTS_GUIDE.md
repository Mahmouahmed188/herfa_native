# Circular Import Prevention Guide for React Native

## Summary

The main circular import issue in your project was in [`src/i18n/index.ts`](src/i18n/index.ts). The file was trying to export from itself:

```typescript
// ❌ BAD - Self-referential export causing circular import
export { default as i18n } from './index';
export { default } from './index';
export { changeLanguage, getSavedLanguage, saveLanguage, isRTL, getCurrentLanguage } from './index';
```

This has been fixed with a proper i18next configuration.

---

## Safe Patterns to Prevent Circular Imports

### 1. **Avoid Self-Referential Exports**

Never export from the same file you're in:

```typescript
// ❌ BAD
export { something } from './thisFile';

// ✅ GOOD
// Just define and export directly
export const something = 'value';
```

### 2. **Use Type-Only Imports for Navigation Types**

When screens need navigation types, import them as types only:

```typescript
// ✅ GOOD - TypeScript strips types at compile time
import type { RootStackParamList } from '../navigation/AppNavigator';

// ❌ AVOID - Runtime imports if only needing types
import { RootStackParamList } from '../navigation/AppNavigator';
```

### 3. **Barrel Files (index.ts) Pattern**

Keep barrel files simple - they should only re-export from sibling files:

```typescript
// ✅ GOOD - Re-export from other files in the same directory
export { MyComponent } from './MyComponent';
export { MyHook } from './MyHook';

// ❌ BAD - Don't re-export from self
export { MyComponent } from './index';
```

### 4. **Dependency Flow: One Direction**

Keep imports unidirectional:

```
contexts/ → screens/ → navigation/
   ↓
store/
```

### 5. **Lazy Loading for Screens**

Use lazy loading to break circular dependencies:

```typescript
// ✅ GOOD - Lazy load screens to break circular dependencies
const ProfileScreen = React.lazy(() => import('../screens/ProfileScreen'));
```

### 6. **Extract Shared Utilities**

Move shared code to utility files that don't depend on other modules:

```typescript
// src/utils/theme.ts - No circular dependencies
// src/utils/helpers.ts - No circular dependencies
```

---

## Tools for Detecting Circular Imports

### Madge (Recommended)

```bash
npm install --save-dev madge
```

Run to find circular dependencies:
```bash
npx madge --circular src/**/*.ts
```

### TypeScript Compiler

```bash
npx tsc --noEmit
```

### ESLint Plugin

Add to `.eslintrc.js`:
```javascript
module.exports = {
  plugins: ['import'],
  rules: {
    'import/no-cycle': 'warn',
  },
};
```

---

## Project Structure Recommendation

```
src/
├── components/       # Reusable UI components
│   └── index.ts      # Barrel file
├── contexts/         # React contexts
│   ├── ThemeContext.tsx
│   └── LanguageContext.tsx
├── screens/          # Screen components (leaf nodes)
├── navigation/       # Navigation config
├── store/            # Zustand stores
├── utils/            # Pure utility functions
├── services/         # API services
└── i18n/             # Internationalization
```

---

## Quick Fix Checklist

1. ✅ Fixed `src/i18n/index.ts` - circular self-export
2. ✅ Use `import type` for type-only imports
3. ✅ Keep barrel files simple
4. ✅ One-way dependency flow
5. ✅ Run `npx tsc --noEmit` to verify

---

## Current Project Status

The critical circular import has been fixed. There are some pre-existing TypeScript errors in the codebase (undefined variables like `t` and `COLORS` in some screens) that are not related to circular imports but should be addressed separately.
