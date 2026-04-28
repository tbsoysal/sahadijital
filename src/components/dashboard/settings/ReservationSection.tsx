"use client";

import { useEffect, useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import SettingsCard from "./SettingsCard";

export default function ReservationSection({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(`/${slug}`);

  useEffect(() => {
    setUrl(`${window.location.origin}/${slug}`);
  }, [slug]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SettingsCard title="Rezervasyon Linki">
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
        <p className="flex-1 truncate text-sm text-gray-600">{url}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 cursor-pointer rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
          title="Aç"
        >
          <ExternalLink size={16} />
        </a>
        <button
          onClick={handleCopy}
          className="shrink-0 cursor-pointer rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
          title="Kopyala"
        >
          {copied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
      {copied && <p className="mt-2 text-xs text-green-600">Kopyalandı!</p>}
    </SettingsCard>
  );
}
