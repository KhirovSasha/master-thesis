import React, { useState, useEffect} from "react";

export function GetParameter({par}) {
  const [parameter, setParameter] = useState(null);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await par.myParameter();
        setParameter(parseInt(result, 10)); 
        console.log(parameter)
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <h1>{parameter}</h1>
  );
}
