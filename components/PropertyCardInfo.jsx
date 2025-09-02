import { useRouter } from "next/router";
export const PropertyCardInfo = ({ property }) => {
  const router = useRouter();
  const clickHandler = () => {
    router.push(`/property/${property.address.toLowerCase().replaceAll(' ', '-').replace(',', '')}`);
  }
  return (
    <div className="property-card-info">
      <img src={property.images[0]} alt={property.title} className="property-image"></img>
      <div className="property-info">
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
        <button className="property-button" onClick={clickHandler}>View Details</button>
      </div>
    </div>
  );
}