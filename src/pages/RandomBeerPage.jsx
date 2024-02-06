import { useNavigate } from "react-router-dom";
import useBeerAPI from "../hooks/useBeerAPI";
import Spinner from "../components/Spinner";
import { useEffect } from "react";

function RandomBeersPage() {
  const navigate = useNavigate();

  const {
    data: randomBeer,
    loading,
    error,
    handleFetch,
  } = useBeerAPI({
    method: "GET",
    endPoint: "/random",
  });

  useEffect(() => {
    handleFetch();
  }, []);

  if (error) return <div>error!</div>;
  if (loading) return <Spinner />;

  return (
    <div className="d-inline-flex flex-column justify-content-center align-items-center w-100 p-4">
      <h2>Random Beer</h2>
      <img src={randomBeer.image_url} alt="beer" height="300px" width="auto" />
      <h3>{randomBeer.name}</h3>
      <p>{randomBeer.tagline}</p>
      <p>Attenuation level: {randomBeer.attenuation_level}</p>
      <p>Description: {randomBeer.description}</p>
      <p>Created by: {randomBeer.contributed_by}</p>
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

export default RandomBeersPage;
