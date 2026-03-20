import Image from "next/image";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-3 pt-32 text-center">
      <Image
        src="/images/sahadijital-logo.svg"
        alt="Saha Dijital Logo"
        width={48}
        height={45}
      />
      <p className="text-lg font-semibold text-gray-700">Çok Yakında</p>
      <p className="text-sm text-gray-400">Ayarlar sayfası henüz hazır değil.</p>
    </div>
  );
}
