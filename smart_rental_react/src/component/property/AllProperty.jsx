import { useSearchParams } from "react-router-dom";
import { getPropertyList } from "../../helpers/api/propertyApi";
import { emitErrorToast } from "../../common/toast/EmitToast";
import { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import PropertyList from "./PropertyList";
import { Container } from "react-bootstrap";
import { MAX_DASHBOARD_CONTENT_LENGTH } from "../../helpers/others/EnvConstant";

const AllProperty = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [properties, setProperties] = useState([]);
  // const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getPropertiesList = async (page, size, text, location, category) => {
    const { data, status, message } = await getPropertyList(
      page,
      size,
      text,
      location,
      category
    );

    if (!status) {
      emitErrorToast(message);
    } else {
      setProperties(data.items);
      // setTotalItems(data.total);
      setTotalPages(data.pages);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const size =
      parseInt(searchParams.get("size")) || MAX_DASHBOARD_CONTENT_LENGTH;
    const text = searchParams.get("text") || "";
    const location = searchParams.get("location") || "";
    const category = searchParams.get("category") || "";

    const newParams = {};
    if (searchParams.has("page")) newParams.page = page;
    if (searchParams.has("size")) newParams.size = size;
    if (searchParams.has("text")) newParams.text = text;
    if (searchParams.has("location")) newParams.location = location;
    if (searchParams.has("category")) newParams.category = category;

    console.log(newParams);

    if (Object.keys(newParams).length > 0) {
      setSearchParams({ ...newParams });
    }

    getPropertiesList(page, size, text, location, category);
  }, [searchParams, setSearchParams]);

  const handlePageChange = (change) => {
    let currentPage = parseInt(searchParams.get("page")) || 1;
    currentPage = currentPage + change;

    setSearchParams({
      ...searchParams,
      page: currentPage,
    });
  };

  return (
    <>
      {properties.length === 0 ? (
        <Container>
          <h3 className="container">Latest Properties</h3>
        </Container>
      ) : (
        <>
          <PropertyList properties={properties} />
          <Container className="">
            <Pagination
              handlePageChange={handlePageChange}
              searchParams={searchParams}
              totalPages={totalPages}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default AllProperty;
