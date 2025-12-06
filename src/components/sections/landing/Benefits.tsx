"use client";

import { useState, ReactNode } from "react";
import Badge from "@/components/ui/Badge";
import TabButton from "@/components/sections/landing/TabButton";
import BenefitBox1 from "@/components/sections/landing/BenefitBox1";
import BenefitBox2 from "@/components/sections/landing/BenefitBox2";
import BenefitBox3 from "@/components/sections/landing/BenefitBox3";
import BenefitBox4 from "@/components/sections/landing/BenefitBox4";

interface Benefit {
  label: string;
  component: ReactNode;
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
];

export default function Benefits() {
  const [selected, setSelected] = useState<number>(0);
  const ActiveTab = benefitsData[selected]?.component;

  return (
    <section id="benefits" className="bg-linear-to-b from-white to-[#D9FFDD]">
      <div className="tablet:px-12 tablet:py-16 desktop:px-0 mx-auto max-w-[1264px] px-5 py-12">
        {/* Badge */}
        <Badge className="mb-5" />

        {/* Title + Description */}
        <div className="mx-auto mb-10 max-w-[616px] text-center">
          <h2 className="tablet:mb-4 mb-3 text-4xl font-medium">Faydalar</h2>
          <p className="text-secondary-color text-2xl font-medium">
            Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing
            mi massa nibh sit. Diam praesent elit a lorem.
          </p>
        </div>

        {/* Tabs */}
        <div className="scrollbar-none mx-auto mb-8 flex max-w-max gap-4 overflow-x-auto">
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
      </div>
    </section>
  );
}
