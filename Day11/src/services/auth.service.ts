import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { UserRepository } from "../repositories/user.repository";
import { RefreshTokenRepository } from "../repositories/refreshToken.repository";
import { RegisterInput, LoginInput } from "../validators/auth.schema";
import { ConflictError, UnauthorizedError } from "../errors/custom-errors";
import { UserTokenPayload } from "../types/auth.types";

export class AuthService {
  private userRepo = new UserRepository();
  private tokenRepo = new RefreshTokenRepository();

  async register(input: RegisterInput) {
    const existing = await this.userRepo.findByEmail(input.email);
    if (existing) {
      throw new ConflictError("Email already registered", "EMAIL_EXISTS");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.userRepo.create({
      ...input,
      passwordHash,
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    };
  }

  async login(input: LoginInput) {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password", "INVALID_CREDENTIALS");
    }

    const validPassword = await bcrypt.compare(input.password, user.password_hash);
    if (!validPassword) {
      throw new UnauthorizedError("Invalid email or password", "INVALID_CREDENTIALS");
    }

    const payload: UserTokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, config.jwtAccessSecret, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { userId: user.id },
      config.jwtRefreshSecret,
      { expiresIn: "7d" }
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.tokenRepo.create(user.id, refreshToken, expiresAt);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,  // controller will set this as cookie
    };
  }

  async refresh(token: string) {
    let decoded: any;
    try {
      decoded = jwt.verify(token, config.jwtRefreshSecret);
    } catch (err) {
      throw new UnauthorizedError("Invalid or expired refresh token", "INVALID_REFRESH_TOKEN");
    }

    const dbToken = await this.tokenRepo.findByToken(token);
    
    // If token not in DB or is already revoked
    if (!dbToken) {
      throw new UnauthorizedError("Invalid refresh token", "INVALID_REFRESH_TOKEN");
    }

    if (dbToken.revoked) {
      // Reuse detected! Invalidate all tokens for this user.
      await this.tokenRepo.revokeAllForUser(dbToken.user_id);
      throw new UnauthorizedError(
        "Token reuse detected. All sessions invalidated.",
        "TOKEN_REUSE_DETECTED"
      );
    }

    // Check expiration date
    if (new Date() > new Date(dbToken.expires_at)) {
      throw new UnauthorizedError("Expired refresh token", "EXPIRED_REFRESH_TOKEN");
    }

    // Revoke the old token
    await this.tokenRepo.revoke(dbToken.id);

    // Fetch user details for the new payload
    const user = await this.userRepo.findById(dbToken.user_id);
    if (!user) {
      throw new UnauthorizedError("User no longer exists", "USER_NOT_FOUND");
    }

    // Generate new pair
    const payload: UserTokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const newAccessToken = jwt.sign(payload, config.jwtAccessSecret, {
      expiresIn: "15m",
    });

    const newRefreshToken = jwt.sign(
      { userId: user.id },
      config.jwtRefreshSecret,
      { expiresIn: "7d" }
    );

    const newExpiresAt = new Date();
    newExpiresAt.setDate(newExpiresAt.getDate() + 7);

    await this.tokenRepo.create(user.id, newRefreshToken, newExpiresAt);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,  // controller will set this as cookie
    };
  }

  async logout(token: string) {
    const dbToken = await this.tokenRepo.findByToken(token);
    if (dbToken) {
      await this.tokenRepo.revoke(dbToken.id);
    }
  }

  async logoutAll(userId: string) {
    await this.tokenRepo.revokeAllForUser(userId);
  }
}
