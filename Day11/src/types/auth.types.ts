export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: "admin" | "user";
  created_at: Date;
  updated_at: Date;
}

export interface UserTokenPayload {
  userId: string;
  email: string;
  role: "admin" | "user";
}

export interface RefreshToken {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  revoked: boolean;
  created_at: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserTokenPayload;
    }
  }
}
