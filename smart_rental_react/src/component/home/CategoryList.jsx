import "bootstrap/dist/css/bootstrap.min.css";
import CategoryCard from "./CategoryCard";

const CategoryList = ({ categories }) => {
  return (
    <div className="container py-2">
      <div className="row g-1">
        {categories.map((category, index) => (
          <CategoryCard
            category={category}
            type={category.reference}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
