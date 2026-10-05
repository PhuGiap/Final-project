import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BusFront,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../app/AuthContext.jsx";
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Vui lòng nhập email.")
    .email("Email không hợp lệ."),

  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu.")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
});


function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
const { login } = useAuth();
const handleLogin = async (data) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();
    console.log(
  "FULL LOGIN RESPONSE:",
  JSON.stringify(result, null, 2)
);
    if (!response.ok) {
      console.error("Login failed:", result);
      return;
    }

console.log("Login success:", result);
console.log("Login data:", result.data);
console.log("User:", result.data?.user);
console.log("Token:", result.data?.token);

if (!result.data?.user || !result.data?.token) {
  console.error("Login response is missing user or token.");
  return;
}

login(result.data.user, result.data.token);

console.log("Auth data saved");

navigate("/");
  } catch (error) {
    console.error("Login request error:", error);
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
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
            {/* Title */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <BusFront size={30} strokeWidth={2} />
              </div>

              <h1 className="text-2xl font-bold text-slate-900">
                Chào mừng trở lại!
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Đăng nhập để tiếp tục đặt vé cùng BusGo
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Mật khẩu
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                  >
                    Quên mật khẩu?
                  </button>
                </div>

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

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
              >
                Đăng nhập
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">hoặc</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Register */}
            <div className="text-center text-sm text-slate-500">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs leading-5 text-slate-400">
            Bằng việc đăng nhập, bạn đồng ý với các điều khoản sử dụng
            của BusGo.
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;