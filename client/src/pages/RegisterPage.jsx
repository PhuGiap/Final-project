import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  BusFront,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";

// Register validation schema
const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập họ và tên.")
      .min(2, "Họ và tên phải có ít nhất 2 ký tự."),

    email: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập email.")
      .email("Email không hợp lệ."),

    phone: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập số điện thoại.")
      .regex(
        /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,
        "Số điện thoại không hợp lệ.",
      ),

    password: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu.")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
      .regex(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa.")
      .regex(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường.")
      .regex(/[0-9]/, "Mật khẩu phải có ít nhất 1 chữ số."),

    confirmPassword: z
      .string()
      .min(1, "Vui lòng xác nhận mật khẩu."),

    agreeTerms: z
      .boolean()
      .refine((value) => value === true, {
        message: "Bạn cần đồng ý với điều khoản sử dụng.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp.",
    path: ["confirmPassword"],
  });

function RegisterPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data) => {
  setIsSubmitting(true);
  setSuccessMessage("");

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Register failed:", result);
      setIsSubmitting(false);
      return;
    }

    console.log("Register success:", result);

    setSuccessMessage("Đăng ký tài khoản thành công!");

    setTimeout(() => {
      navigate("/");
    }, 1800);
  } catch (error) {
    console.error("Register request error:", error);
    setIsSubmitting(false);
  }
};
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-blue-600"
          >
            <BusFront size={28} strokeWidth={2.2} />
            <span>BusGo</span>
          </Link>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Về trang chủ
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10">
              {successMessage && (
  <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
    <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-white px-5 py-4 shadow-lg">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
        <Check size={18} />
      </div>

      <div>
        <p className="font-semibold text-slate-800">
          Đăng ký thành công
        </p>
        <p className="text-sm text-slate-500">
          Bạn sẽ được chuyển về trang chủ...
        </p>
      </div>
    </div>
  </div>
)}
        <div className="w-full max-w-md">
          {/* Register Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
            {/* Title */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <BusFront size={30} strokeWidth={2} />
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Tạo tài khoản
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Bắt đầu hành trình cùng BusGo
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Họ và tên
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Nhập họ và tên"
                    {...register("fullName")}
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.fullName
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.fullName && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="Nhập email của bạn"
                    {...register("email")}
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Số điện thoại
                </label>

                <div className="relative">
                  <Phone
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    {...register("phone")}
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.phone
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {errors.phone && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Mật khẩu
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    {...register("password")}
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.password
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    aria-label={
                      showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Xác nhận mật khẩu
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    {...register("confirmPassword")}
                    className={`w-full rounded-xl border bg-white py-3 pl-10 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.confirmPassword
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    aria-label={
                      showConfirmPassword
                        ? "Ẩn mật khẩu xác nhận"
                        : "Hiện mật khẩu xác nhận"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div>
                <label className="flex cursor-pointer items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    {...register("agreeTerms")}
                    className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span className="text-sm leading-5 text-slate-500">
                    Tôi đồng ý với{" "}
                    <button
                      type="button"
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      điều khoản sử dụng
                    </button>{" "}
                    của BusGo.
                  </span>
                </label>

                {errors.agreeTerms && (
                  <p className="mt-1.5 text-sm text-red-500">
                    {errors.agreeTerms.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
              </button>
            </form>

            {/* Login */}
            <div className="mt-6 text-center text-sm text-slate-500">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Đăng nhập
              </Link>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs leading-5 text-slate-400">
            Thông tin của bạn được sử dụng để quản lý tài khoản và hỗ trợ
            quá trình đặt vé trên BusGo.
          </p>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;