import { useNavigate, useParams } from "react-router-dom";
import useBeerAPI from "../hooks/useBeerAPI";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

function BeerDetailsPage() {
  const navigate = useNavigate();
  const { beerId } = useParams();
  const options = {
    endPoint: "/" + beerId,
    method: "GET",
  };

  const { data: beer, error, loading, handleFetch } = useBeerAPI(options);

  useEffect(() => {
    handleFetch();
  }, []);

  if (error) return <div>error!</div>;
  if (loading || !Object.keys(beer).length) return <Spinner />;

  return (
    <div className="d-inline-flex flex-column justify-content-center align-items-center w-100 p-4">
      <img src={beer.image_url} alt="Beer Image" height="300px" width="auto" />
      <h3>{beer.name}</h3>
      <p>{beer.tagline}</p>
      <p>Attenuation level: {beer.attenuation_level}</p>
      <p>Description: {beer.description}</p>
      <p>Created by: {beer.contributed_by}</p>

      <button
        className="btn btn-primary"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
}

export default BeerDetailsPage;
