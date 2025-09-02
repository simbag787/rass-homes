import { useRouter } from "next/router";
import properties from "../../data/properties.json"; // adjust path

export default function PropertyPage() {
  const router = useRouter();
  const { address } = router.query;

  // find property by address
  const property = properties.find(
    (p) => p.address.toLowerCase().replaceAll(' ', '-').replace(',', '') === address
  );

  if (!property) {
    return <div>Property not found.</div>;
  }

  return (
    <div className="property-page">
      <div className="property-images">
        {property.images.map((img, index) => (
          <img key={index} src={img} alt={`${property.title}-${index}`} />
        ))}
      </div>
      <div className="property-details">
        <h1>{property.title}</h1>
        <p className="property-address">{property.address}</p>
        <p className="property-price">{property.price}</p>
        <p className="property-status">{property.status}</p>
        <p className="property-description">{property.description}</p>
      </div>
    </div>
  );
}
