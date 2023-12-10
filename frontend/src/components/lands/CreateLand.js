import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandTypes, LandTypeLabels } from "../../utils/enum";
import { ethers } from "ethers";

export function CreateLand({ par }) {
  const [formData, setFormData] = useState({
    areaValue: 0,
    cadastralNumberValue: "",
    legalStatus: LandTypes.AGRICULTURAL,
    companyName: "",
    title: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Contract Value:", formData.legalStatus);
    try {
      const areaNumber = ethers.BigNumber.from(formData.areaValue);

      await par.createObject(
        formData.companyName,
        formData.title,
        areaNumber,
        formData.cadastralNumberValue,
        formData.legalStatus,
      );
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (propertyName) => (event) => {
    setFormData({
      ...formData,
      [propertyName]: event.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="value" className="form-label">
            Area
          </label>
          <input
            type="number"
            className="form-control"
            value={formData.areaValue}
            onChange={handleChange("areaValue")}
          />
          <label htmlFor="value" className="form-label">
            Cadastral Number
          </label>
          <input
            type="text"
            className="form-control"
            value={formData.cadastralNumberValue}
            onChange={handleChange("cadastralNumberValue")}
          />
          <label htmlFor="value" className="form-label">
            Status
          </label>
          <br />
          <select
            className="form-select"
            value={formData.legalStatus}
            onChange={handleChange("legalStatus")}
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
            value={formData.companyName}
            onChange={handleChange("companyName")}
          />
          <label htmlFor="value" className="form-label">
            Title of land
          </label>
          <input
            type="text"
            className="form-control"
            value={formData.title}
            onChange={handleChange("title")}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
