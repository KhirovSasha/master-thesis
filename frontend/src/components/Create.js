import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateLand({ par }) {
  const [contractValue, setContractValue] = useState("");
  const navigate = useNavigate(); // useNavigate replaces useHistory

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Now you can use the 'contractValue' state to access the form value
    console.log("Contract Value:", contractValue);
    try {
      await par.createObject(Number(contractValue));
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    // Update the 'contractValue' state when the input value changes
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
            type="number"
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
