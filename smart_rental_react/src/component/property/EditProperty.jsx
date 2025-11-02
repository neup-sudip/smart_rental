import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyForm from "./PropertyForm";
import { emitErrorToast } from "../../common/toast/EmitToast";
import { getPropertyDetails } from "../../helpers/api/propertyApi";
import Loading from "../../common/Loading";
import Error from "../../common/Error";

const EditProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const getDetails = async (propertyId) => {
    const { data, status, message } = await getPropertyDetails(propertyId);

    if (!status) {
      emitErrorToast(message);
      setError(true);
    } else {
      setProperty(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getDetails(id);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (property) return <PropertyForm property={property} />;
};

export default EditProperty;
