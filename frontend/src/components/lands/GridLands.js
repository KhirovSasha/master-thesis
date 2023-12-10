import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mapLegalStatus from "../../utils/mapEnumLands";

export function GridLands({ par, selectedAddress }) {
  const [lands, setLands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const arrayLends = await par.getAllObjects();

        setLands(arrayLends);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [par]); // Adding par as a dependency to trigger the effect when it changes

  useEffect(() => {
    console.log(lands);
    console.log(lands.length);
  }, [lands]);

  const handleDelete = async (objectId) => {
    try {
      await par.deleteObject(objectId);
      // After successful deletion, you may want to fetch updated data or handle it accordingly
      const updatedLands = await par.getAllObjects();
      setLands(updatedLands);
    } catch (error) {
      console.error("Error deleting object:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="loading-message">Loading...</div>
      ) : par && lands.length > 0 ? (
        <div className="container">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-describedby="basic-addon1"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="row row-cols-3">
            {lands
              .filter(
                (item) =>
                  search.toLowerCase() === "" ||
                  String(item.title)
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((item) => (
                <div className="col mb-4">
                  <div className="card" key={item.id}>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        Land ID: {item.cadastralNumber}
                      </h6>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Owner: {item.owner}</li>
                        <li className="list-group-item">
                          Area: {parseInt(item.area, 10)}
                        </li>
                        <li className="list-group-item">
                          Company: {item.companyName}
                        </li>
                        <li className="list-group-item">
                          Status: {mapLegalStatus(item.legalStatus)}
                        </li>
                      </ul>

                      {selectedAddress.toLowerCase() !==
                      item.owner.toLowerCase() ? (
                        <div>
                          <Link
                            className="btn btn-info"
                            to={`/land-parameters/${item.id}`}
                          >
                            Info
                          </Link>
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
                          <Link
                            className="btn btn-info"
                            to={`/land-parameters/${item.id}`}
                          >
                            Info
                          </Link>
                          <Link
                            className="btn btn-primary ml-3"
                            to={`/edit-land/${item.id}`}
                          >
                            Edit Land
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger ml-3"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          There are no lands yet, please add
        </div>
      )}
    </div>
  );
}
