import { useRouter } from "next/router";

export const PropertyCard = ({ property, variant = "info" }) => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(
      `/property/${property.address
        .toLowerCase()
        .replaceAll(" ", "-")
        .replace(",", "")}`
    );
  };

  // map variant → classNames
  const cardClass =
    variant === "map" ? "property-card-map" : "property-card-info";
  const imageClass =
    variant === "map" ? "property-image-map" : "property-image";
  const infoClass =
    variant === "map" ? "property-info-map" : "property-info";
  const buttonClass =
    variant === "map" ? "property-button-map" : "property-button";

  return (
    <div className={cardClass}>
      <img
        src={property.images[0]}
        alt={property.title}
        className={imageClass}
      />
      <div className={infoClass}>
        <div>{property.status}</div>
        <div>{property.title}</div>
        <div>{property.description}</div>
        <div>{property.price}</div>
        <button className={buttonClass} onClick={clickHandler}>
          View Details
        </button>
      </div>
    </div>
  );
};
