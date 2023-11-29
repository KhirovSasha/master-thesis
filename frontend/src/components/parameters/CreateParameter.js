import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ethers } from "ethers";

export function CreateParameter({ parametersAt }) {
  const [contractValue, setContractValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    console.log("Contract Value:", contractValue);
    try {
      const solidityNumber = ethers.BigNumber.from(id);
      await parametersAt.createParameter(solidityNumber, String(contractValue));
      navigate(`/land-parameters/${parseInt(id, 10)}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    setContractValue(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="value" class="form-label">
            Value of contract
          </label>
          <input
            className="form-control"
            value={contractValue}
            onChange={handleChange}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateParameter;
