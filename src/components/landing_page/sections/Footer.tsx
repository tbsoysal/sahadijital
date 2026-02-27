import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-white to-[#C4EDF8] px-5 py-12">
      <div className="mx-auto max-w-[1264px]">
        <div className="tablet:grid-cols-[auto_1fr] desktop:flex desktop:justify-between grid grid-cols-1 items-center gap-16">
          <p className="tablet:text-xl desktop:text-2xl text-base font-medium">
            © 2025 Saha Dijital Ltd.
          </p>

          {/* Nav */}
          <ul className="tablet:flex-row tablet:ml-auto desktop:ml-0 flex flex-col gap-3">
            <li>
              <a
                className="nav-link tablet:text-xl desktop:text-2xl block min-w-max px-2 py-1 text-base font-medium"
                href="#features"
              >
                Özellikler
              </a>
            </li>
            <li>
              <a
                className="nav-link tablet:text-xl desktop:text-2xl block min-w-max px-2 py-1 text-base font-medium"
                href="#benefits"
              >
                Faydalar
              </a>
            </li>
            <li>
              <a
                className="nav-link tablet:text-xl desktop:text-2xl block min-w-max px-2 py-1 text-base font-medium"
                href="#howitworks"
              >
                Nasıl Çalışır?
              </a>
            </li>
            <li>
              <a
                className="nav-link tablet:text-xl desktop:text-2xl block min-w-max px-2 py-1 text-base font-medium"
                href="#pricing"
              >
                Fiyatlandırma
              </a>
            </li>
          </ul>

          {/* Social Links */}
          <ul className="flex items-center gap-3">
            <li className="border-primary-color btn-secondary rounded-lg border bg-white p-0 shadow-[2px_2px_black] duration-200 hover:shadow-none">
              <a className="block p-3" href="x.com">
                <Image
                  src="/images/xIcon.svg"
                  alt="x icon"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li className="border-primary-color btn-secondary rounded-lg border bg-white p-0 shadow-[2px_2px_black] duration-200 hover:shadow-none">
              <a className="block p-3" href="youtube.com">
                <Image
                  src="/images/youtubeIcon.svg"
                  alt="youtube icon"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li className="border-primary-color btn-secondary rounded-lg border bg-white p-0 shadow-[2px_2px_black] duration-200 hover:shadow-none">
              <a className="block p-3" href="linkedin.com">
                <Image
                  src="/images/linkedinIcon.svg"
                  alt="linkedin icon"
                  width={20}
                  height={20}
                />
              </a>
            </li>
            <li className="border-primary-color btn-secondary rounded-lg border bg-white p-0 shadow-[2px_2px_black] duration-200 hover:shadow-none">
              <a className="block p-3" href="instagram.com/saha.dijital">
                <Image
                  src="/images/instagramIcon.svg"
                  alt="instagram icon"
                  width={20}
                  height={20}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

