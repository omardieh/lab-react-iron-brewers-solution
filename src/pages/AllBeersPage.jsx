import { Link } from "react-router-dom";
import Search from "../components/Search";
import useBeerAPI from "../hooks/useBeerAPI";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

function AllBeersPage() {
  const [endpoint, setEndpoint] = useState("/");

  const options = {
    endPoint: endpoint,
    method: "GET",
  };

  const { data: beers, error, loading, handleFetch } = useBeerAPI(options);

  useEffect(() => {
    handleFetch();
  }, [endpoint]);

  if (error) return <div>error!</div>;
  if (loading || !beers.length) return <Spinner />;

  return (
    <>
      <Search setEndpoint={setEndpoint} />
      <div className="d-inline-flex flex-wrap justify-content-center align-items-center w-100 p-4">
        {beers.map((beer, i) => {
          return (
            <div key={i}>
              <Link to={"/beers/" + beer._id}>
                <div
                  className="card m-2 p-2 text-center"
                  style={{ width: "24rem", height: "18rem" }}
                >
                  <div className="card-body">
                    <img
                      src={beer.image_url}
                      style={{ height: "6rem" }}
                      alt={"image of" + beer.name}
                    />
                    <h5 className="card-title text-truncate mt-2">
                      {beer.name}
                    </h5>
                    <h6 className="card-subtitle mb-3 text-muted">
                      <em>{beer.tagline}</em>
                    </h6>
                    <p className="card-text">
                      Created by: {beer.contributed_by}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllBeersPage;
