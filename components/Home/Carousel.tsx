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
  { src: "/GRADUADOS1.webp", alt: "Graduado 2" },
  { src: "/GRADUADOS2.webp", alt: "Graduado" },
  { src: "/GRADUADOS3.webp", alt: "Escudo AUNAR" },
  { src: "/GRADUADOS4.webp", alt: "Graduado 2" },
  { src: "/GRADUADOS5.webp", alt: "Graduado" },
  { src: "/GRADUADOS6.webp", alt: "Escudo AUNAR" },
  { src: "/GRADUADOS7.webp", alt: "Graduado 2" },
  { src: "/GRADUADOS8.webp", alt: "Graduado" },
  { src: "/GRADUADOS9.webp", alt: "Escudo AUNAR" },
  { src: "/GRADUADOS10.webp", alt: "Graduado 2" },
  { src: "/GRADUADOS11.webp", alt: "Graduado" },
  { src: "/GRADUADOS12.webp", alt: "Escudo AUNAR" },
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
                width={500}
                height={300}
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
