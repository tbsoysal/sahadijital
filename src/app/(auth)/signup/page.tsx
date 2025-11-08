import Link from "next/link"
import Image from "next/image"
import SignupForm from "@/components/ui/SignupForm"

export default function signup() {
    return (
        <div className="bg-linear-to-b from-[#93CFEC] to-white min-h-screen">
            <div className="px-5 py-12">
                <div className="text-center max-w-[400px] gap-4 mx-auto box-content mb-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center justify-center gap-1 z-10">
                        <Image
                            src="/images/sahadijital-icon.svg"
                            alt="saha dijital logo"
                            width={32}
                            height={30}
                        />
                        <span className="font-medium text-xl">Sahadijital</span>
                    </Link>
                    <h2 className="font-bold text-[32px]">Hemen üye ol</h2>
                    <p className="font-medium text-xl text-secondary-color">Rezervasyonlarını yönet, bildirimleri takip et ve sahalarını kontrol et.</p>
                </div>

                {/* Form */}
                <SignupForm />
            </div>
        </div>
    )
}