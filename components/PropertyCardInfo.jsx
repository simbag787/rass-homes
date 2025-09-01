
export const PropertyCardInfo = ({ property, onOpen }) => {
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
        <button className="property-button" onClick={() => onOpen(property)}>View Details</button>
      </div>
    </div>
  );
}