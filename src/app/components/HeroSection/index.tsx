import NavBar from "./NavBar";
import Label from "../Label";
import { Button } from "../Button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-[#93CFEC] to-[#F6FFE8] max-h-[920px] w-full py-6">
      <NavBar />
      <div className="sm:mx-auto mx-5 my-[64px] max-w-[900px] text-center">
        <Label className="mx-auto mb-8">Modern rezervasyon sistemi</Label>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Halı Saha 3 Adımda Rezervasyon</h1>
        <p className="font-medium text-xl mb-8">Online rezervasyonlar alın, takviminizi yönetin ve gelir istatistiklerinizi anında görün. Hepsi tek platformda, modern bir arayüzle.</p>
        <Button href="#" variant="primary" className="max-w-max mx-auto">Hemen Demo Kullan</Button>
      </div>
      <div className="max-w-max mx-auto">
        <Image
          src="/images/heroimage.png"
          alt="reservation calendar image"
          width={1048}
          height={749}
        />
      </div>
    </div>
  )
}

export default HeroSection;
