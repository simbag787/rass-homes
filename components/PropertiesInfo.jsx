import properties from '../data/properties.json';
import { PropertyCardInfo } from './PropertyCardInfo';

export const PropertiesInfo = () => {
  return (
    <div className="properties-info">
      {properties.map((property) => (
       <PropertyCardInfo key={property.id} property={property} />
      ))}
    </div>

  );
}