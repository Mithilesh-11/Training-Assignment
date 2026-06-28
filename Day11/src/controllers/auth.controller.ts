import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { registerSchema, loginSchema } from "../validators/auth.schema";
import { ValidationError, UnauthorizedError } from "../errors/custom-errors";

const service = new AuthService();

// Cookie config — shared across routes
const COOKIE_NAME = "refreshToken";
const COOKIE_OPTIONS = {
  httpOnly: true,        // Not accessible via JS (XSS protection)
  secure: process.env.NODE_ENV === "production", // HTTPS only in prod
  sameSite: "strict" as const, // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError(
        validation.error.issues.map((e) => e.message).join(", ")
      );
    }

    const result = await service.register(validation.data);

    res.status(201).json({
      success: true,
      data: result,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      throw new ValidationError(
        validation.error.issues.map((e) => e.message).join(", ")
      );
    }

    const result = await service.login(validation.data);

    // Set refresh token in HTTP-only cookie
    res.cookie(COOKIE_NAME, result.refreshToken, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      data: {
        user: result.user,
        accessToken: result.accessToken,
        // refreshToken is NOT sent in body — it's in the cookie
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Read refresh token from cookie instead of body
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) {
      throw new UnauthorizedError("Refresh token cookie is missing", "TOKEN_MISSING");
    }

    const result = await service.refresh(token);

    // Rotate: set the new refresh token in the cookie
    res.cookie(COOKIE_NAME, result.refreshToken, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      data: {
        accessToken: result.accessToken,
        // new refreshToken is in the cookie
      },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Read refresh token from cookie
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) {
      throw new UnauthorizedError("Refresh token cookie is missing", "TOKEN_MISSING");
    }

    await service.logout(token);

    // Clear the cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      data: { message: "Logged out successfully" },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw new ValidationError("User identity is required for global logout");
    }

    await service.logoutAll(userId);

    // Clear the cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      data: { message: "Logged out from all devices successfully" },
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
