import { useRouter } from "next/router";
export const PropertyCardMap = ({ property }) => {
  const router = useRouter();
  const clickHandler = () => {
    router.push(`/property/${property.address.toLowerCase().replaceAll(' ', '-').replace(',', '')}`);
  }
  return (
    <div className="property-card-map">
      <img src={property.images[0]} alt={property.title} className="property-image-map"></img>
      <div className="property-info-map">
        <div>
          {property.status}
        </div>
        <div>
          {property.title}
        </div>
        <div>
          {property.description}
        </div>
        <div>
          {property.price}
        </div>
        <button className="property-button-map" onClick={clickHandler}>View Details</button>
      </div>
    </div>
  );
}