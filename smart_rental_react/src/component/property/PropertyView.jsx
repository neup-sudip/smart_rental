import { useEffect, useState } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getPropertyDetails } from "../../helpers/api/propertyApi";
import { emitErrorToast } from "../../common/toast/EmitToast";
import Loading from "../../common/Loading";
import Error from "../../common/Error";

// PropertyView Component
const PropertyView = () => {
  const [property, setProperty] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

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

  if (property)
    return (
      <Container>
        <Row className="my-1">
          <Col xs={12} md={8} className="d-flex justify-content-center">
            <img
              src="/house.png"
              alt={property?.title}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </Col>

          <Col
            xs={12}
            md={4}
            className="d-flex flex-column justify-content-between"
          >
            <Card className="shadow-sm p-4">
              <Card.Body>
                <Card.Title className="mb-3">{property?.title}</Card.Title>
                <Card.Text className="mb-2">
                  <strong>Price:</strong> Rs {property?.price}{" "}
                  {property?.category === "Land" ? "Per Ana" : ""}
                </Card.Text>
                <Card.Text className="mb-2">
                  <strong>Location:</strong> {property?.location}
                </Card.Text>
                <Card.Text className="mb-2">
                  <strong>Address:</strong> {property?.address}
                </Card.Text>
                <Card.Text className="mb-2">
                  <strong>Category:</strong> {property?.category}
                </Card.Text>
                <Card.Text className="mb-2">
                  <strong>Owner:</strong> {property?.ownerName}
                </Card.Text>
                <Card.Text className="mb-2">
                  <strong>Created:</strong>{" "}
                  {new Date(property?.createdDate).toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Description</Card.Title>
                <Card.Text>{property?.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
};

export default PropertyView;
