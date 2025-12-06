import Badge from "@/components/ui/Badge";
import TestimonialCard from "@/components/sections/landing/TestimonialCard";

const testimonials = [
  {
    author: "Emre K.",
    comment:
      "“Saha rezervasyonu inanılmaz kolay! Artık arayıp saat sormakla uğraşmıyorum. 2 dakikada hallediyorum.”",
    date: "24-10-2025",
  },
  {
    author: "Caner D.",
    comment:
      "“Arayüz sade ve çok hızlı çalışıyor. Rezervasyon sonrası hatırlatma mesajı bile geliyor, süper!”",
    date: "24-10-2025",
  },
  {
    author: "Kadir U.",
    comment:
      "“Mobilde de masaüstü kadar akıcı. İlk kez bir futbol sitesi bu kadar iyi hissettirdi.”",
    date: "24-10-2025",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-linear-to-b from-white to-[#FFF9CE]">
      <div className="tablet:px-12 tablet:py-16 desktop:px-[88px] mx-auto max-w-[1264px] px-5 py-12">
        <Badge />
        {/* Text Content */}
        <div className="mx-auto mb-10 max-w-[616px] text-center">
          <h2 className="mb-6 text-5xl leading-16 font-medium">
            Kullanıcı Yorumları
          </h2>
          <p className="text-secondary-color text-2xl leading-8 font-medium">
            Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing
            mi massa nibh sit. Diam praesent elit a lorem.
          </p>
        </div>

        {/* Comments */}
        <div className="tablet:grid-cols-2 desktop:grid-cols-3 grid grid-cols-1 gap-5">
          {testimonials.map((testimonial, index) => {
            return (
              <TestimonialCard
                key={index}
                author={testimonial.author}
                comment={testimonial.comment}
                date={testimonial.date}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
