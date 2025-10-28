"use client";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const PropertyCard = ({ property, variant = "info" }) => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const clickHandler = () => {
    router.push(
      `/property/${property.address
        .toLowerCase()
        .replaceAll(" ", "-")
        .replace(",", "")}`
    );
  };

  const cardClass =
    variant === "map" ? "property-card-map" : "property-card-info";
  const infoClass =
    variant === "map" ? "property-info-map" : "property-info";
  const buttonClass =
    variant === "map" ? "property-button-map" : "property-button";

  return (
    <div
      className={cardClass}
      onMouseEnter={() => swiperRef.current?.autoplay?.start()}
      onMouseLeave={() => swiperRef.current?.autoplay?.stop()}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={10}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          swiper.autoplay.stop();
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          width: "100%",
          height: "220px",
          position: "relative",
        }}
      >
        {property.images.map((url, i) => (
          <SwiperSlide key={i}>
            <img
              src={url}
              alt={`${property.title}-${i}`}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={infoClass}>
        <div>{property.status}</div>
        <div>{property.title}</div>
        <div>{property.description}</div>

      <div className="property-stats">
        <span>{property.bedrooms} Bed</span>
        <span>{property.bathrooms} Bath</span>
        <span>{property.sqft.toLocaleString()} sqft</span>
      </div>

        <div>{property.price}</div>

        <button className={buttonClass} onClick={clickHandler}>
          View Details
        </button>
      </div>
    </div>
  );
};
