import { Link } from "react-router-dom";

const CategoryCard = ({ category, type }) => {
  return (
    <>
      <div className="col-md-3">
        <Link
          to={`/property?${type}=${category.name}`}
          className="text-decoration-none"
        >
          <div className="shadow-sm border-0 rounded bg-category p-2">
            <h6 className="text-dark font-weight-bold">{category.name}</h6>
            <h6 className="text-dark font-weight-light">
              {category.value} Properties
            </h6>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CategoryCard;
