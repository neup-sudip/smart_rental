import { useEffect, useState } from "react";
import { getProfile } from "../../helpers/api/authApi";
import { emitErrorToast } from "../../common/toast/EmitToast";
import Loading from "../../common/Loading";
import PropertyCard from "../property/PropertyCard";
import { Container } from "react-bootstrap";
import Pagination from "../../common/Pagination";
import { useSearchParams } from "react-router-dom";
import Error from "../../common/Error";

const Profile = () => {
  const [myProperties, setMyProperties] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const getUserProperties = async (page, size) => {
    const { data, status, message } = await getProfile(page, size);

    if (!status) {
      emitErrorToast(message);
      setError(true);
    } else {
      setMyProperties(data.items);
      setTotalPages(data.pages);
    }

    setLoading(false);
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const size = parseInt(searchParams.get("size")) || 4;

    setSearchParams({ page, size });
    getUserProperties(page, size);
  }, [searchParams, setSearchParams]);

  const handlePageChange = (change) => {
    let currentPage = parseInt(searchParams.get("page")) || 1;
    currentPage = currentPage + change;

    setSearchParams({
      ...searchParams,
      page: currentPage,
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (myProperties?.length > 0)
    return (
      <section className="mb-4">
        <h3 className="container">My Properties</h3>
        <div className="">
          <div className="container py-2">
            <div className="row g-4">
              {myProperties.map((property) => (
                <PropertyCard
                  property={property}
                  handleEdit={true}
                  key={property.id}
                />
              ))}
            </div>
          </div>
        </div>
        <Container className="">
          <Pagination
            handlePageChange={handlePageChange}
            searchParams={searchParams}
            totalPages={totalPages}
          />
        </Container>
      </section>
    );
};

export default Profile;
