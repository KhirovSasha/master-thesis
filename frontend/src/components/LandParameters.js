import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

export function LandParameters({ parametersAt }) {
  const [loadData, setLoadData] = useState(false);
  const [arrayParameters, setArrayParameters] = useState([]);
  const { id } = useParams();

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
          <Link className="btn btn-success" to={`/land/${id}/create-parameter`}>
            Add Parameter
          </Link>
          <div className="row row-cols-3">
            {arrayParameters.map((item) => (
              <div className="col mb-4">
                <div className="card" key={item.id}>
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      Land ID: {parseInt(item.id, 10)}
                    </h6>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Owner: {item.owner}</li>
                      <li className="list-group-item">
                        Number: {item.info}
                      </li>
                      <li className="list-group-item">A third item</li>
                    </ul>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <Link className="btn btn-info" to={`/land-parameters/${item.id}`}>Info</Link>
                    <Link className="btn btn-primary ml-3" to={`/edit-land/${item.id}`}>Edit Land</Link>
                    <button className="btn btn-danger ml-3" onClick={() => handleDelete(item.id)}>Delete</button>

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
