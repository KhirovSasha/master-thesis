import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate, useParams } from "react-router-dom";
import { LandTypes, LandTypeLabels } from "../../utils/enum";

function EditLand({ par, selectedAddress }) {
  const { id } = useParams();
  const [isOwner, setIsOwner] = useState(false);
 
  const [area, setArea] = useState(null);
  const [cadastralNumber, setCadastralNumber] = useState(0);
  const [legalStatus, setLegalStatus] = useState(LandTypes.AGRICULTURAL);
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solidityNumber = ethers.BigNumber.from(id);
        const land = await par.getObject(solidityNumber);
        const test = await par.getAllObjects();
        console.log(test);

        setIsOwner(land.owner.toLowerCase() == selectedAddress.toLowerCase());

        setArea(land.area);
        setCadastralNumber(land.cadastralNumber);
        setLegalStatus(land.legalStatus);
        setCompanyName(land.companyName);
        setTitle(land.title);
        


        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching land data:", error);
      }
    };

    fetchData();
  }, [par, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const solidityID = ethers.BigNumber.from(id);
    const solidityArea = ethers.BigNumber.from(area);


    try {
      await par.editObject(solidityID, solidityArea, cadastralNumber, legalStatus, companyName, title);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-message">Loading...</div>;
    }

    if (!par || (!area && !cadastralNumber && !legalStatus && !companyName && !title)) {
      return (
        <div className="alert alert-warning" role="alert">
          Land data not found.
        </div>
      );
    }

    if (!isOwner) {
      return (
        <div className="alert alert-danger" role="alert">
          You are not the owner. You cannot edit this land.
        </div>
      );
    }

    return (
      <div>
        <h1>Edit Land {id}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="value" className="form-label">
              Area
            </label>
            <input
              type="number"
              className="form-control"
              value={area}
              onChange={(event) => setArea(event.target.value)}
              id="test"
            />
            <label htmlFor="value" className="form-label">
            Cadastral Number
          </label>
          <input
            type="text"
            className="form-control"
            value={cadastralNumber}
            onChange={(event) => setCadastralNumber(event.target.value)}
          />
          <label htmlFor="value" className="form-label">
            Status
          </label>
          <br />
          <select
            className="form-select"
            value={legalStatus}
            onChange={(event) => setLegalStatus(event.target.value)}
          >
            {Object.entries(LandTypeLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="value" className="form-label">
            Name of company
          </label>
          <input
            type="text"
            className="form-control"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />
          <label htmlFor="value" className="form-label">
            Title of land
          </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
}

export default EditLand;
