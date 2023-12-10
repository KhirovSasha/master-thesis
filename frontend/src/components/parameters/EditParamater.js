import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useParams, useNavigate } from "react-router-dom";

function EditParameter({ parametersAt }) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [pHLevel, setPHLevel] = useState(0);
  const [organicMatter, setOrganicMatter] = useState(0);
  const [phosphorusContent, setPhosphorusContent] = useState(0);
  const [potassiumContent, setPotassiumContent] = useState(0);
  const [nitrogenContent, setNitrogenContent] = useState(0);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solidityID = ethers.BigNumber.from(id);
        const parameter = await parametersAt.getObjectById(solidityID);

        setDescription(parameter.description);
        setPHLevel(parameter.pHLevel);
        setOrganicMatter(parameter.organicMatter);
        setPhosphorusContent(parameter.nitrogenContent);
        setPotassiumContent(parameter.phosphorusContent);
        setNitrogenContent(parameter.nitrogenContent);
        setTitle(parameter.title);

      } catch (error) {
        console.error("Error fetching land data:", error);
      }
    };

    fetchData();
  }, [parametersAt, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const solidityID = ethers.BigNumber.from(id);
    console.log(solidityID);

    try {
      await parametersAt.editObject(
        solidityID,
        String(title),
        String(description),
        String(pHLevel),
        String(organicMatter),
        String(nitrogenContent),
        String(phosphorusContent),
        String(potassiumContent)
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
              <label htmlFor="value" class="form-label">
                description
              </label>
              <input
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></input>
              <label htmlFor="value" class="form-label">
                pHLevel
              </label>
              <input
                className="form-control"
                value={pHLevel}
                type="number"
                onChange={(event) => setPHLevel(event.target.value)}
              ></input>
              <label htmlFor="value" class="form-label">
                organicMatter
              </label>
              <input
                className="form-control"
                value={organicMatter}
                type="number"
                onChange={(event) => setOrganicMatter(event.target.value)}
              ></input>
              <label htmlFor="value" class="form-label">
                nitrogenContent
              </label>
              <input
                className="form-control"
                value={nitrogenContent}
                type="number"
                onChange={(event) => setNitrogenContent(event.target.value)}
              ></input>
              <label htmlFor="value" class="form-label">
                phosphorusContent
              </label>
              <input
                className="form-control"
                value={phosphorusContent}
                type="number"
                onChange={(event) => setPhosphorusContent(event.target.value)}
              ></input>
              <label htmlFor="value" class="form-label">
                potassiumContent
              </label>
              <input
                className="form-control"
                value={potassiumContent}
                type="number"
                onChange={(event) => setPotassiumContent(event.target.value)}
              ></input>
              <label htmlFor="value" class="form-label">
                title
              </label>
              <input
                className="form-control"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></input>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default EditParameter;
