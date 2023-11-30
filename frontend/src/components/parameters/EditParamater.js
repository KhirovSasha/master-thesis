import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useParams, useNavigate } from "react-router-dom";

function EditParameter({ parametersAt }) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solidityID = ethers.BigNumber.from(id);
        const parameterData = await parametersAt.getObjectById(solidityID);
        console.log(parameterData);
      } catch (error) {
        setError(`Object by id ${id} not found`);
        console.error("Error fetching land data:", error);
      }
    };

    fetchData();
  }, [id, parametersAt]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const solidityID = ethers.BigNumber.from(id);

    try {
      await parametersAt.editObject(
        solidityID,
        info
      );
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {error ? (
        <h1>Error: {error}</h1>
      ) : (
        <>
          <h1>Edit Parameter {id}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="value" className="form-label">
                Info
              </label>
              <input
                type="text"
                className="form-control"
                value={info}
                onChange={(event) => setInfo(event.target.value)}
                id="test"
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default EditParameter;
