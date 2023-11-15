import React, { useState, useEffect } from "react";

export function GridLands({ par }) {
  const [lands, setLands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const arrayLends = await par.getAllObjects();

        setLands(arrayLends);
        setIsLoading(false); // Позначте, що дані завантажено
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [par]); // Adding par as a dependency to trigger the effect when it changes

  useEffect(() => {
    console.log(lands);
    console.log(lands.length);
  }, [lands]); // Adding lands as a dependency to log when it changes

  return (
    <div>
      {isLoading ? (
        <div className="loading-message">Loading...</div>
      ) : par && lands.length > 0 ? (
        <div style={{ display: "flex" }}>
          {lands.map((item) => (
            <div className="card" key={item.id}>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">Land ID: {parseInt(item.id, 10)}</h6>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Owner: {item.owner}</li>
                  <li class="list-group-item">Number: {parseInt(item.value, 10)}</li>
                  <li class="list-group-item">A third item</li>
                </ul>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
              </div>
            </div>
          ))}
      </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          There are no lands yet, please add
        </div>
      )}
    </div>
  );
}
