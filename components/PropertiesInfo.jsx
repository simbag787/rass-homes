import properties from '../data/properties.json';
import { PropertyCard } from './PropertyCard';

export const PropertiesInfo = () => {
  return (
    <div className="properties-info">
      {properties.map((property) => (
       <PropertyCard key={property.id} property={property} />
      ))}
    </div>

  );
}