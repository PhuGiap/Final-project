import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema";
import { loginUser, registerUser } from "./auth.service";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
  console.log("POST /api/auth/register received");
  console.log("Request body:", req.body);

  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    console.log("Validation failed:", result.error.flatten().fieldErrors);

    return res.status(400).json({
      success: false,
      message: "Dữ liệu đăng ký không hợp lệ.",
      errors: result.error.flatten().fieldErrors,
    });
  }

  console.log("Validation passed");

  try {
    const user = await loginUser(result.data);

const token = jwt.sign(
  {
    userId: user.id,
    email: user.email,
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
);

console.log("Login successful:", user);

return res.status(200).json({
  success: true,
  message: "Đăng nhập thành công.",
  data: {
    user,
    token,
  },
});
  } catch (error) {
    console.error("Register error:", error);

    if (error instanceof Error) {
      if (error.message === "EMAIL_ALREADY_EXISTS") {
        return res.status(409).json({
          success: false,
          message: "Email đã được sử dụng.",
        });
      }

      if (error.message === "PHONE_ALREADY_EXISTS") {
        return res.status(409).json({
          success: false,
          message: "Số điện thoại đã được sử dụng.",
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi đăng ký tài khoản.",
    });
  }
}
export async function login(req: Request, res: Response) {
  console.log("POST /api/auth/login received");
  console.log("Login request body:", req.body);

  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    console.log(
      "Login validation failed:",
      result.error.flatten().fieldErrors,
    );

    return res.status(400).json({
      success: false,
      message: "Dữ liệu đăng nhập không hợp lệ.",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const user = await loginUser(result.data);

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    console.log("Login successful:", user);

    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công.",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi đăng nhập.",
    });
  }
}