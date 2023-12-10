import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import formatUnixTimestamp from "../../utils/mapDateTime";

export function LandParameters({ parametersAt, selectedAddress }) {
  const [loadData, setLoadData] = useState(false);
  const [arrayParameters, setArrayParameters] = useState([]);
  const { id } = useParams();
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const solidityNumber = ethers.BigNumber.from(id);
      const result = await parametersAt.getAllObjectsByLandId(solidityNumber);

      setArrayParameters(result);
      setLoadData(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // Add id as a dependency to useEffect

  if (!loadData) {
    return <h1>Data not found for {id}. 404 Error.</h1>;
  }

  const handleDelete = async (id) => {
    try {
      const solidityNumber = ethers.BigNumber.from(id);
      await parametersAt.deleteObject(solidityNumber);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {loadData ? (
        <div className="container">
          <h1>Hi {id}</h1>
          <Link
            className="btn btn-success mb-3"
            to={`/land/${id}/create-parameter`}
          >
            Add Parameter
          </Link>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-describedby="basic-addon1"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="row row-cols-1">
            {arrayParameters.filter(
                (item) =>
                  search.toLowerCase() === "" ||
                  String(item.title)
                    .toLowerCase()
                    .includes(search.toLowerCase())
              ).map((item) => (
              <div className="col mb-4">
                <div className="card" key={item.id}>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      Time: {formatUnixTimestamp(item.dateTime)}
                    </h6>
                    <h6>Owner: {item.owner}</h6>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Nitrogen: {item.nitrogenContent}
                      </li>
                      <li className="list-group-item">
                        PH Level: {item.pHLevel}
                      </li>
                      <li className="list-group-item">
                        Organic Matter: {item.organicMatter}
                      </li>
                      <li className="list-group-item">
                        Phosphorus: {item.phosphorusContent}
                      </li>
                      <li className="list-group-item">
                        Potassium: {item.potassiumContent}
                      </li>
                    </ul>
                    <p className="card-text">{item.description}</p>
                    {selectedAddress.toLowerCase() !==
                    item.owner.toLowerCase() ? (
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            alert("You are not owner of this Land")
                          }
                          class="btn btn-warning ml-3"
                        >
                          Edit Land
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            alert("You are not owner of this Land")
                          }
                          class="btn btn-warning ml-3"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div>
                        {" "}
                        <Link
                          className="btn btn-primary ml-3"
                          to={`/land-parameter/edit/${Number(item.id)}`}
                        >
                          Edit Parameter
                        </Link>
                        <button
                          className="btn btn-danger ml-3"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}  

                    {/*selectedAddress.toLowerCase() !==
                    item.owner.toLowerCase() ? (
                      <button
                        type="button"
                        onClick={() => alert("You are not owner of this Land")}
                        class="btn btn-warning ml-3"
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-danger ml-3"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    )*/}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="loading-message">Loading...</div>
      )}
    </div>
  );
}

export default LandParameters;
