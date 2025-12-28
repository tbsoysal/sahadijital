// components/ErrorPopup.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; // Next.js yönlendirme için

interface ErrorPopupProps {
  message: string | null;
  onClose: () => void;
  redirectPath?: string; // Opsiyonel yönlendirme yolu
}

export default function ErrorPopup({
  message,
  onClose,
  redirectPath,
}: ErrorPopupProps) {
  const router = useRouter();

  const handleButtonClick = () => {
    onClose(); // Popup'ı kapat
    if (redirectPath) {
      router.push(redirectPath); // Eğer yol belirtilmişse oraya git
    }
  };

  return (
    <AnimatePresence>
      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
          >
            {/* Üst Kısım */}
            <div className="bg-gray-900 p-4 text-center">
              <span className="text-2xl">⚽</span>
            </div>

            <div className="p-6 text-center">
              <h3 className="mb-2 text-xl font-bold text-gray-900">Hata</h3>
              <p className="mb-6 text-gray-600">{message}</p>

              <button
                onClick={handleButtonClick}
                className="w-full cursor-pointer rounded-xl bg-[#10b981] py-3 font-bold text-white transition-colors hover:bg-[#0da673]"
              >
                {redirectPath ? "Giriş Yap" : "Tamam"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
