export interface AuthState {
  isLoading: boolean;
  isSignOut: boolean;
  userToken: string | null;
}