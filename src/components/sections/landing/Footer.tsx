import Image from "next/image"

export default function Footer() {
    return (
        <footer className="bg-linear-to-b from-white to-[#C4EDF8] px-5 py-12">
            <div className="max-w-[1264px] mx-auto">
                <span className="block w-full border border-dashed border-primary-color mb-10 tablet:hidden"></span>
                <div className="grid grid-cols-1 gap-16 items-center tablet:grid-cols-[auto_1fr] desktop:flex desktop:justify-between">
                    <p className="font-medium text-xl">© 2025 Saha Dijital Ltd.</p>

                    {/* Nav */}
                    <ul className="flex flex-col gap-3 tablet:flex-row tablet:ml-auto desktop:ml-0">
                        <li><a className="block min-w-max font-medium text-xl px-2 py-1 nav-link" href="#features">Özellikler</a></li>
                        <li><a className="block min-w-max font-medium text-xl px-2 py-1 nav-link" href="#benefits">Faydalar</a></li>
                        <li><a className="block min-w-max font-medium text-xl px-2 py-1 nav-link" href="#howitworks">Nasıl Çalışır?</a></li>
                        <li><a className="block min-w-max font-medium text-xl px-2 py-1 nav-link" href="#pricing">Fiyatlandırma</a></li>
                    </ul>

                    {/* Social Links */}
                    <ul className="flex items-center gap-3">
                        <li className="btn-border-effect btn-secondary p-0"><a className="block p-3" href="x.com"><Image src="/images/xIcon.svg" alt="x icon" width={20} height={20} /></a></li>
                        <li className="btn-border-effect btn-secondary p-0"><a className="block p-3" href="youtube.com"><Image src="/images/youtubeIcon.svg" alt="youtube icon" width={20} height={20} /></a></li>
                        <li className="btn-border-effect btn-secondary p-0"><a className="block p-3" href="linkedin.com"><Image src="/images/linkedinIcon.svg" alt="linkedin icon" width={20} height={20} /></a></li>
                        <li className="btn-border-effect btn-secondary p-0"><a className="block p-3" href="instagram.com/saha.dijital"><Image src="/images/instagramIcon.svg" alt="instagram icon" width={20} height={20} /></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}