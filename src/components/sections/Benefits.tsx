"use client"

import Badge from "@/components/ui/Badge"
import { useState } from "react"
import { cn } from "@/lib/utils";
import Image from "next/image";

const tabs = [
  "Online rezervasyon",
  "Gelir takibi",
  "Dijitalleşmenin gücü",
  "Zaman yönetimi",
]

export default function Benefits() {
  const [tabSelected, setTabSelected] = useState(0);

  return (
    <section className="max-w-[1264px] mx-auto px-5 py-12 tablet:px-12 tablet:py-16 desktop:px-0">

      {/* Badge */}
      <Badge className="mb-5" />

      {/* text content */}
      <div className="text-center max-w-[616px] mx-auto mb-10">
        <h2 className="font-medium text-4xl mb-6">Faydalar</h2>
        <p className="font-medium text-2xl text-secondary-color">Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem.</p>
      </div>

      {/* Tab Labels */}
      <div className="mx-auto flex gap-4 overflow-scroll scrollbar-none max-w-max mb-8">
        {
          tabs.map((label, index) => {
            return <button
              key={index}
              onClick={() => setTabSelected(index)}
              className={cn(
                "border-effect rounded-full after:rounded-full before:rounded-full min-w-max px-5 py-3 font-medium text-xl",
                tabSelected === index ? "btn-primary" : "btn-secondary"
              )}
            >
              {label}
            </button>
          })
        }
      </div>

      {/* Tab Contents */}
      <div className="max-w-[1264px] mx-auto bg-white border-effect rounded-[20px] after:rounded-[20px] before:rounded-[20px] tablet:flex tablet:h-[586px]">
        {/* Text Content */}
        <div className="max-w-[404px] flex flex-col p-8 mx-auto tablet:justify-center desktop:max-w-[508px]">
          <h3 className="font-bold text-3xl leading-[44px] mb-8">Online rezervasyon takibi</h3>
          <p className="font-medium text-xl text-secondary-color leading-[28px] mb-2.5">Oyuncular istediği saatte rezervasyon yapabilsin, siz sadece onaylayın.</p>
          <p className="font-medium text-xl text-secondary-color leading-[28px]">7/24 açık sanal saha defteriniz olsun.</p>
        </div>
        {/* Image content */}
        <div className="w-full flex justify-start rounded-[20px] rounded-t-none items-center bg-[#B2DDFF] overflow-hidden p-8 tablet:rounded-l-none tablet:rounded-t-[20px] tablet:border-l-1">
          <div className="mx-auto">
            <p className="font-medium text-2xl text-start mb-8 ">Bekleyen Rezervasyonlar</p>
            {/* Reservation Card */}
            <div className="grid gap-5  overflow-hidden">
              {
                [
                  "14:00 - 15:00",
                  "20:00 - 21:00",
                  "22:00 - 23:00"
                ].map((time, index) => {
                  return (
                    <div key={index} className="flex items-center gap-[108px] bg-white border-effect rounded-[16px] after:rounded-[16px] before:rounded-[16px] w-[460px] px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-3 items-center">
                          <Image src="/images/clock.svg" alt="clock icon" width={24} height={24} />
                          <span className="font-bold text-2xl min-w-max">{time}</span>
                        </div>
                        <span className="block font-medium text-xl text-[#717680]">Bugün</span>
                      </div>
                      <span className="block bg-[#FEEE95] text-[#85490E] text-xl font-medium rounded-full px-5 py-2">Bekliyor</span>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
