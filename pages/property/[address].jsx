import { useRouter } from "next/router";
import properties from "../../data/properties.json"; // adjust path
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function PropertyPage() {
  const router = useRouter();
  const { address } = router.query;

  // find property by address
  const property = properties.find(
    (p) =>
      p.address.toLowerCase().replaceAll(" ", "-").replace(",", "") === address
  );

  if (!property) {
    return <div>Property not found.</div>;
  }

  // format images for gallery
  const galleryItems = property.images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <div className="property-page">
      <div className="property-images">
        <ImageGallery items={galleryItems} showPlayButton={false} />
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
