import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

export default function Modal() {
  return (
    <div className="tablet:p-5 desktop:p-6 mx-auto max-w-[350px] rounded-xl bg-white p-4 text-center shadow-xl">
      <Image
        src="/images/successIcon.svg"
        alt="succes icon"
        width={40}
        height={40}
        className="mx-auto mb-5"
      />
      <h2 className="mb-2 text-lg tablet:text-2xl desktop:text-[28px] font-medium">Başarılı!</h2>
      <p className="text-secondary-color mb-8 text-sm font-medium tablet:text-lg desktop:text-xl">
        Hesabınız oluşturuldu! Giriş yapabilirsiniz.
      </p>
      <Link
        href="/login"
      >
        <Button variant="primary" className="w-full">
          Giriş Yap
        </Button>
      </Link>
    </div>
  );
}
