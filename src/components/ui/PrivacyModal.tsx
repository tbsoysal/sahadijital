"use client";

import { motion, AnimatePresence } from "framer-motion";

type PrivacyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
              {/* KAPAT BUTONU (ORTADA) */}
              <button
                onClick={onClose}
                className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-black px-4 py-1 text-sm text-white transition hover:scale-105"
              >
                Kapat
              </button>

              <h2 className="mb-4 text-center text-xl font-semibold">
                Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni
              </h2>

              <div className="max-h-[60vh] space-y-3 overflow-y-auto text-sm text-gray-700">
                <p>
                  Bu aydınlatma metni, <strong>sahadijital.com</strong>{" "}
                  tarafından, 6698 sayılı Kişisel Verilerin Korunması Kanunu
                  (“KVKK”) uyarınca hazırlanmıştır.
                </p>

                <p>
                  Uygulama kapsamında ad, soyad, e-posta adresi gibi kişisel
                  verileriniz; üyelik işlemlerinin gerçekleştirilmesi,
                  hizmetlerin sunulması ve kullanıcı deneyiminin iyileştirilmesi
                  amaçlarıyla işlenmektedir.
                </p>

                <p>
                  Kişisel verileriniz, KVKK’nın 5. maddesinde belirtilen
                  sözleşmenin kurulması ve ifası hukuki sebebine dayanarak
                  işlenmektedir.
                </p>

                <p>
                  KVKK’nın 11. maddesi kapsamında kişisel verilerinize ilişkin
                  olarak; bilgi talep etme, düzeltme, silme ve itiraz etme
                  haklarına sahipsiniz.
                </p>

                <p>
                  Taleplerinizi{" "}
                  <a
                    href="mailto:info@sahadijital.com"
                    className="text-blue-600 underline"
                  >
                    info@sahadijital.com
                  </a>{" "}
                  üzerinden iletebilirsiniz.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
