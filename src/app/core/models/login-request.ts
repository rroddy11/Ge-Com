export interface LoginRequest {
  email: string;
  password: string;
  twoFactorAuth?: boolean; // ← Rend-le optionnel
}
