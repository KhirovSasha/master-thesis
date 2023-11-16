import React, { useState, useEffect } from "react";
import { GridLands } from "./GridLands";
import { Link } from "react-router-dom";

export function GetParameter({ par }) {
  const [parameter, setParameter] = useState(null);

  async function creat() {
    try {
      await par.createObject(1);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await par.getObjectCount();
      
        setParameter(parseInt(result, 10));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h1>Count of Lands: {parameter}</h1>
      <Link type="button" to="create-land" class="btn btn-success mb-3">Create</Link>
      <GridLands par={par} test={1}/>
    </div>
  );
}
