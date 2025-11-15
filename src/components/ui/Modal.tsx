import Image from "next/image";
import Link from "next/link";

export default function Modal() {
  return (
    <div className="tablet:p-5 desktop:p-6 mx-auto max-w-[350px] rounded-xl bg-white p-4 text-center">
      <Image
        src="/images/successIcon.svg"
        alt="succes icon"
        width={40}
        height={40}
        className="mx-auto mb-5"
      />
      <h2 className="mb-2 text-2xl">Başarılı!</h2>
      <p className="text-secondary-color mb-8 text-base">
        Hesabınız oluşturuldu! Giriş yapabilirsiniz.
      </p>
      <Link
        href="/login"
        className="border-effect btn-primary w-full rounded-lg before:rounded-lg after:rounded-lg"
      >
        Giriş Yap
      </Link>
    </div>
  );
}
