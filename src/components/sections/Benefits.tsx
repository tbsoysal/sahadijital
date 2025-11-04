"use client"

import { useState, ReactNode } from "react"
import Badge from "@/components/ui/Badge"
import TabButton from "@/components/ui/TabButton"
import BenefitBox1 from "@/components/ui/BenefitBox1"
import BenefitBox2 from "@/components/ui/BenefitBox2"
import BenefitBox3 from "@/components/ui/BenefitBox3"
import BenefitBox4 from "@/components/ui/BenefitBox4"

interface Benefit {
  label: string
  component: ReactNode
}

const benefitsData: Benefit[] = [
  {
    label: "Online rezervasyon",
    component: <BenefitBox1 />,
  },
  {
    label: "Gelir takibi",
    component: <BenefitBox2 />,
  },
  {
    label: "Dijitalleşmenin gücü",
    component: <BenefitBox3 />,
  },
  {
    label: "Zaman yönetimi",
    component: <BenefitBox4 />,
  },
]

export default function Benefits() {
  const [selected, setSelected] = useState<number>(0)
  const ActiveTab = benefitsData[selected]?.component

  return (
    <section className="max-w-[1264px] mx-auto px-5 py-12 tablet:px-12 tablet:py-16 desktop:px-0">
      {/* Badge */}
      <Badge className="mb-5" />

      {/* Title + Description */}
      <div className="text-center max-w-[616px] mx-auto mb-10">
        <h2 className="font-medium text-4xl mb-6">Faydalar</h2>
        <p className="font-medium text-2xl text-secondary-color">
          Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit.
          Diam praesent elit a lorem.
        </p>
      </div>

      {/* Tabs */}
      <div className="mx-auto flex gap-4 overflow-x-auto scrollbar-none max-w-max mb-8">
        {benefitsData.map((benefit, index) => (
          <TabButton
            key={index}
            label={benefit.label}
            isActive={selected === index}
            onClick={() => setSelected(index)}
          />
        ))}
      </div>

      {/* Active Benefit */}
      <div>{ActiveTab}</div>
    </section>
  )
}