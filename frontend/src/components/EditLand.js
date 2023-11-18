import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ethers } from 'ethers';

function EditLand({ par }) {
  const { id } = useParams();
  const [landData, setLandData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contractValue, setContractValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solidityNumber = ethers.BigNumber.from(id);
        const land = await par.getObject(solidityNumber);

        setLandData(land);
        setIsLoading(false); 
        
      } catch (error) {
        console.error("Error fetching land data:", error);
      }
    };

    fetchData();
  }, [par]);

  useEffect(() => {
    console.log(landData);
  }, [landData]);


  const handleChange = (event) => {
    setContractValue(event.target.value)
    if(document.getElementById('test').value == 0) {
      document.getElementById('test').value = landData.value
    } else {
      document.getElementById('test').value = event.target.value;
    }
    
  };

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

  return (
    <div>
      {isLoading ? (
        <div className="loading-message">Loading...</div>
      ) : par && landData ? (
        <div>
          <h1>Edit Land {id}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="value" className="form-label">
                Value of contract
              </label>
              <input
                type="number"
                className="form-control"
                value={contractValue}
                //onChange={handleChange}
                id='test'
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          Land data not found.
        </div>
      )}
    </div>
  );
}

export default EditLand;
