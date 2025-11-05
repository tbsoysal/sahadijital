import Image from "next/image"
import Badge from "@/components/ui/Badge"
import TestimonialCard from "@/components/ui/TestimonialCard"

const testimonials = [
    {
        author: "Emre K.",
        comment: "“Saha rezervasyonu inanılmaz kolay! Artık arayıp saat sormakla uğraşmıyorum. 2 dakikada hallediyorum.”",
        star: 5,
        date: "24-10-2025"
    },
    {
        author: "Caner D.",
        comment: "“Arayüz sade ve çok hızlı çalışıyor. Rezervasyon sonrası hatırlatma mesajı bile geliyor, süper!”",
        star: 5,
        date: "24-10-2025"
    },
    {
        author: "Kadir U.",
        comment: "“Mobilde de masaüstü kadar akıcı. İlk kez bir futbol sitesi bu kadar iyi hissettirdi.”",
        star: 4,
        date: "24-10-2025"
    },
]

export default function Testimonials() {
    return (
        <section className="bg-linear-to-b from-white to-[#FFF9CE]">
            <div className="max-w-[1264px] mx-auto px-5 py-12 tablet:px-12 tablet:py-16 desktop:px-[88px]">
                <Badge />
                {/* Text Content */}
                <div className="max-w-[616px] mx-auto text-center mb-10">
                    <h2 className="font-medium text-5xl leading-16 mb-6">Kullanıcı Yorumları</h2>
                    <p className="font-medium text-2xl text-secondary-color leading-8">Lorem ipsum dolor sit amet consectetur. Leo aliquam elit adipiscing mi massa nibh sit. Diam praesent elit a lorem.</p>
                </div>

                {/* Comments */}
                <div className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
                    {
                        testimonials.map((testimonial, index) => {
                            return <TestimonialCard key={index} author={testimonial.author} comment={testimonial.comment} star={testimonial.star} date={testimonial.date} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}