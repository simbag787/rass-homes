
export const PropertyCardMap = ({ property, onOpen }) => {
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
        <button className="property-button-map" onClick={() => onOpen(property)}>View Details</button>
      </div>
    </div>
  );
}