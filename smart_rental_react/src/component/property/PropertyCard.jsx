import { Link, useNavigate } from "react-router-dom";

const PropertyCard = ({ property, handleEdit }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="col-md-3">
        <div className="property-card shadow-sm border-0 h-100 d-flex flex-column">
          {/* Top part as Link */}
          <Link
            to={`/property/view/${property.id}`}
            className="text-decoration-none flex-grow-1"
          >
            <div
              className={`property-img-wrapper ${
                property.available ? "" : "unavailable"
              }`}
            >
              <img
                src="/house.png"
                alt={property.title}
                className="property-img"
              />
            </div>
            <div className="property-body text-center px-3 pb-3">
              <h5 className="text-primary fw-semibold mt-3">
                {property.title}
              </h5>
              <p className="mb-1 text-secondary small">
                <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                {property.location}
              </p>
              <p className="fw-bold text-success">
                {property.price} NPR{" "}
                {property.category === "Land" ? "Per Ana" : ""}
              </p>
            </div>
          </Link>

          {/* Button at the bottom */}
          <button
            onClick={() =>
              handleEdit
                ? navigate(`/property/edit/${property.id}`)
                : navigate(`/property/view/${property.id}`)
            }
            className="btn btn-primary w-100 rounded-4 fw-semibold mt-auto"
          >
            {handleEdit ? "Edit Property" : "View Property"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;
