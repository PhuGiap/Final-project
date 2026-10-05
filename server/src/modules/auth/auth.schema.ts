import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Họ và tên phải có ít nhất 2 ký tự."),

  email: z
    .string()
    .trim()
    .email("Email không hợp lệ."),

  phone: z
    .string()
    .trim()
    .regex(
      /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,
      "Số điện thoại không hợp lệ.",
    ),

  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
    .regex(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa.")
    .regex(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường.")
    .regex(/[0-9]/, "Mật khẩu phải có ít nhất 1 chữ số."),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Email không hợp lệ."),

  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu."),
});

export type LoginInput = z.infer<typeof loginSchema>;