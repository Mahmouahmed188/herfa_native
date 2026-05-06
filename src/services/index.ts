export { apiService, default } from './api';
export { authApi, default as authApiDefault } from './authApi';
export { usersApi, default as usersApiDefault } from './usersApi';
export { servicesApi, default as servicesApiDefault } from './servicesApi';
export { providersApi, default as providersApiDefault } from './providersApi';
export { jobsApi, default as jobsApiDefault } from './jobsApi';
export { notificationsApi, default as notificationsApiDefault } from './notificationsApi';
export { messagesApi, default as messagesApiDefault } from './messagesApi';

export type {
  RegisterPayload,
  LoginPayload,
  AuthResponse,
  User,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
} from './authApi';

export type {
  UserProfile,
  UpdateUserPayload,
} from './usersApi';

export type {
  ServiceCategory,
  Service,
} from './servicesApi';

export type {
  ProviderProfile,
  ProviderService,
  SearchProvidersParams,
  ProviderSearchResult,
} from './providersApi';

export type {
  Job,
  JobAssignment,
  JobStatus,
  CreateJobPayload,
  UpdateJobPayload,
  JobQueryParams,
  JobsResponse,
} from './jobsApi';

export type {
  Notification,
  NotificationQueryParams,
  NotificationsResponse,
  UnreadCountResponse,
} from './notificationsApi';

export type {
  Message,
  Conversation,
  SendMessagePayload,
  MessagesResponse,
} from './messagesApi';