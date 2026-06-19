# Product Requirements Document (PRD) — Herfa

> **Project:** Herfa ("Smart Construction Solutions")
> **Version:** 1.0.0
> **Platform:** iOS & Android (React Native / Expo SDK 54)
> **Status:** Draft

---

## 1. Executive Summary

Herfa is a bilingual (English/Arabic) mobile marketplace that connects customers with verified local service providers (plumbers, electricians, carpenters, painters, HVAC technicians, etc.). The app streamlines the entire service lifecycle — discovery, booking, tracking, payment, and post-service support — in one seamless experience.

---

## 2. Product Vision

To become the go-to platform in the MENA region for reliable, on-demand home services by building trust through verified providers, transparent pricing, real-time job tracking, and a delightful user experience in both English and Arabic.

---

## 3. Target Users

| Persona | Description | Needs |
|---------|-------------|-------|
| **Customer** | Homeowners, tenants, office managers needing repair/installation/maintenance services. 25–55 yrs, urban, tech-savvy. | Quick booking, reliable providers, transparent pricing, job tracking, multiple payment methods. |
| **Service Provider** | Independent technicians or small companies offering home services. | Lead generation, schedule management, client communication, payment collection. |
| **Admin** | Platform operator managing listings, disputes, and analytics. | Provider verification, commission tracking, user support, content management. |

---

## 4. User Stories & Features

### 4.1 Authentication & Onboarding

| ID | Story | Priority | Status |
|----|-------|----------|--------|
| US-01 | As a new user, I want to view an onboarding carousel so I understand the app's value. | P1 | ✅ Implemented |
| US-02 | As a user, I want to register with name, email, and password so I can create an account. | P1 | ✅ Implemented |
| US-03 | As a returning user, I want to log in with email and password so I can access my account. | P1 | ✅ Implemented |
| US-04 | As a user, I want the app to remember my login so I don't have to re-authenticate. | P1 | ✅ Implemented (persisted auth) |
| US-05 | As a user, I want "Forgot Password" functionality so I can recover my account. | P2 | 🔧 Placeholder |
| US-06 | As a user, I want social login (Google, Apple) for faster sign-up. | P2 | 🔧 Placeholder |

### 4.2 Home & Discovery

| ID | Story | Priority | Status |
|----|-------|----------|--------|
| US-07 | As a user, I want a personalized home screen with a time-based greeting. | P1 | ✅ Implemented |
| US-08 | As a user, I want quick action cards (Book Service, Urgent Repair, My Projects, Support). | P1 | ✅ Implemented |
| US-09 | As a user, I want to browse service categories (Plumbing, Electric, Carpentry, AC, Painting). | P1 | ✅ Implemented |
| US-10 | As a user, I want to see top-rated nearby providers with availability and ratings. | P1 | ✅ Implemented |
| US-11 | As a user, I want to search services with a search bar and filter options. | P1 | ✅ Implemented (UI) |
| US-12 | As a user, I want notifications on my home screen bell icon with unread badge count. | P1 | ✅ Implemented (UI + API) |

### 4.3 Booking Flow

| ID | Story | Priority | Status |
|----|-------|----------|--------|
| US-13 | As a user, I want to select a service category and describe my issue. | P1 | ✅ Implemented |
| US-14 | As a user, I want to pick my location on an interactive map. | P1 | ✅ Implemented |
| US-15 | As a user, I want to select a preferred date and time for the service. | P1 | ✅ Implemented |
| US-16 | As a user, I want to add notes and photos to my service request. | P1 | ✅ Implemented (notes) / 🔧 Photo upload UI stub |
| US-17 | As a user, I want to review my booking details before confirming (summary step). | P1 | ✅ Implemented |
| US-18 | As a user, I want to receive a booking confirmation with a booking ID after submission. | P1 | ✅ Implemented |
| US-19 | As a user, I want to see an estimated cost before confirming. | P1 | ✅ Implemented |

### 4.4 Booking Management & Tracking

| ID | Story | Priority | Status |
|----|-------|----------|--------|
| US-20 | As a user, I want to view all my bookings in a list with status filters. | P1 | ✅ Implemented |
| US-21 | As a user, I want to see a detailed timeline of my booking status (Pending → Assigned → Accepted → In Progress → Completed). | P1 | ✅ Implemented |
| US-22 | As a user, I want to view provider details (name, avatar, rating) and call/message them from the booking status screen. | P1 | ✅ Implemented |
| US-23 | As a user, I want to cancel a booking if needed. | P2 | ✅ Implemented (API endpoint) |

### 4.5 Payment

| ID | Story | Priority | Status |
|----|-------|----------|--------|
| US-24 | As a user, I want to pay via Credit Card, Cash, or Digital Wallet. | P1 | ✅ Implemented |
| US-25 | As a user, I want to see a payment confirmation with receipt details. | P1 | ✅ Implemented |
| US-26 | As a user, I want to see "What's Next?" guidance after payment. | P1 | ✅ Implemented |

### 4.6 Messaging & Communication

| ID | Story | Priority | Status |
|----|-------|----------|--------|
| US-27 | As a user, I want to see a list of my conversations with providers. | P1 | ✅ Implemented |
| US-28 | As a user, I want to send and receive messages with providers. | P1 | 🔧 Individual chat is a stub |
| US-29 | As a user, I want to see unread message badges. | P2 | ✅ Implemented |

### 4.7 Profile & Settings

| ID | Story | Priority | Status |
|----|-------|----------|--------|
| US-30 | As a user, I want to view and edit my profile (name, email, avatar). | P1 | ✅ Implemented (view) |
| US-31 | As a user, I want to switch between English and Arabic. | P1 | ✅ Implemented (full RTL support) |
| US-32 | As a user, I want to toggle between Light, Dark, and System theme modes. | P1 | ✅ Implemented |
| US-33 | As a user, I want to log out securely. | P1 | ✅ Implemented |
| US-34 | As a user, I want to manage notifications, payment methods, and preferences. | P2 | 🔧 Placeholder menu items |

### 4.8 Provider Features (Future)

| ID | Story | Priority | Status |
|----|-------|----------|--------|
| US-35 | As a provider, I want to apply to become a verified provider on the platform. | P2 | 🔧 API endpoint ready |
| US-36 | As a provider, I want to manage my availability and service areas. | P2 | 🔧 API endpoint ready |
| US-37 | As a provider, I want to accept/reject job assignments. | P2 | 🔧 API endpoint ready |

---

## 5. Functional Requirements

### 5.1 Authentication
- **FR-01:** Token-based JWT authentication with access + refresh token rotation.
- **FR-02:** Axios interceptor must auto-refresh on 401 responses with concurrent request queuing.
- **FR-03:** Auth state persisted via AsyncStorage (Zustand `persist` middleware).

### 5.2 Internationalization (i18n)
- **FR-04:** Must support English (LTR) and Arabic (RTL) with seamless switching.
- **FR-05:** All user-facing strings must use i18next translation keys (281 keys per language).
- **FR-06:** Layout direction must mirror via `I18nManager.forceRTL()` when Arabic is active.

### 5.3 Theming
- **FR-07:** Three modes: Light, Dark, System (follows device appearance).
- **FR-08:** Theme must persist to AsyncStorage.
- **FR-09:** Components must use the `ThemeContext` provided theme object for all colors, spacing, and typography.

### 5.4 API Integration
- **FR-10:** All API calls must go through the `ApiService` class managing token lifecycle.
- **FR-11:** Endpoints: `/auth/*`, `/users/*`, `/services/*`, `/providers/*`, `/jobs/*`, `/notifications/*`, `/messages/*`.

### 5.5 Booking Lifecycle
- **FR-12:** Job statuses: `PENDING → ASSIGNED → ACCEPTED → IN_PROGRESS → COMPLETED | CANCELLED | REJECTED`.
- **FR-13:** Visual timeline must reflect current and past statuses accurately.

### 5.6 Payment (MVP)
- **FR-14:** Support Credit Card (form), Cash on delivery, and Digital Wallet selection.
- **FR-15:** Payment processing is simulated (2s delay) in MVP; real gateway integration is post-MVP.

---

## 6. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| **Performance** | App cold start < 3s on mid-range devices. Screen transitions at 60fps. |
| **Offline Resilience** | Graceful degradation when offline; cached categories and theme. |
| **Accessibility** | Support screen reader labels on all interactive elements. Minimum touch target 44pt. |
| **RTL Support** | 100% of screens must handle RTL layout correctly. |
| **Security** | Tokens stored in AsyncStorage (encrypted recommended in production). No plaintext secrets in code. |
| **Localization** | All user-facing strings externalized to translation files. No hardcoded strings. |
| **Maintainability** | TypeScript strict mode. Zustand for state. Axios service layer. Clean folder structure. |

---

## 7. Technical Architecture

### 7.1 Tech Stack
- **Framework:** React Native 0.81.5 via Expo SDK 54
- **Language:** TypeScript 5.9
- **Navigation:** React Navigation 7 (NativeStack + BottomTabs)
- **State:** Zustand 5 with AsyncStorage persistence
- **Networking:** Axios with interceptor-based token management
- **i18n:** i18next + react-i18next
- **Styling:** StyleSheet (no third-party UI library)

### 7.2 Project Structure
```
src/
├── components/        # Reusable UI (BookingCard, StatusBadge, StepIndicator, PaymentMethodSelector)
├── contexts/          # ThemeContext, LanguageContext
├── hooks/             # useJobs, useProviders, useServices
├── i18n/              # i18next config + translations (en.json, ar.json)
├── navigation/        # AppNavigator, AuthNavigator, MainNavigator, BottomTabNavigator
├── screens/           # 16 screens (Splash through Profile)
├── services/          # API service class + per-domain API modules
├── store/             # Zustand stores (authStore, themeStore)
├── types/             # TypeScript interfaces, navigation params, env.d.ts
└── utils/             # Theme definition, helpers
```

---

## 8. Navigation Map

```
AppNavigator
├── [not authenticated] → AuthNavigator (Stack)
│   ├── Splash
│   ├── Onboarding
│   ├── Registration
│   └── Login
└── [authenticated] → MainNavigator (Stack)
    ├── Main (BottomTabs)
    │   ├── Home
    │   ├── Bookings
    │   ├── Chat
    │   └── Profile
    ├── BookingRequest
    ├── BookingSummary
    ├── BookingConfirmation
    ├── BookingStatus
    ├── Payment
    ├── PaymentSuccess
    └── LocationSelection (modal)
```

---

## 9. Milestones & Roadmap

| Phase | Scope | Target |
|-------|-------|--------|
| **MVP** ⬅️ *Current* | Customer app: auth, onboarding, booking flow, payment simulation, booking tracking, profile, i18n (EN/AR), theming (L/D/S). | ✅ Complete |
| **Phase 2** | Provider app/portal: job management, availability, accept/reject, earnings. Real payment gateway (Stripe/Tabby). Push notifications. Real-time chat. | 🔜 |
| **Phase 3** | Admin dashboard: user management, provider verification, commission reports, dispute resolution. Reviews & ratings. Promotions & coupons. | 🔜 |
| **Phase 4** | In-app calling. Multi-service bundles. Subscription plans. Analytics & personalization engine. | 🔜 |

---

## 10. Success Metrics (KPIs)

| Metric | Target (Post-Launch) |
|--------|----------------------|
| Booking Completion Rate | > 70% (bookings started → completed) |
| Provider Response Time | < 15 min |
| User Retention (D7/D30) | > 40% / > 20% |
| App Store Rating | > 4.5 |
| Crash-Free Rate | > 99.5% |
| Translation Coverage | 100% (EN + AR) |

---

## 11. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low provider supply in launch cities | High | Start with B2B partnerships; onboard providers before marketing to customers. |
| Payment gateway integration delays | Medium | Cash-on-delivery as fallback; modular payment abstraction. |
| RTL layout bugs | Medium | Full RTL test matrix; automated snapshot tests per screen. |
| Token expiry race conditions | Medium | Axios interceptor with concurrent request queuing already implemented. |
| App size bloat with Expo | Low | Use EAS Build with native modules only as needed; tree-shake unused assets. |

---

## 12. Appendices

### 12.1 Environment Variables
| Variable | Purpose |
|----------|---------|
| `API_BASE_URL` | Backend API endpoint |
| `APP_NAME` | Display name |
| `APP_VERSION` | Version tracking |
| `ENABLE_ANALYTICS` | Feature flag |
| `ENABLE_CRASHLYTICS` | Crash reporting flag |
| `DEBUG_MODE` | Dev logging toggle |

### 12.2 Current Implementation Status
- **Total screens:** 16 (all implemented at MVP level)
- **API modules:** 7 (auth, users, services, providers, jobs, notifications, messages)
- **Reusable components:** 4 (BookingCard, StatusBadge, StepIndicator, PaymentMethodSelector)
- **Translation keys:** 281 per language (EN + AR)
- **Payment:** Simulated (real gateway: Phase 2)
- **Chat:** Conversation list only (individual chat: Phase 2)
- **Photo upload:** UI stub (full implementation: Phase 2)
