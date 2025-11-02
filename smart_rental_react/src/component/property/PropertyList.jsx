import "bootstrap/dist/css/bootstrap.min.css";
import "./card.css";
import PropertyCard from "./PropertyCard";

const PropertyList = ({ properties }) => {
  return (
    <div className="container py-2">
      <div className="row g-4">
        {properties.map((property) => (
          <PropertyCard property={property} key={property.id} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
