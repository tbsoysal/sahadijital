'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date (e.g., 60 days from now)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 60);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
    alert('Teşekkürler! Sizi bilgilendireceğiz.');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full">
        {/* Main Content */}
        <div className="text-center text-white">
          {/* Logo/Title */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 animate-pulse">
              ⚽ Saha360
            </h1>
            <div className="h-1 w-24 sm:w-32 md:w-40 bg-white mx-auto rounded-full"></div>
          </div>

          {/* Coming Soon */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 px-4">
            Yakında Geliyor
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 text-green-100 max-w-3xl mx-auto px-4 leading-relaxed">
            Halı saha rezervasyon yönetiminizi kolaylaştıran, modern ve kullanıcı dostu SaaS platformumuz çok yakında sizlerle!
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 transform hover:scale-105 transition-transform duration-200">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{timeLeft.days}</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100 mt-2">Gün</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 transform hover:scale-105 transition-transform duration-200">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{timeLeft.hours}</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100 mt-2">Saat</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 transform hover:scale-105 transition-transform duration-200">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{timeLeft.minutes}</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100 mt-2">Dakika</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 transform hover:scale-105 transition-transform duration-200">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{timeLeft.seconds}</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100 mt-2">Saniye</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl sm:text-5xl mb-3">📅</div>
              <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">Kolay Rezervasyon</h3>
              <p className="text-green-100 text-sm sm:text-base">
                Saha rezervasyonlarınızı anında yönetin
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl sm:text-5xl mb-3">💳</div>
              <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">Online Ödeme</h3>
              <p className="text-green-100 text-sm sm:text-base">
                Güvenli ve hızlı ödeme altyapısı
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 sm:col-span-2 lg:col-span-1 transform hover:scale-105 transition-transform duration-200">
              <div className="text-4xl sm:text-5xl mb-3">📊</div>
              <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2">Raporlama</h3>
              <p className="text-green-100 text-sm sm:text-base">
                Detaylı analiz ve raporlama araçları
              </p>
            </div>
          </div>

          {/* Email Signup */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 sm:p-8 md:p-10 max-w-xl mx-auto mb-8 sm:mb-12 sm:mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">
              Erken Erişim İçin Kayıt Olun
            </h3>
            <p className="text-green-100 mb-4 sm:mb-6 text-sm sm:text-base">
              Lansman haberlerini ve özel fırsatları ilk siz öğrenin!
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                required
                className="w-full px-4 py-3 sm:py-4 rounded-lg text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400 transition-shadow"
              />
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold px-6 py-3 sm:py-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Bilgilendir
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="px-4">
            <p className="text-green-100 mb-4 text-sm sm:text-base">Bizi Takip Edin</p>
            <div className="flex justify-center gap-4 sm:gap-6">
              <a href="#" className="text-white hover:text-green-200 transition-all duration-200 transform hover:scale-110 active:scale-95">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24" aria-label="Facebook">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-green-200 transition-all duration-200 transform hover:scale-110 active:scale-95">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24" aria-label="Twitter">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-green-200 transition-all duration-200 transform hover:scale-110 active:scale-95">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24" aria-label="Instagram">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
