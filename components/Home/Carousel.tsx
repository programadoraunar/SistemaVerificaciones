"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
// Array dinámico para las imágenes
const images = [
  { src: "/GRADUADOS1.webp", alt: "GRADUADOS1" },
  { src: "/GRADUADOS2.webp", alt: "GRADUADOS2" },
  { src: "/GRADUADOS3.webp", alt: "GRADUADOS3" },
  { src: "/GRADUADOS4.webp", alt: "GRADUADOS4" },
  { src: "/GRADUADOS5.webp", alt: "GRADUADOS5" },
  { src: "/GRADUADOS6.webp", alt: "GRADUADOS6" },
  { src: "/GRADUADOS7.webp", alt: "GRADUADOS7" },
  { src: "/GRADUADOS8.webp", alt: "GRADUADOS8" },
  { src: "/GRADUADOS9.webp", alt: "GRADUADOS9" },
  { src: "/GRADUADOS10.webp", alt: "GRADUADOS10" },
  { src: "/GRADUADOS11.webp", alt: "GRADUADOS11" },
  { src: "/GRADUADOS12.webp", alt: "GRADUADOS12" },
];

export default function Carousel() {
  return (
    <div className="relative w-full max-w-xl mx-auto py-5">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true} // Habilita botones de navegación
        pagination={{ clickable: true }} // Paginación clicable
        autoplay={{
          delay: 3000, // 3 segundos entre transiciones
          disableOnInteraction: false, // Sigue reproduciendo después de interacciones
        }}
        loop={true} // Habilita el looping infinito
        modules={[Autoplay, Pagination, Navigation]} // Módulos habilitados
        className="w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={image.src}
                width={800}
                height={400}
                alt={image.alt}
                className="rounded-lg shadow-md"
                onError={(e) => (e.currentTarget.src = "/fallback.jpg")} // Imagen de respaldo
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
