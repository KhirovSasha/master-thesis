import React, { useState, useEffect } from "react";
import { GridLands } from "./GridLands";

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
      <h1>{parameter}</h1>
      <button onClick={creat}>Clikc</button>
      <GridLands par={par} test={1}/>
    </div>
  );
}
