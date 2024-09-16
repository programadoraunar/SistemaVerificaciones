"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import slide_image_1 from "/graduado.jpg";
import slide_image_2 from "/Escudo_Aunar.png";
import Image from "next/image";
export default function Carousel() {
  return (
    <div className="relative w-full max-w-xl mx-auto py-5">
      {" "}
      {/* Ajustar el ancho máximo del contenedor */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="w-full"
        loop={true}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide>
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={"/graduado2.jpg"}
              width={500}
              height={300}
              alt="escudo"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={"/graduado2.jpg"}
              width={500}
              height={300}
              alt="escudo"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={"/graduado2.jpg"}
              width={500}
              height={300}
              alt="escudo"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
