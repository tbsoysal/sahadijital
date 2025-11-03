"use client"

import Badge from "@/components/ui/Badge"
import { useState } from "react"
import { cn } from "@/lib/utils";
import BenefitBox1 from "@/components/ui/BenefitBox1";
import BenefitBox2 from "../ui/BenefitBox2";

const tabs = [
  "Online rezervasyon",
  "Gelir takibi",
  "Dijitalleşmenin gücü",
  "Zaman yönetimi",
]

const tabComponents = [
  <BenefitBox1 key={0} />,
  <BenefitBox2 key={1} />
]

export default function Benefits() {
  const [tabSelected, setTabSelected] = useState(0);
  const ActiveTab = tabComponents[tabSelected];

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

      {/* Benefit Card */}
      {ActiveTab}

    </section>
  )
}
