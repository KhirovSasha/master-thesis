import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

export function CreateParameter({ parametersAt }) {
  const [formData, setFormData] = useState({
    desctiption: '',
    pHLevel: 0,
    organicMatter: 0,
    nitrogenContent: 0,
    phosphorusContent: 0,
    potassiumContent: 0,
    title: ''
  });
  
  const { id } = useParams();
  const navigate = useNavigate();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const solidityNumber = ethers.BigNumber.from(id);
      await parametersAt.createParameter(solidityNumber, formData.title, formData.desctiption, String(formData.pHLevel), String(formData.organicMatter), String(formData.nitrogenContent), String(formData.phosphorusContent), String(formData.potassiumContent));
      navigate(`/land-parameters/${parseInt(id, 10)}`);
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
          <label htmlFor="value" class="form-label">
            description
          </label>
          <input
            className="form-control"
            value={formData.desctiption}
            onChange={handleChange("desctiption")}
          ></input>
          <label htmlFor="value" class="form-label">
            pHLevel
          </label>
          <input
            className="form-control"
            value={formData.pHLevel}
            type="number"
            onChange={handleChange("pHLevel")}
          ></input>
          <label htmlFor="value" class="form-label">
            organicMatter
          </label>
          <input
            className="form-control"
            value={formData.organicMatter}
            type="number"
            onChange={handleChange("organicMatter")}
          ></input>
          <label htmlFor="value" class="form-label">
            nitrogenContent
          </label>
          <input
            className="form-control"
            value={formData.nitrogenContent}
            type="number"
            onChange={handleChange("nitrogenContent")}
          ></input>
          <label htmlFor="value" class="form-label">
            phosphorusContent
          </label>
          <input
            className="form-control"
            value={formData.phosphorusContent}
            type="number"
            onChange={handleChange("phosphorusContent")}
          ></input>
          <label htmlFor="value" class="form-label">
            potassiumContent
          </label>
          <input
            className="form-control"
            value={formData.potassiumContent}
            type="number"
            onChange={handleChange("potassiumContent")}
          ></input>
          <label htmlFor="value" class="form-label">
            title
          </label>
          <input
            className="form-control"
            value={formData.title}
            onChange={handleChange("title")}
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
