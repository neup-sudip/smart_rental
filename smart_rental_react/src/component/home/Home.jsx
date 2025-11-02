import { useEffect, useState } from "react";
import PropertyList from "../property/PropertyList";
import { getDashboard } from "../../helpers/api/homeApi";
import { emitErrorToast } from "../../common/toast/EmitToast";
import Loading from "../../common/Loading";
import CategoryList from "./CategoryList";
import FilterCategory from "./FilterCategory";
import Error from "../../common/Error";

const Home = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getReport = async () => {
    const response = await getDashboard();
    if (!response.status) {
      emitErrorToast(response.message);
      setError(true);
    } else {
      setReport(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getReport();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (report)
    return (
      <>
        <section className="container top-grid-container mt-2 mb-4">
          <FilterCategory
            categories={report.categories}
            locations={report.locations}
          />
          <CategoryList
            categories={[...report.byLocations, ...report.byCategories]}
          />
        </section>
        <section className="mb-4">
          <h3 className="container">Latest Properties</h3>
          <div className="">
            <PropertyList properties={report.latestProperties} />
          </div>
        </section>

        <section className="">
          <h3 className="container">Trending Properties</h3>
          <div className="">
            <PropertyList properties={report.topProperties} />
          </div>
        </section>
      </>
    );
};

export default Home;
