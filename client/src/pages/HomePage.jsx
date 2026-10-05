import { useState } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  BusFront,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Headphones,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
const popularRoutes = [
  {
    from: "Đà Nẵng",
    to: "Huế",
    price: "150.000đ",
    duration: "Khoảng 2 giờ 30 phút",
  },
  {
    from: "Đà Nẵng",
    to: "Hội An",
    price: "100.000đ",
    duration: "Khoảng 1 giờ 30 phút",
  },
  {
    from: "Hồ Chí Minh",
    to: "Đà Lạt",
    price: "250.000đ",
    duration: "Khoảng 7 giờ",
  },
  {
    from: "Hà Nội",
    to: "Ninh Bình",
    price: "180.000đ",
    duration: "Khoảng 2 giờ",
  },
];

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tripType, setTripType] = useState("oneWay");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [message, setMessage] = useState("");

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!from || !to || !departureDate) {
      setMessage(
        "Vui lòng nhập điểm đi, điểm đến và ngày khởi hành.",
      );
      return;
    }

    if (from === to) {
      setMessage(
        "Điểm đi và điểm đến không được giống nhau.",
      );
      return;
    }

    setMessage(
      `Đang tìm chuyến từ ${from} đến ${to} vào ngày ${departureDate}.`,
    );
  };

  const selectPopularRoute = (route) => {
    setFrom(route.from);
    setTo(route.to);
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <BusFront size={25} strokeWidth={2.4} />
            </div>

            <div>
              <p className="text-xl font-extrabold tracking-tight text-blue-700">
                BusGo
              </p>

              <p className="text-[11px] font-medium text-slate-500">
                Đi mọi nơi, dễ dàng hơn
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#home"
              className="font-semibold text-blue-700 transition hover:text-blue-500"
            >
              Trang chủ
            </a>

            <a
              href="#routes"
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              Tuyến phổ biến
            </a>

            <a
              href="#features"
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              Vì sao chọn BusGo
            </a>

            <a
              href="#support"
              className="font-medium text-slate-600 transition hover:text-blue-600"
            >
              Hỗ trợ
            </a>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
  to="/login"
  className="rounded-xl border border-blue-600 px-5 py-2.5 font-semibold text-blue-600 hover:bg-blue-50"
>
  Đăng nhập
</Link>

            <button className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Đăng ký
            </button>
          </div>

          <button
            type="button"
            aria-label="Mở menu"
            className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
            <nav className="flex flex-col gap-4">
              <a
                href="#home"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </a>

              <a
                href="#routes"
                onClick={() => setIsMenuOpen(false)}
              >
                Tuyến phổ biến
              </a>

              <a
                href="#features"
                onClick={() => setIsMenuOpen(false)}
              >
                Vì sao chọn BusGo
              </a>

              <a
                href="#support"
                onClick={() => setIsMenuOpen(false)}
              >
                Hỗ trợ
              </a>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 rounded-xl border border-slate-200 py-2.5 font-semibold">
                  Đăng nhập
                </button>

                <button className="flex-1 rounded-xl bg-blue-600 py-2.5 font-semibold text-white">
                  Đăng ký
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <main id="home">
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                <Sparkles size={16} />
                Hành trình thuận tiện bắt đầu từ đây
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Đặt vé xe khách
                <span className="block text-blue-600">
                  nhanh chóng và dễ dàng
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Tìm kiếm chuyến xe phù hợp, lựa chọn ghế ngồi
                yêu thích và quản lý hành trình của bạn trên một
                nền tảng đơn giản, dễ sử dụng.
              </p>

              <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="text-blue-600"
                    size={19}
                  />
                  Tìm chuyến dễ dàng
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="text-blue-600"
                    size={19}
                  />
                  Chọn ghế trực tuyến
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="text-blue-600"
                    size={19}
                  />
                  Hỗ trợ 24/7
                </div>
              </div>
            </div>

            {/* Search Card */}
            <div className="rounded-3xl border border-white bg-white p-5 shadow-xl shadow-blue-100/60 sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Tìm chuyến xe
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Chọn thông tin hành trình của bạn
                  </p>
                </div>

                <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:flex">
                  <Search size={23} />
                </div>
              </div>

              <div className="mb-5 flex gap-2 rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setTripType("oneWay")}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    tripType === "oneWay"
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Một chiều
                </button>

                <button
                  type="button"
                  onClick={() => setTripType("roundTrip")}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    tripType === "roundTrip"
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Khứ hồi
                </button>
              </div>

              <form
                onSubmit={handleSearch}
                className="space-y-4"
              >
                <div className="relative grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <MapPin
                        size={16}
                        className="text-blue-600"
                      />
                      Điểm đi
                    </span>

                    <input
                      value={from}
                      onChange={(event) =>
                        setFrom(event.target.value)
                      }
                      placeholder="Bạn đi từ đâu?"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                  <button
                    type="button"
                    aria-label="Đổi điểm đi và điểm đến"
                    onClick={swapLocations}
                    className="absolute right-3 top-9 flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 shadow-sm transition hover:bg-blue-50 sm:static sm:mb-0 sm:h-11 sm:w-11"
                  >
                    <ArrowLeftRight size={18} />
                  </button>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <MapPin
                        size={16}
                        className="text-blue-600"
                      />
                      Điểm đến
                    </span>

                    <input
                      value={to}
                      onChange={(event) =>
                        setTo(event.target.value)
                      }
                      placeholder="Bạn muốn đến đâu?"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <CalendarDays
                        size={16}
                        className="text-blue-600"
                      />
                      Ngày đi
                    </span>

                    <input
                      type="date"
                      value={departureDate}
                      onChange={(event) =>
                        setDepartureDate(event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                  {tripType === "roundTrip" ? (
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <CalendarDays
                          size={16}
                          className="text-blue-600"
                        />
                        Ngày về
                      </span>

                      <input
                        type="date"
                        value={returnDate}
                        onChange={(event) =>
                          setReturnDate(event.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />
                    </label>
                  ) : (
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Users
                          size={16}
                          className="text-blue-600"
                        />
                        Số hành khách
                      </span>

                      <select
                        value={passengers}
                        onChange={(event) =>
                          setPassengers(event.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      >
                        <option value="1">
                          1 hành khách
                        </option>
                        <option value="2">
                          2 hành khách
                        </option>
                        <option value="3">
                          3 hành khách
                        </option>
                        <option value="4">
                          4 hành khách
                        </option>
                        <option value="5">
                          5 hành khách
                        </option>
                      </select>
                    </label>
                  )}
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-blue-300"
                >
                  <Search size={19} />
                  Tìm chuyến xe
                  <ArrowRight size={18} />
                </button>

                {message && (
                  <p
                    role="status"
                    className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700"
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="bg-white py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Trải nghiệm BusGo
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Mọi chuyến đi, nhẹ nhàng hơn
              </h2>

              <p className="mt-4 leading-7 text-slate-500">
                BusGo tập trung vào những thao tác quan trọng nhất
                để bạn đặt vé nhanh và dễ hiểu.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Search size={25} />}
                title="Tìm kiếm thuận tiện"
                description="Nhập điểm đi, điểm đến và ngày khởi hành để tìm chuyến phù hợp."
              />

              <FeatureCard
                icon={<Ticket size={25} />}
                title="Chọn ghế trực tuyến"
                description="Chủ động lựa chọn vị trí ghế hoặc giường theo nhu cầu."
              />

              <FeatureCard
                icon={<ShieldCheck size={25} />}
                title="Thông tin rõ ràng"
                description="Theo dõi giá vé, thời gian, nhà xe và thông tin hành trình."
              />

              <FeatureCard
                icon={<Headphones size={25} />}
                title="Hỗ trợ tận tâm"
                description="Dễ dàng tìm kiếm hướng dẫn và nhận hỗ trợ khi cần."
              />
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section
          id="routes"
          className="bg-slate-50 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                  Khám phá hành trình
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Tuyến xe phổ biến
                </h2>

                <p className="mt-3 text-slate-500">
                  Một số hành trình được nhiều hành khách quan tâm.
                </p>
              </div>

              <button className="flex items-center gap-2 self-start rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 sm:self-auto">
                Xem tất cả
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {popularRoutes.map((route) => (
                <button
                  key={`${route.from}-${route.to}`}
                  type="button"
                  onClick={() => selectPopularRoute(route)}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <BusFront size={24} />
                  </div>

                  <div className="flex items-center gap-2 text-base font-bold text-slate-900">
                    <span>{route.from}</span>
                    <ArrowRight
                      size={16}
                      className="text-blue-500"
                    />
                  </div>

                  <p className="mt-1 text-base font-bold text-slate-900">
                    {route.to}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                    <Clock3 size={15} />
                    {route.duration}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs text-slate-500">
                      Giá từ
                    </span>

                    <span className="font-extrabold text-blue-600">
                      {route.price}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-10 text-white shadow-xl shadow-blue-100 sm:px-12 sm:py-14">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Sẵn sàng cho chuyến đi tiếp theo?
                  </h2>

                  <p className="mt-4 max-w-2xl leading-7 text-blue-50">
                    Tìm kiếm hành trình phù hợp và bắt đầu đặt vé
                    chỉ với vài thao tác đơn giản.
                  </p>
                </div>

                <button
                  onClick={() =>
                    document
                      .getElementById("home")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  Tìm chuyến ngay
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="support"
        className="border-t border-slate-200 bg-white"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <BusFront size={22} />
              </div>

              <span className="text-xl font-extrabold text-blue-700">
                BusGo
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Nền tảng đặt vé xe khách trực tuyến giúp hành khách
              tìm kiếm và quản lý hành trình thuận tiện hơn.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              BusGo
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>Về chúng tôi</p>
              <p>Điều khoản sử dụng</p>
              <p>Chính sách bảo mật</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Hỗ trợ khách hàng
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>Hướng dẫn đặt vé</p>
              <p>Tra cứu vé</p>
              <p>Chính sách hoàn vé</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Liên hệ
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <p>Email: support@busgo.vn</p>
              <p>Hotline: 1900 0000</p>
              <p>Thời gian: 24/7</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 px-5 py-5 text-center text-sm text-slate-500">
          © 2026 BusGo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default HomePage;