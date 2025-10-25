"use client";
import { useRouter } from "next/router";
import properties from "../../data/properties.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";

export default function PropertyPage() {
  const router = useRouter();
  const { address } = router.query;

  const property = properties.find(
    (p) =>
      p.address.toLowerCase().replaceAll(" ", "-").replace(",", "") ===
      address
  );

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!property) return <div>Property not found.</div>;

  const features = [
    "Swimming Pool",
    "Garage",
    "Garden",
    "Fireplace",
    "Gym",
    "Balcony",
    "Air Conditioning",
    "Hardwood Floors",
    "Walk-in Closet",
    "Smart Home System",
  ];

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Gallery */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        style={{ width: "100%", height: "420px", borderRadius: "12px" }} // smaller height
      >
        {property.images.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`${property.title}-${i}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={12}
        slidesPerView="auto"
        watchSlidesProgress
        style={{ marginTop: "16px" }}
      >
        {property.images.map((img, i) => (
          <SwiperSlide
            key={i}
            style={{
              width: "90px",
              cursor: "pointer",
            }}
          >
            <img
              src={img}
              alt={`thumb-${i}`}
              style={{
                width: "100%",
                height: "65px", // slightly smaller
                objectFit: "cover",
                borderRadius: "8px",
                border:
                  activeIndex === i
                    ? "2px solid #bfa98c"
                    : "2px solid transparent",
                transition: "border 0.3s",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Info Section */}
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "4rem", // bigger padding
          marginTop: "20px",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column */}
          <div style={{ flex: "2", minWidth: "320px" }}>
            <h1 style={{ fontSize: "38px", fontWeight: "bold", color: "#222" }}>
              {property.title}
            </h1>
            <p style={{ fontSize: "18px", color: "#666", marginTop: "6px" }}>
              {property.address}
            </p>
            <p
              style={{
                fontSize: "18px",
                color: "#333",
                lineHeight: "1.8",
                marginTop: "18px",
              }}
            >
              {property.description}
            </p>

            {/* Specs Card (compact) */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                backgroundColor: "#fff",
                padding: "16px 20px",
                borderRadius: "14px",
                boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
                marginTop: "28px",
                maxWidth: "250px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {[
                { label: "Bedrooms", value: property.bedrooms },
                { label: "Bathrooms", value: property.bathrooms },
                { label: "Sqft", value: property.sqft },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center", minWidth: "60px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: 0,
                      color: "#222",
                    }}
                  >
                    {item.value}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      margin: 0,
                      marginTop: "2px",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Features / Amenities */}
            <div style={{ marginTop: "28px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#222" }}>
                Features / Amenities
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginTop: "14px",
                  color: "#333",
                }}
              >
                {features.map((f) => (
                  <div key={f} style={{ fontSize: "16px" }}>
                    • {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div
            style={{
              flex: "1",
              minWidth: "240px",
              padding: "28px",
              borderRadius: "14px",
              backgroundColor: "#fff",
              boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#bfa98c",
                marginBottom: "12px",
              }}
            >
              {property.price}
            </p>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color:
                  property.status === "Available"
                    ? "#4caf50"
                    : property.status === "Sold"
                      ? "#f44336"
                      : "#f57c00",
                marginBottom: "20px",
              }}
            >
              {property.status}
            </p>
            <button
              style={{
                padding: "14px 18px",
                backgroundColor: "#bfa98c",
                color: "#fff",
                fontWeight: "600",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                width: "100%",
                fontSize: "16px",
              }}
            >
              Interested? Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
