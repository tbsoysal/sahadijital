"use client"

import React, { useState } from 'react';

const ComingSoonPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Send email notification to your email
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriberEmail: email,
          notificationEmail: 'berksysl.g@gmail.com',
          subject: 'SahaDijital - Yeni Abone',
          message: `Yeni abone kaydı!\n\nAbone E-posta: ${email}\nTarih: ${new Date().toLocaleString('tr-TR')}\n\nSahaDijital Coming Soon Sayfası`
        }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
      } else {
        throw new Error('E-posta gönderilemedi');
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Email notification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-600 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-emerald-500 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-emerald-600 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Football Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
              <span className="text-4xl">⚽</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              SahaDijital
            </span>
            <br />
            <span className="text-gray-800">Çok Yakında!</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Halı saha rezervasyonlarınızı dijitalleştiriyoruz. Hazır olun!
          </p>

          {/* CTA Button */}
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-12">
            <span className="mr-2">📱</span>
            Bizi Takip Et
          </button>

          {/* Email Subscription */}
          <div className="max-w-md mx-auto">
            {!isSubscribed ? (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresinizi girin"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-500"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Gönderiliyor...' : 'Bildirim Al'}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full">
                  <span className="mr-2">✅</span>
                  Teşekkürler! Size haber vereceğiz.
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-3 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm">
                  <span className="mr-2">⚠️</span>
                  {error}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Kolay Rezervasyon</h3>
            <p className="text-gray-600 text-sm">Anında saha rezervasyonu yapın</p>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Hızlı İşlem</h3>
            <p className="text-gray-600 text-sm">Saniyeler içinde işlemlerinizi tamamlayın</p>
          </div>
          <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Akıllı Yönetim</h3>
            <p className="text-gray-600 text-sm">Rezervasyonlarınızı kolayca yönetin</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 px-4">
        <p className="text-sm text-gray-600">
          © 2025 SahaDijital. Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
};

export default ComingSoonPage;
